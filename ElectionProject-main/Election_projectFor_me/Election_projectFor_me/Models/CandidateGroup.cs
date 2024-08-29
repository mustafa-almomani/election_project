using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Election_projectFor_me.Models
{
    public class CandidateGroup
    {

        public string ListName { get; set; }
        public List<LocalListCandidate> Candidates { get; set; }

    }
}