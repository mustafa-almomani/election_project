using Election_projectFor_me.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Election_projectFor_me.Controllers
{
    public class AdvertisementController : Controller
    {
        private readonly ELECTION_PROJECTEntities1 _context;

        public AdvertisementController()
        {
            _context = new ELECTION_PROJECTEntities1();
        }

        // GET: Advertisement
        public ActionResult Create()
        {
            return View();
        }

        // POST: Advertisement/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Ad advertisement)
        {
            if (ModelState.IsValid)
            {
                var payment = new Payment
                {
                    Amount = 300.00m, // Set the amount dynamically if needed
                    TransactionID = Guid.NewGuid().ToString() // Generate a unique TransactionID
                };
                _context.Payments.Add(payment);
                _context.SaveChanges();

                advertisement.PaymentID = payment.PaymentID;
                advertisement.StatusOfAds = "pending";
                advertisement.StartDate = DateTime.Now;
                advertisement.EndDate = DateTime.Now.AddMonths(1); // Example duration

                _context.Ads.Add(advertisement);
                _context.SaveChanges();

                return RedirectToAction("Payment", "Advertisement", new { id = advertisement.AdID });
            }
            return View(advertisement);
        }

        // GET: Advertisement/Payment/5
        public ActionResult Payment(int id)
        {
            var advertisement = _context.Ads.Find(id);
            if (advertisement == null)
            {
                return HttpNotFound();
            }
            return View(advertisement);
        }
    }
}
