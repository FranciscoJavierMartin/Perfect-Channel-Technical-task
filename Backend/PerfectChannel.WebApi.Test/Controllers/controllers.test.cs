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
  }
}