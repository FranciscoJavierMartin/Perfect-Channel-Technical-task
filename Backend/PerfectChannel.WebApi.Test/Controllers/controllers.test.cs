// Add your code here and rename the file accordingly.

using System.Collections.Generic;
using Backend.PerfectChannel.WebApi.Entities;
using NUnit.Framework;
using PerfectChannel.WebApi.Controllers;
using Backend.PerfectChannel.WebApi.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace PerfectChannel.WebApi.Test.Controllers
{

  [TestFixture]
  public class TodoServiceTest
  {
    private TaskController _todoService;

    [SetUp]
    public void SetUp()
    {
      _todoService = new TaskController();
    }

    [Test]
    public async Task InitialContentIsEmpty()
    {
      List<Todo> todos = (await _todoService.GetAllTodos()).Value;
      Assert.IsEmpty(todos);
    }

    [Test]
    public async Task AddContent()
    {
      ActionResult response = await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test" });
      Assert.IsInstanceOf<OkResult>(response);
      List<Todo> todos = (await _todoService.GetAllTodos()).Value;
      Assert.IsNotEmpty(todos);
      Todo insertedTodo = todos[0];
      Assert.IsNotNull(insertedTodo);
      Assert.AreEqual(insertedTodo.Description, "Test");
      Assert.IsFalse(insertedTodo.IsCompleted);
    }

    [Test]
    public async Task NoAddContentWithEmptyDescription()
    {
      ActionResult response = await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "" });
      Assert.IsInstanceOf<BadRequestResult>(response);
      List<Todo> todos = (await _todoService.GetAllTodos()).Value;
      Assert.IsEmpty(todos);
    }

    [Test]
    public async Task ToggleTodoFromPendingToCompleted()
    {
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test" });
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test 1" });

      List<Todo> todos = (await _todoService.GetAllTodos()).Value;
      Todo insertedTodo = todos[0];
      Todo notUpdatedTodo = todos[1];

      ActionResult response = await _todoService.ToggleTodo(insertedTodo.Id);
      Assert.IsInstanceOf<OkResult>(response);
      List<Todo> todosCompleted = (await _todoService.GetFilteredTodos(true)).Value;
      Todo todoUpdated = todosCompleted.FirstOrDefault(x => x.Id == insertedTodo.Id);
      Assert.IsNotNull(todoUpdated);
      Assert.AreEqual(todoUpdated.Description, "Test");
      Assert.IsTrue(todoUpdated.IsCompleted);

      Todo notUpdatedTodoFromCompleted = todosCompleted.FirstOrDefault(x => x.Id == notUpdatedTodo.Id); ;
      Assert.IsNull(notUpdatedTodoFromCompleted);
    }

    [Test]
    public async Task ToggleTodoFromCompletedToPending()
    {
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test" });
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test 1" });

      List<Todo> todos = (await _todoService.GetAllTodos()).Value;
      Todo insertedTodo = todos[0];
      Todo notUpdatedTodo = todos[1];

      await _todoService.ToggleTodo(insertedTodo.Id);

      ActionResult response = await _todoService.ToggleTodo(insertedTodo.Id);
      List<Todo> todosPending = (await _todoService.GetFilteredTodos(false)).Value;
      List<Todo> todosCompleted = (await _todoService.GetFilteredTodos(true)).Value;
      Todo todoUpdated = todosPending.FirstOrDefault(x => x.Id == insertedTodo.Id);
      Assert.IsInstanceOf<OkResult>(response);
      Assert.IsEmpty(todosCompleted);
      Assert.IsNotNull(todoUpdated);
      Assert.AreEqual(todoUpdated.Description, "Test");
      Assert.IsFalse(todoUpdated.IsCompleted);

      Todo notUpdatedTodoFromPending = todosCompleted.FirstOrDefault(x => x.Id == notUpdatedTodo.Id); ;
      Assert.IsNotNull(notUpdatedTodoFromPending);
    }

    [Test]
    public async Task NotFoundTodoToggle()
    {
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test" });
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test 1" });

      ActionResult response = await _todoService.ToggleTodo(Guid.NewGuid());
      Assert.IsInstanceOf<OkResult>(response);
      List<Todo> todosPending = (await _todoService.GetFilteredTodos(false)).Value;
      List<Todo> todosCompleted = (await _todoService.GetFilteredTodos(true)).Value;

      Assert.IsEmpty(todosCompleted);
      Assert.AreEqual(todosPending.Count, 2);
    }

    [Test]
    public async Task GetEmptyCompletedTodo()
    {
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test" });
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test 1" });

      ActionResult<List<Todo>> response = await _todoService.GetFilteredTodos(true);
      Assert.IsInstanceOf<OkResult>(response);
      Assert.IsEmpty(response.Value);
    }

    [Test]
    public async Task GetAllCompletedTodo()
    {
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test 1" });
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test 2" });
      await _todoService.CreateNewTodo(new TodoAddDTO() { Description = "Test 3" });

      List<Todo> todos = (await _todoService.GetAllTodos()).Value;

      await _todoService.ToggleTodo(todos[0].Id);
      await _todoService.ToggleTodo(todos[1].Id);
      ActionResult<List<Todo>> response = await _todoService.GetFilteredTodos(true);
      Assert.IsInstanceOf<OkResult>(response);
      Assert.AreEqual(response.Value.Count, 2);
    }
  }
}