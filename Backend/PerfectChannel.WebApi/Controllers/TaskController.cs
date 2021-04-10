using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace PerfectChannel.WebApi.Controllers
{
  [Route("api/[controller]")]
  [EnableCors("AllowOrigin")]
  [ApiController]
  public class TaskController : ControllerBase
  {

    public async Task<ActionResult<string[]>> GetTodos()
    {
      return new string[1] { "Hello" };
    }
  }
}