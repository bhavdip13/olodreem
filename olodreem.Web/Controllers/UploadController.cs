using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.API
{

	[Produces("application/json")]
	[Route("api/[controller]")]
	public class UploadController : Controller
	{
		private IHostingEnvironment _hostingEnvironment;

		public UploadController(IHostingEnvironment hostingEnvironment)
		{
			_hostingEnvironment = hostingEnvironment;
		}

		[HttpPost, DisableRequestSizeLimit]
		public ActionResult UploadFile()
		{
			string fileName = "";
			string filesize = "";
			try
			{
				var file = Request.Form.Files[0];
				double len = file.Length;
				string folderName = "Upload";
				string webRootPath = _hostingEnvironment.WebRootPath;
				string newPath = Path.Combine(webRootPath, folderName);
				if (!Directory.Exists(newPath))
				{
					Directory.CreateDirectory(newPath);
				}
				if (file.Length > 0)
				{

					fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
					string fullPath = Path.Combine(newPath, fileName);
					
					using (var stream = new FileStream(fullPath, FileMode.Create))
					{
						file.CopyTo(stream);
					}

					//calculate file size
					string[] sizes = { "B", "KB", "MB", "GB", "TB" };
					
					int order = 0;
					while (len >= 1024 && order < sizes.Length - 1)
					{
						order++;
						len = len / 1024;
					}

					// Adjust the format string to your preferences. For example "{0:0.#}{1}" would
					// show a single decimal place, and no space.
					filesize = String.Format("{0:0.##} {1}", len, sizes[order]);
				}
				return Json(webRootPath +"\\"+ fileName +","+ filesize);
			}
			catch (System.Exception ex)
			{
				return Json("");
			}
		}

	}
}
