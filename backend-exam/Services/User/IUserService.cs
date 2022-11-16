using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_exam.Dtos.User;

namespace backend_exam.Services.UserService
{
  public interface IUserService
  {
    Task<ServiceResponse<List<GetUserDto>>> GetAllUsers();
    Task<ServiceResponse<GetUserDto>> GetUserById(int id);
    Task<ServiceResponse<List<GetUserDto>>> AddUser(AddUserDto newUser);
    Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser);
    Task<ServiceResponse<List<GetUserDto>>> DeleteUser(int id);
  }
}