using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_exam.Dtos.User
{
  public class UpdateUserDto
  {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
  }
}