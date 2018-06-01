using System;
using System.Collections.Generic;

namespace olodreem.Web.Models
{
    public partial class Users
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Firstname { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
    }
}
