using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_exam.Models;

namespace backend_exam.Dtos.Item
{
  public class AddItemDto
  {
    public string ItemName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int UserId { get; set; }
  }
}