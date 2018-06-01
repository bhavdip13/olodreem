using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using olodreem.Web.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace olodreem.Web.Web.Controllers.API
{
	[Produces("application/json")]

	public class AuthenticationController : Controller
	{

		private readonly IConfiguration _configuration;
		public AuthenticationController(IConfiguration configuration)
		{
			_configuration = configuration;
		}
		[Route("api/Authentication/Login")]
		public IActionResult Authenticate([FromBody]Users userDto)
		{
			olodreemContext db = new olodreemContext();
			var user = db.Users.FirstOrDefaultAsync(a => a.Email == userDto.Email && a.Password == userDto.Password).Result;


			if (user == null)
				return Unauthorized();

			var claims = new[]
								{
										new Claim(ClaimTypes.Name, userDto.Email)
								};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
					issuer: _configuration["Issuer"],
					audience: _configuration["Audience"],
					claims: claims,
					expires: DateTime.Now.AddMinutes(30),
					signingCredentials: creds
			);
			// return basic user info(without password) and token to store client side

			return Ok(new
			{
				id = user.Id,
				username = user.UserName,
				email = user.Email,
				mobile = user.Mobile,
				firstname = user.Firstname,
				lastname = user.LastName,

				Token = new JwtSecurityTokenHandler().WriteToken(token),

			});
		}

	}
}
