using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend_exam.Models
{
  public class Item
  {
    public int Id { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
  }
}