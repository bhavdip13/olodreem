using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace olodreem.Web.Models
{
    public class DataAccessLayer
    {
		olodreemContext db = new olodreemContext();
		public IEnumerable<Users> GetAllUser()
		{
			try
			{
				return db.Users.ToList();
			}
			catch
			{
				throw;
			}
		}
		//To Add new employee record  
		public int AddUser(Users _Users)
		{
			try
			{
				db.Users.Add(_Users);
				db.SaveChanges();
				return 1;
			}
			catch
			{
				throw;
			}
		}
		//To Update the records of a particluar employee  
		public int UpdateEmployee(Users _User)
		{
			try
			{
				db.Entry(_User).State = EntityState.Modified;
				db.SaveChanges();
				return 1;
			}
			catch
			{
				throw;
			}
		}
		//Get the details of a particular employee  
		public Users GetUserData(int id)
		{
			try
			{
				Users _User = db.Users.Find(id);
				return _User;
			}
			catch
			{
				throw;
			}
		}
		//To Delete the record of a particular employee  
		public int DeleteUser(int id)
		{
			try
			{
				Users _User = db.Users.Find(id);
				db.Users.Remove(_User);
				db.SaveChanges();
				return 1;
			}
			catch
			{
				throw;
			}
		}
		
	}
}
