// Add your code here and rename the file accordingly.

using System.Collections.Generic;
using Backend.PerfectChannel.WebApi.Entities;
using NUnit.Framework;
using PerfectChannel.WebApi.Controllers;
using Backend.PerfectChannel.WebApi.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;

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
  }
}