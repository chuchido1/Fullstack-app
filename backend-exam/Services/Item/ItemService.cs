using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend_exam.Data;
using backend_exam.Dtos.Item;
using Microsoft.EntityFrameworkCore;

namespace backend_exam.Services.ItemService
{
  public class ItemService : IItemService
  {
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public ItemService(IMapper mapper, DataContext context)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<ServiceResponse<List<GetItemDto>>> AddItem(AddItemDto newItem)
    {
      Console.WriteLine("value passed by arg" + newItem.UserId);
      var serviceResponse = new ServiceResponse<List<GetItemDto>>();
      Item item = _mapper.Map<Item>(newItem);
      Console.WriteLine("actual saved value" + item.UserId);
      _context.Items.Add(item);
      await _context.SaveChangesAsync();
      serviceResponse.Data = await _context.Items
      .Select(c => _mapper.Map<GetItemDto>(c))
      .ToListAsync();
      return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetItemDto>>> DeleteItem(int id)
    {
      ServiceResponse<List<GetItemDto>> response = new ServiceResponse<List<GetItemDto>>();

      try
      {
        Item item = await _context.Items.FirstAsync(c => c.Id == id);
        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        response.Data = _context.Items.Select(c => _mapper.Map<GetItemDto>(c)).ToList();
      }
      catch (Exception ex)
      {
        response.Success = false;
        response.Message = ex.Message;
      }

      return response;
    }

    public async Task<ServiceResponse<List<GetItemDto>>> GetAllItems()
    {
      var response = new ServiceResponse<List<GetItemDto>>();
      var dbItems = await _context.Items.ToListAsync();
      response.Data = dbItems.Select(c => _mapper.Map<GetItemDto>(c)).ToList();
      return response;
    }

    public async Task<ServiceResponse<GetItemDto>> GetItemById(int id)
    {
      var serviceResponse = new ServiceResponse<GetItemDto>();
      var dbItem = await _context.Items.FirstOrDefaultAsync(c => c.Id == id);
      serviceResponse.Data = _mapper.Map<GetItemDto>(dbItem);
      return serviceResponse;
    }

    public async Task<ServiceResponse<GetItemDto>> UpdateItem(UpdateItemDto updatedItem)
    {
      ServiceResponse<GetItemDto> response = new ServiceResponse<GetItemDto>();

      try
      {
        var item = await _context.Items
        .FirstOrDefaultAsync(c => c.Id == updatedItem.Id);

        item.UserId = updatedItem.UserId;
        item.ItemName = updatedItem.ItemName;
        item.Description = updatedItem.Description;
        item.Quantity = updatedItem.Quantity;
        await _context.SaveChangesAsync();

        response.Data = _mapper.Map<GetItemDto>(item);
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