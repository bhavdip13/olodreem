
using Microsoft.AspNetCore.Mvc;
using olodreem.Web.Models;
using System;
using System.Collections.Generic;


namespace ERP.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
		DataAccessLayer _Obj = new DataAccessLayer();
		[HttpGet]//get all recored
		public IEnumerable<Users> Get()
		{
			try
			{
				return _Obj.GetAllUser();
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		[HttpGet("{id}")]//get recored by id
		public Users Get(int id)
		{
			try
			{
				return _Obj.GetUserData(id);
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		[HttpPost]// insert recored
		public Users Post([FromBody] Users _User)
		{
			
			try
			{
				_Obj.AddUser(_User);
			}
			catch (Exception ex)
			{
				throw ex;
			}
			return _User;
		}

		[HttpDelete("{id}")] //delete recored by id
		public int Delete(int id)
		{
			try
			{
				
			return	_Obj.DeleteUser(id);
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		
	}
}