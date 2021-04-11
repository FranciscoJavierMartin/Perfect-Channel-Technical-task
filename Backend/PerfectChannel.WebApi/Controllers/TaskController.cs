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

    private List<Todo> _todos;

    public TaskController()
    {
      _todos = new List<Todo>();
    }

    [HttpGet]
    public async Task<ActionResult<List<Todo>>> GetAllTodos()
    {
      return _todos;
    }

    [HttpGet("filtered")]
    public async Task<ActionResult<List<Todo>>> GetFilteredTodos([FromQuery] bool isCompleted)
    {
      return _todos.FindAll(x => x.IsCompleted == isCompleted);
    }

    [HttpPost]
    public async Task<ActionResult> CreateNewTodo([FromBody] TodoAddDTO todoToAdd)
    {
      ActionResult res;
      if (!String.IsNullOrWhiteSpace(todoToAdd.Description))
      {
        _todos.Add(
          new Todo
          {
            Id = Guid.NewGuid(),
            Description = todoToAdd.Description,
            IsCompleted = false
          }
        );
        res = Ok();
      }
      else
      {
        res = BadRequest();
      }
      return res;
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult> ToggleTodo(Guid id)
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