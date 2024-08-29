using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Election_projectFor_me.Models
{

    public class ElectionService
    {
        // Example method to get number of seats based on election area
        public int GetNumberOfSeats(string electionArea)
        {
            // Define the number of seats for different election areas
            var seats = new Dictionary<string, int>
        {
            { "اربد", 5 },
            { "عجلون", 4},
            { "جرش", 3 }
            // Add other areas as needed
        };

            // Return the number of seats for the specified area or default to 0 if not found
            return seats.TryGetValue(electionArea, out var numberOfSeats) ? numberOfSeats : 0;
        }
        public double CalculateRatio(int NumberOfVotes, double totalVotesInFilteredLists, int electoralSeats)
        {

            double Ratio = (NumberOfVotes / (double)totalVotesInFilteredLists) * electoralSeats;
            int intPart = (int)Ratio;
            double fractionalPart = Ratio - intPart;

            if (fractionalPart == 0.5)
            {

                Ratio = intPart;
            }
            else
            {

                Ratio = Math.Round(Ratio);
            }

            return Ratio;

        }
    }
}