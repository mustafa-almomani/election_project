using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Election_projectFor_me.Models;

namespace Election_projectFor_me.Controllers
{
    public class DebatesController : Controller
    {
        private ELECTION_PROJECTEntities1 db = new ELECTION_PROJECTEntities1();
        public ActionResult Index()
        {

            return View(db.Debates.Where(x => x.Status == true).ToList());
        }
        public ActionResult AdminDebates()
        {

            return View();
        }

        // GET: Debates/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var debates = db.Debates.Find(id);
            if (debates == null)
            {
                return HttpNotFound();
            }
            return View(debates);
        }

        // GET: Debates/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Debates/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "DebateID,DebateTitle,DebateDate,Location,Candidate1ID,Candidate2ID,Description")] Debate debates)
        {
            if (ModelState.IsValid)
            {
                db.Debates.Add(debates);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(debates);
        }

        // GET: Debates/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Debate debates = db.Debates.Find(id);
            if (debates == null)
            {
                return HttpNotFound();
            }
            return View(debates);
        }

        // POST: Debates/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "DebateID,DebateTitle,DebateDate,Location,Candidate1ID,Candidate2ID,Description")] Debate debates)
        {
            if (ModelState.IsValid)
            {
                db.Entry(debates).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(debates);
        }

        // GET: Debates/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Debate debates = db.Debates.Find(id);
            if (debates == null)
            {
                return HttpNotFound();
            }
            return View(debates);
        }

        // POST: Debates/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Debate debates = db.Debates.Find(id);
            db.Debates.Remove(debates);
            db.SaveChanges();
            return RedirectToAction("Index");
        }





        public ActionResult JoinMeeting(int id)
        {
            // You can pass the debate ID to the view if needed
            ViewBag.DebateID = id;
            return View();
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

