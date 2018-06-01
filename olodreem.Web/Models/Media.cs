using System;
using System.Collections.Generic;

namespace olodreem.Web.Models
{
    public partial class Media
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Artist { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public string Category { get; set; }
        public string Filename { get; set; }
    }
}
