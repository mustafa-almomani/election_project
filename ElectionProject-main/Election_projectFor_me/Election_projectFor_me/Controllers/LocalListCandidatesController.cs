using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Election_projectFor_me.Models;


namespace Election_projectFor_me.Controllers
{
    public class LocalListCandidatesController : Controller
    {
        private ELECTION_PROJECTEntities1 db = new ELECTION_PROJECTEntities1();

        // GET: LocalListCandidates
        public ActionResult Index()
        {
            return View(db.LocalListCandidates.ToList());
        }

        // GET: LocalListCandidates/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            LocalListCandidate localListCandidate = db.LocalListCandidates.Find(id);
            if (localListCandidate == null)
            {
                return HttpNotFound();
            }
            return View(localListCandidate);
        }

        // GET: LocalListCandidates/Create
        public ActionResult Create(string listName)
        {
            ViewBag.ListName = listName;
            return View(new List<LocalListCandidate>());
        }

        // POST: LocalListCandidates/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(List<LocalListCandidate> candidates, string ListName, string ElectionArea, string Governorate, string Image, int id)
        {
            // التحقق من تكرار الرقم الوطني في قائمة المرشحين
            var nationalNumbers = candidates.Select(c => c.NationalNumber).ToList();
            if (nationalNumbers.Count != nationalNumbers.Distinct().Count())
            {
                ModelState.AddModelError("", "يوجد أرقام وطنية مكررة في قائمة المرشحين.");
                return View(candidates); // العودة إلى الصفحة مع رسالة الخطأ
            }

            // التحقق من وجود أرقام وطنية مكررة في قاعدة البيانات
            foreach (var candidate in candidates)
            {
                if (db.LocalListCandidates.Any(c => c.NationalNumber == candidate.NationalNumber))
                {
                    ModelState.AddModelError("", $"الرقم الوطني {candidate.NationalNumber} موجود بالفعل في قاعدة البيانات.");
                    return View(candidates); // العودة إلى الصفحة مع رسالة الخطأ
                }
            }

            // إنشاء وحفظ قائمة جديدة
            LocalList localList = new LocalList
            {
                ListName = ListName,
                ElectionArea = ElectionArea,
                Governorate = Governorate,
                NumberOfVotes = 0,
                image = Image,



            };
            

            if (ModelState.IsValid)
            {
                if (!string.IsNullOrEmpty(localList.image))
                {
                    string path = Path.Combine(Server.MapPath("~/img"), localList.image);
                }
                else
                {
                    string path = Path.Combine(Server.MapPath("~/electionImage/al3hd.jpg"));

                }

                db.LocalLists.Add(localList);
                db.SaveChanges();

                // حفظ بيانات المرشحين وربطهم بالقائمة
                foreach (var candidate in candidates)
                {
                    if (candidate.image == null)
                    {
                        candidate.image = "al3hd.jpg";
                    }
                    candidate.listname = localList.ListName;
                    candidate.LocalListingID = localList.ID;
                    candidate.NumberOfVotesCandidate = 0; // الربط باستخدام معرف القائمة المحفوظة

                    db.LocalListCandidates.Add(candidate);
                }
                db.SaveChanges();

                // إعادة توجيه المستخدم إلى صفحة النجاح أو صفحة أخرى
                return RedirectToAction("Index", "Home");
            }

            return View(candidates); // العودة إلى الصفحة في حالة حدوث أخطاء
        }

        // POST: LocalListCandidates/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "CandidateID,CandidateName,NationalNumber,Governorate,ElectionArea,NumberOfVotesCandidate,LocalListingID,typeofCandidates,img")] LocalListCandidate localListCandidate)
        {
            if (ModelState.IsValid)
            {
                db.Entry(localListCandidate).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(localListCandidate);
        }

        // GET: LocalListCandidates/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            LocalListCandidate localListCandidate = db.LocalListCandidates.Find(id);
            if (localListCandidate == null)
            {
                return HttpNotFound();
            }
            return View(localListCandidate);
        }

        // POST: LocalListCandidates/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            LocalListCandidate localListCandidate = db.LocalListCandidates.Find(id);
            db.LocalListCandidates.Remove(localListCandidate);
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