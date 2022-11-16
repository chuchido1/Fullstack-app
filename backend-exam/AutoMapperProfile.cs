using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend_exam.Dtos.Item;
using backend_exam.Dtos.User;

namespace backend_exam
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<User, GetUserDto>();
      CreateMap<AddUserDto, User>();

      CreateMap<Item, GetItemDto>();
      CreateMap<AddItemDto, Item>();


    }
  }
}