using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Backend.PerfectChannel.WebApi.Entities;
using System.Collections.Generic;
using System;
using Backend.PerfectChannel.WebApi.DTO;

namespace PerfectChannel.WebApi.Controllers
{
  [Route("api/[controller]")]
  [EnableCors("AllowOrigin")]
  [ApiController]
  public class TaskController : ControllerBase
  {

    private static List<Todo> _todos = new List<Todo>();

    public TaskController() { }

    [HttpGet]
    public ActionResult<List<Todo>> GetAllTodos()
    {
      return _todos;
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
  }
}