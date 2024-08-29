using Election_projectFor_me.Models;
using System;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.IO;
using System.Web;

namespace Election_projectFor_me.Controllers
{
    public class USERController : Controller
    {
        private ELECTION_PROJECTEntities1 DB = new ELECTION_PROJECTEntities1();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login(string NationalNumber, string Email)
        {
            try
            {
                var user = DB.Users.Where(x => x.NationalNumber == NationalNumber && x.Email == Email).FirstOrDefault();
                if (user != null)
                {
                    if (user.Password == "password")
                    {
                        var NewPassword = GenerateRandomPassword();
                        user.Password = NewPassword;
                        DB.SaveChanges();
                        SendConfirmationEmail(user.Email, NewPassword);
                        ViewBag.Emailsent = "The code has been sent to your Email";
                        return RedirectToAction("LoginUser", new { NationalNumber = user.NationalNumber, Email = user.Email });
                    }
                }
                if (user == null)
                {
                    ModelState.AddModelError("", "User not found.");
                    return View();
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "An error occurred while processing your request. Please try again later.");
                Console.WriteLine("Exception message: " + ex.Message);
            }
            return View();
        }

        private string GenerateRandomPassword()
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            int length = 8;
            while (0 < length--)
            {
                res.Append(valid[rnd.Next(valid.Length)]);
            }
            return res.ToString();
        }

        private void SendConfirmationEmail(string toEmail, string confirmationCode)
        {
            string fromEmail = System.Configuration.ConfigurationManager.AppSettings["FromEmail"];
            string smtpUsername = System.Configuration.ConfigurationManager.AppSettings["SmtpUsername"];
            string smtpPassword = System.Configuration.ConfigurationManager.AppSettings["SmtpPassword"];

            string subjectText = "Your Confirmation Code";
            string messageText = $"Your confirmation code is {confirmationCode}";

            string smtpServer = "smtp.gmail.com";
            int smtpPort = 587;

            using (MailMessage mailMessage = new MailMessage())
            {
                mailMessage.From = new MailAddress(fromEmail);
                mailMessage.To.Add(toEmail);
                mailMessage.Subject = subjectText;
                mailMessage.Body = messageText;
                mailMessage.IsBodyHtml = false;

                using (SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                    smtpClient.EnableSsl = true;

                    smtpClient.Send(mailMessage);
                }
            }
        }

