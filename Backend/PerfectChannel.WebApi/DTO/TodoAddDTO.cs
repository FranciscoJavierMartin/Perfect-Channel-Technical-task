using System.ComponentModel.DataAnnotations;

namespace Backend.PerfectChannel.WebApi.DTO
{
  public class TodoAddDTO
  {
    [Required(AllowEmptyStrings = false)]
    public string Description { get; set; }
  }
}