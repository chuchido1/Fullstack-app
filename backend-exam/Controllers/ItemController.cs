using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_exam.Dtos.Item;
using backend_exam.Services.ItemService;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_rpg.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ItemController : ControllerBase
  {
    private readonly IItemService _ItemService;
    public ItemController(IItemService ItemService)
    {
      _ItemService = ItemService;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<ServiceResponse<List<GetItemDto>>>> Get()
    {
      return Ok(await _ItemService.GetAllItems());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<List<GetItemDto>>>> Delete(int id)
    {
      var response = await _ItemService.DeleteItem(id);
      if (response.Data == null)
      {
        return NotFound(response);
      }
      return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<GetItemDto>>> GetSingle(int id)
    {
      return Ok(await _ItemService.GetItemById(id));
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<List<GetItemDto>>>> AddItem(AddItemDto newItem)
    {
      return Ok(await _ItemService.AddItem(newItem));
    }

    [HttpPut]
    public async Task<ActionResult<ServiceResponse<GetItemDto>>> UpdateItem(UpdateItemDto updatedItem)
    {
      var response = await _ItemService.UpdateItem(updatedItem);
      if (response.Data == null)
      {
        return NotFound(response);
      }
      return Ok(response);
    }
  }
}