        public ActionResult LoginUser(string NationalNumber, string Email, string password)
        {
            var user = DB.Users.FirstOrDefault(u => u.NationalNumber == NationalNumber);
            if (user == null)
            {
                ModelState.AddModelError("", "User not found.");
                return View();
            }

            if (ModelState.IsValid)
            {
                if (Email == user.Email && password == user.Password)
                {
                    Session["islogin"] = true;
                    TempData["LoggedUser"] = JsonConvert.SerializeObject(user);
                    string encryptedId = Encrypt(user.ID.ToString());
                    string encodedId = HttpUtility.UrlEncode(encryptedId);
                    return RedirectToAction("TypeOfElection", new { type = encodedId });

                }

                ModelState.AddModelError("", "Invalid login attempt.");
            }

            return View();
        }
        public ActionResult Logout() { Session["islogin"] = false; return RedirectToAction("Index", "Home"); }
        private static string EncryptionKey = System.Configuration.ConfigurationManager.AppSettings["EncryptionKey"];
        private static string Encrypt(string clearText)
        {
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    return Convert.ToBase64String(ms.ToArray())
                        .Replace('+', '-')
                        .Replace('/', '_')
                        .Replace("=", "");
                }
            }
        }

        private static string Decrypt(string cipherText)
        {
            cipherText = cipherText.Replace('-', '+').Replace('_', '/');
            switch (cipherText.Length % 4)
            {
                case 0: break;
                case 2: cipherText += "=="; break;
                case 3: cipherText += "="; break;
                default: throw new System.Exception("Invalid Base64 string");
            }
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    return Encoding.Unicode.GetString(ms.ToArray());
                }
            }
        }
        [ValidateInput(false)]
        public ActionResult TypeOfElection(string type)
        {
            var id = Decrypt(HttpUtility.UrlDecode(type));
            Session["type"] = type;
            var ID = int.Parse(id);
            if (ID == null)
            {
                return HttpNotFound();
            }
            if (ID != null)
            {
                var user = DB.Users.Find(ID);
                ViewBag.ElectionArea = user.ElectionArea;
                if (user.LocalElections == false && user.WhitePaperLocalElections == false)
                {
                    ViewBag.LocalElectionsPath = $"LocalElections?type={(type)}";
                }
                else
                {
                    ViewBag.LocalElectionsPath = null;
                }

                if (user.PartyElections == false && user.WhitePaperPartyElections == false)
                {
                    ViewBag.PartyElections = $"PartyElections?type={type}";
                }
                else
                {
                    ViewBag.PartyElections = null;
                }
                ViewBag.url = type;
            }

            return View();
        }


        public ActionResult PartyElections()
        {
            //string type = (string)Session["type"];
            //type = Decrypt(type);
            if (TempData["LoggedUser"] != null)
            {
                var userJson = TempData["LoggedUser"].ToString();
                var user = JsonConvert.DeserializeObject<User>(userJson);
                var party = DB.GeneralListings.ToList();
                ViewBag.User = user;
                TempData.Keep("LoggedUser");
                return View(party);
            }

            return RedirectToAction("Login");
        }

        [HttpPost]
        public JsonResult IncrementVote(int id)
        {

            try
            {
                var vote = DB.GeneralListings.Find(id);
                if (vote == null)
                {
                    return Json(new { success = false, message = "Vote not found." });
                }

                var userJson = TempData["LoggedUser"]?.ToString();
                TempData.Keep("LoggedUser");
                if (string.IsNullOrEmpty(userJson))
                {
                    return Json(new { success = false, message = "User not found." });
                }

                var user = JsonConvert.DeserializeObject<User>(userJson);
                if (user == null)
                {
                    return Json(new { success = false, message = "Invalid user data." });
                }

                var existingUser = DB.Users.Find(user.ID);
                if (existingUser == null)
                {
                    return Json(new { success = false, message = "User not found in database." });
                }

                existingUser.PartyElections = true;
                vote.NumberOfVotes += 1;

                DB.SaveChanges();
                string encryptedId = Encrypt(user.ID.ToString());
                string redirectUrl = Url.Action("TypeOfElection", new { type = HttpUtility.UrlEncode(encryptedId) });

                return Json(new { success = true, redirectUrl = redirectUrl });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }

        public ActionResult WhiteCard(string type)
        {
            var userJson = TempData["LoggedUser"]?.ToString();
            TempData.Keep("LoggedUser");
            if (string.IsNullOrEmpty(userJson))
            {
                return Json(new { success = false, message = "User not found." });
            }

            var user = JsonConvert.DeserializeObject<User>(userJson);
            if (user == null)
            {
                return Json(new { success = false, message = "Invalid user data." });
            }

            var existingUser = DB.Users.Find(user.ID);
            if (existingUser == null)
            {
                return Json(new { success = false, message = "User not found in database." });
            }

            existingUser.WhitePaperPartyElections = true;
            DB.SaveChanges();

            string encryptedId = Encrypt(user.ID.ToString());
            string redirectUrl = Url.Action("TypeOfElection", new { type = HttpUtility.UrlEncode(encryptedId) });

            return Json(new { success = true, redirectUrl = redirectUrl });
        }
        public ActionResult LocalElections()
        {
            if (TempData["LoggedUser"] != null)
            {
                var userJson = TempData["LoggedUser"].ToString();
                var user = JsonConvert.DeserializeObject<User>(userJson);
                var localLists = DB.LocalLists
                    .Where(list => list.ElectionArea == user.ElectionArea)
                    .ToList();

                var viewModel = new LocalListViewModel
                {
                    LocalLists = localLists,
                    LoggedInUser = user
                };

                TempData.Keep("LoggedUser");
                return View(viewModel);
            }

            return RedirectToAction("TypeOfElection", new { id = User.Identity.Name });
        }
        public JsonResult IncrementVoteLocal(int listId, int[] candidateIds)
        {
            try
            {
                var list = DB.LocalLists.Find(listId);
                if (list == null)
                {
                    return Json(new { success = false, message = "List not found." });
                }

                var userJson = TempData["LoggedUser"]?.ToString();
                TempData.Keep("LoggedUser");
                if (string.IsNullOrEmpty(userJson))
                {
                    return Json(new { success = false, message = "User not found." });
                }

                var user = JsonConvert.DeserializeObject<User>(userJson);
                if (user == null)
                {
                    return Json(new { success = false, message = "Invalid user data." });
                }

                var existingUser = DB.Users.Find(user.ID);
                if (existingUser == null)
                {
                    return Json(new { success = false, message = "User not found in database." });
                }

                existingUser.LocalElections = true;
                list.NumberOfVotes += 1;
                if (candidateIds != null)
                {

                    foreach (var candidateId in candidateIds)
                    {
                        var candidate = DB.LocalListCandidates.Find(candidateId);
                        if (candidate != null && candidate.LocalListingID == listId)
                        {
                            candidate.NumberOfVotesCandidate += 1;
                        }
                    }
                }
                DB.SaveChanges();


                string encryptedId = Encrypt(user.ID.ToString());
                string redirectUrl = Url.Action("TypeOfElection", new { type = HttpUtility.UrlEncode(encryptedId) });
                return Json(new { success = true, redirectUrl = redirectUrl });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.Message);
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }
    }
}