using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Backend.PerfectChannel.WebApi.Entities;
using System.Collections.Generic;

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

    public async Task<ActionResult<List<Todo>>> GetTodos()
    {
      return _todos;
    }
  }
}