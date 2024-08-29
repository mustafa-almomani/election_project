using Election_projectFor_me.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Election_projectFor_me.Controllers
{
    public class AdminController : Controller
    {
        private readonly ELECTION_PROJECTEntities1 _context;

        public AdminController()
        {
            _context = new ELECTION_PROJECTEntities1();
        }

        // GET: Admin
        public ActionResult Index()
        {
            var pendingAds = _context.Ads.Where(a => a.StatusOfAds == "pending").ToList();
            return View(pendingAds);
        }

        // POST: Admin/Approve/5
        [HttpPost]
        public ActionResult Approve(int id, string adminComment)
        {
            var ad = _context.Ads.Find(id);
            if (ad == null)
            {
                return HttpNotFound();
            }

            ad.StatusOfAds = "approved";
            ad.AdminComment = adminComment;
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // POST: Admin/Reject/5
        [HttpPost]
        public ActionResult Reject(int id, string adminComment)
        {
            var ad = _context.Ads.Find(id);
            if (ad == null)
            {
                return HttpNotFound();
            }

            ad.StatusOfAds = "rejected";
            ad.AdminComment = adminComment;
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult BulkAction(List<int> selectedIds, string action, FormCollection form)
        {
            if (selectedIds != null)
            {
                foreach (var id in selectedIds)
                {
                    var ad = _context.Ads.Find(id);
                    if (ad != null)
                    {
                        if (action == "Approve")
                        {
                            ad.StatusOfAds = "approved";
                        }
                        else if (action == "Reject")
                        {
                            ad.StatusOfAds = "rejected";
                        }

                        // Retrieve admin comment from form data
                        string adminCommentKey = $"adminComments[{id}]";
                        if (form.AllKeys.Contains(adminCommentKey))
                        {
                            ad.AdminComment = form[adminCommentKey];
                        }
                    }
                }
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
        public ActionResult AddDate()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddDate([Bind(Include = "startDateNominate,EndDateNominate,startDateOfElection,EndDateOfElection")] Date date)
        {
            if (ModelState.IsValid)
            {
                _context.Dates.Add(date);
                _context.SaveChanges();

            }
            return View();

        }
        public ActionResult LoginAdmin()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LoginAdmin(string Email, string Password)
        {
            var user = _context.Admins.FirstOrDefault(u => u.Email == Email);
            if (user != null)
            {
                if (user.PasswordHash == Password)
                {
                    TempData["LoggedUser"] = JsonConvert.SerializeObject(user);
                    Session["islogin"] = true;
                    return RedirectToAction("Home", new { id = user.AdminID });
                }
            }

            ViewBag.Message = "Invalid login attempt.";
            return View();
        }
        public ActionResult Home() {
                double userVotesIrbed= _context.Users.Where(x=>x.LocalElections==true&&x.ElectionArea== "اربد").Count();
                double totalForirbed = _context.Users.Where(x=> x.ElectionArea == "اربد").Count();
                double persantegeForIrbed = (userVotesIrbed / totalForirbed) * 100 ;
                double userVotesAlloan=_context.Users.Where(x=>x.LocalElections==true&&x.ElectionArea== "عجلون").Count();
                double totalAlloan=_context.Users.Where (x=>x.ElectionArea == "عجلون").Count() ;
                double persantegeAlloan = (userVotesAlloan / totalAlloan) * 100;
                double userVotesjarash= _context.Users.Where(x => x.LocalElections == true && x.ElectionArea == "جرش").Count();
                double totaljarash = _context.Users.Where((x) => x.ElectionArea == "جرش").Count();
                double persantegejarash = (userVotesjarash / totaljarash) * 100;

                ViewBag.Foteper= persantegeForIrbed;
                ViewBag.ajloanper= persantegeAlloan;
                ViewBag.jarash=persantegejarash;
        return View();
        }
        public ActionResult newAdmin() {
        return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddAdmin(Admin admin, HttpPostedFileBase imgFile)
        {
            if (ModelState.IsValid)
            {
                if (imgFile != null && imgFile.ContentLength > 0)
                {
                    string fileName = Path.GetFileName(imgFile.FileName);
                    string path = Path.Combine(Server.MapPath("~/assets/Images/"), fileName);
                    imgFile.SaveAs(path);

                    admin.img = "/assets/Images/" + fileName; 
                }

                _context.Admins.Add(admin);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(admin);
        }
        public ActionResult Logout() {
            Session["islogin"] = false;
            return RedirectToAction("LoginAdmin");
        }

    }
}
