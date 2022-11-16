using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend_exam.Data;
using backend_exam.Dtos.User;
using Microsoft.EntityFrameworkCore;

namespace backend_exam.Services.UserService
{
  public class UserService : IUserService
  {
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public UserService(IMapper mapper, DataContext context)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<ServiceResponse<List<GetUserDto>>> AddUser(AddUserDto newUser)
    {
      var serviceResponse = new ServiceResponse<List<GetUserDto>>();
      User user = _mapper.Map<User>(newUser);
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      serviceResponse.Data = await _context.Users
      .Select(c => _mapper.Map<GetUserDto>(c))
      .ToListAsync();
      return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetUserDto>>> DeleteUser(int id)
    {
      ServiceResponse<List<GetUserDto>> response = new ServiceResponse<List<GetUserDto>>();

      try
      {
        User user = await _context.Users.FirstAsync(c => c.Id == id);
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        response.Data = _context.Users.Select(c => _mapper.Map<GetUserDto>(c)).ToList();
      }
      catch (Exception ex)
      {
        response.Success = false;
        response.Message = ex.Message;
      }

      return response;
    }

    public async Task<ServiceResponse<List<GetUserDto>>> GetAllUsers()
    {
      var response = new ServiceResponse<List<GetUserDto>>();
      var dbUsers = await _context.Users.ToListAsync();
      response.Data = dbUsers.Select(c => _mapper.Map<GetUserDto>(c)).ToList();
      return response;
    }

    public async Task<ServiceResponse<GetUserDto>> GetUserById(int id)
    {
      var serviceResponse = new ServiceResponse<GetUserDto>();
      var dbUser = await _context.Users.FirstOrDefaultAsync(c => c.Id == id);
      serviceResponse.Data = _mapper.Map<GetUserDto>(dbUser);
      return serviceResponse;
    }

    public async Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser)
    {
      ServiceResponse<GetUserDto> response = new ServiceResponse<GetUserDto>();

      try
      {
        var user = await _context.Users
        .FirstOrDefaultAsync(c => c.Id == updatedUser.Id);

        user.Name = updatedUser.Name;
        user.LastName = updatedUser.LastName;
        user.Email = updatedUser.Email;
        await _context.SaveChangesAsync();

        response.Data = _mapper.Map<GetUserDto>(user);
      }
      catch (Exception ex)
      {
        response.Success = false;
        response.Message = ex.Message;
      }

      return response;
    }
  }
}