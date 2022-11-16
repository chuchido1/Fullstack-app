using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_exam.Dtos.User;
using backend_exam.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_rpg.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : ControllerBase
  {
    private readonly IUserService _UserService;
    public UserController(IUserService UserService)
    {
      _UserService = UserService;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDto>>>> Get()
    {
      return Ok(await _UserService.GetAllUsers());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDto>>>> Delete(int id)
    {
      var response = await _UserService.DeleteUser(id);
      if (response.Data == null)
      {
        return NotFound(response);
      }
      return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> GetSingle(int id)
    {
      return Ok(await _UserService.GetUserById(id));
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<List<GetUserDto>>>> AddUser(AddUserDto newUser)
    {
      return Ok(await _UserService.AddUser(newUser));
    }

    [HttpPut]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> UpdateUser(UpdateUserDto updatedUser)
    {
      var response = await _UserService.UpdateUser(updatedUser);
      if (response.Data == null)
      {
        return NotFound(response);
      }
      return Ok(response);
    }
  }
}