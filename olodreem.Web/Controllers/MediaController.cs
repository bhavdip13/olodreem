using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using olodreem.Web.Models;

namespace olodreem.Web.Controllers
{
	[Produces("application/json")]
	[Route("api/Media")]
	public class MediaController : Controller
	{
		olodreemContext db = new olodreemContext();
		[Route("GetMedias")]
		[HttpGet]//get all recored
		public IEnumerable<Media> Get()
		{
			try
			{
				return db.Media.ToList();
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		[Route("Details")]
		[HttpGet]
		public Media Get(int id)
		{
			try
			{
				return db.Media.Find(id);
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		// insert recored
		[Route("SaveMedia")]
		[HttpPost]
		public Media Post([FromBody] Media _Media)
		{

			try
			{
				if (_Media.Id == 0)
				{
					db.Media.Add(_Media);
				}
				else
				{
					db.Media.Attach(_Media);
					db.Entry(_Media).State = EntityState.Modified;
				}
				db.SaveChanges();
			}
			catch (Exception ex)
			{
				throw ex;
			}
			return _Media;
		}

		[HttpDelete("{id}")] //delete recored by id
		public int Delete(int id)
		{
			try
			{
				Media _Media = db.Media.Find(id);
				db.Media.Remove(_Media);
				db.SaveChanges();
				return 1;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
	}
}