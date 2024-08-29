using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Election_projectFor_me.Models
{
    public class Local
    {
        public int ID { get; set; }
        public string ListName { get; set; }
        public int NumberOfVotes { get; set; }
        public double Ratio { get; set; }

    }
}