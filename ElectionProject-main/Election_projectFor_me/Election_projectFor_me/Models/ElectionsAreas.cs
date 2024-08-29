using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Election_projectFor_me.Models
{
    public class ElectionsAreas
    {


        public string ElectionArea { get; set; }
        public string Governorate { get; set; }
        public int NumberOfVotes { get; set; }
        public int WhitePaperLocalElectionsCount { get; set; }
        public int NumberOfSeats { get; set; }
        public double TheRatioOfBase { get; set; }
    }
}