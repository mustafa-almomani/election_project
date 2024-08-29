using Election_projectFor_me.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Election_projectFor_me.Controllers
{
    public class GeneralListingsController : Controller
    {
        private ELECTION_PROJECTEntities1 db = new ELECTION_PROJECTEntities1();

        // GET: GeneralListings
        public ActionResult Index()
        {
            return View(db.GeneralListings.ToList());
        }

        // GET: GeneralListings/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            GeneralListing generalListing = db.GeneralListings.Find(id);
            if (generalListing == null)
            {
                return HttpNotFound();
            }
            return View(generalListing);
        }

        // GET: GeneralListings/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: GeneralListings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "GeneralListingID,Name,NumberOfVotes,img")] GeneralListing generalListing)
        {
            if (ModelState.IsValid)
            {
                if (generalListing.image != null)
                {

                    string path = Path.Combine(Server.MapPath("~/img"), generalListing.image);

                }
                generalListing.NumberOfVotes = 0;
                db.GeneralListings.Add(generalListing);
                //db.SaveChanges();
                Session["listName"] = generalListing.Name;
                TempData["Image"] = generalListing.image;
                return RedirectToAction("Create", "GeneralListCandidates", new { listName = generalListing.Name });
            }

            return View(generalListing);
        }

        // GET: GeneralListings/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            GeneralListing generalListing = db.GeneralListings.Find(id);
            if (generalListing == null)
            {
                return HttpNotFound();
            }
            return View(generalListing);
        }

        // POST: GeneralListings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "GeneralListingID,Name,NumberOfVotes")] GeneralListing generalListing)
        {
            if (ModelState.IsValid)
            {
                db.Entry(generalListing).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(generalListing);
        }

        // GET: GeneralListings/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            GeneralListing generalListing = db.GeneralListings.Find(id);
            if (generalListing == null)
            {
                return HttpNotFound();
            }
            return View(generalListing);
        }

        // POST: GeneralListings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            GeneralListing generalListing = db.GeneralListings.Find(id);
            db.GeneralListings.Remove(generalListing);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public JsonResult GetUserData(string nationalNumber)
        {
            var user = db.Users.FirstOrDefault(u => u.NationalNumber == nationalNumber);
            if (user != null)
            {
                return Json(new
                {
                    FullName = user.FullName,
                    ElectionArea = user.ElectionArea,
                    Governorate = user.Governorate,
                    Gender = user.Gender,

                }, JsonRequestBehavior.AllowGet);
            }
            return Json(null, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}