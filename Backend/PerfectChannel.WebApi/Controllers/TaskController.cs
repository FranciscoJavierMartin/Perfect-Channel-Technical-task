using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Backend.PerfectChannel.WebApi.Entities;
using System.Collections.Generic;
using System;
using Backend.PerfectChannel.WebApi.DTO;
using System.Linq;

namespace PerfectChannel.WebApi.Controllers
{
  [Route("api/[controller]")]
  [EnableCors("AllowOrigin")]
  [ApiController]
  public class TaskController : ControllerBase
  {

    private static List<Todo> _todos;

    public TaskController() { }

    [HttpGet]
    public ActionResult<List<Todo>> GetAllTodos()
    {
      return _todos;
    }

    [HttpGet("filtered")]
    public ActionResult<List<Todo>> GetFilteredTodos([FromQuery] bool isCompleted)
    {
      return _todos.FindAll(x => x.IsCompleted == isCompleted);
    }

    [HttpPost]
    public ActionResult CreateNewTodo([FromBody] TodoAddDTO todoToAdd)
    {
      _todos.Add(
        new Todo
        {
          Id = Guid.NewGuid(),
          Description = todoToAdd.Description,
          IsCompleted = false
        }
      );
      return Ok();
    }

    [HttpPatch("{id}")]
    public ActionResult ToggleTodo(Guid id)
    {
      ActionResult res;
      Todo todoToUpdate = _todos.FirstOrDefault(x => x.Id == id);

      if (todoToUpdate == null)
      {
        res = NotFound();
      }
      else
      {
        todoToUpdate.IsCompleted = !todoToUpdate.IsCompleted;
        res = Ok();
      }

      return res;
    }
  }
}