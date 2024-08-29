using Election_projectFor_me.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Election_projectFor_me.Controllers
{


    public class HomeController : Controller
    {

        private ELECTION_PROJECTEntities1 DB=new ELECTION_PROJECTEntities1();
        private readonly ELECTION_PROJECTEntities1 _context;

        public HomeController()
        {
            _context = new ELECTION_PROJECTEntities1();
        }
        public ActionResult Index(string id)

        {
            var adsList = _context.Ads.Where(ad => ad.StatusOfAds == "approved").ToList();
            var endtime = DB.Dates.FirstOrDefault();
            Session["endElection"] = endtime.EndDateOfElection;
            if (!string.IsNullOrEmpty(id))
            {
                string decryptedId = Decrypt(id);
                int userId = int.Parse(decryptedId);

                // Your logic here

                return View(adsList);
            }

            return View(adsList);





        }





        private static string EncryptionKey = System.Configuration.ConfigurationManager.AppSettings["EncryptionKey"];

        private static string Decrypt(string cipherText)
        {
            cipherText = cipherText.Replace(" ", "+");
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
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }

        //public ActionResult Index(string id)
        //{
        //    if (!string.IsNullOrEmpty(id))
        //    {
        //        string decryptedId = Decrypt(id);
        //        int userId = int.Parse(decryptedId);

        //        // Your logic here

        //        return View(userId);
        //    }
        //    return View();
        //}
        public ActionResult Useriformation(string NationalNumber)
        {
            if (string.IsNullOrEmpty(NationalNumber))
            {
                //ModelState.AddModelError("", "Please enter a valid National Number.");
                ViewBag.valid=false;
                return View();
            }

            var userinf = DB.Users.FirstOrDefault(u => u.NationalNumber == NationalNumber);
            if (userinf == null)
            {
                ModelState.AddModelError("", "User not found.");
                ViewBag.valid = false;
                return View();
            }
            ViewBag.valid = true;
            return View(userinf);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Contact(ContactFormModel model)
        {
            if (ModelState.IsValid)
            {
                var contact = new Contact
                {
                    SenderEmail = model.Email,
                    SenderName = model.Name,
                    Message = model.Message,
                    SubmissionDate = DateTime.Now
                };

                DB.Contacts.Add(contact);
                DB.SaveChanges();
                SendMessege(model.Name, model.Email, model.Message);

                ViewBag.MessageSent = "تم إرسال رسالتك بنجاح";
                ViewBag.SuccessMessage = "Your message has been sent successfully.";

            }

            return View(model); 
        }

        public void SendMessege(string name, string email, string message)
        {
            try
            {
                string ToEmail = ConfigurationManager.AppSettings["FromEmail"];
                string smtpUsername = ConfigurationManager.AppSettings["SmtpUsername"];
                string smtpPassword = ConfigurationManager.AppSettings["SmtpPassword"];
                string smtpServer = "smtp.gmail.com";
                int smtpPort = 587;

                using (MailMessage mailMessage = new MailMessage())
                {
                    string fromEmail = email.Trim();
                    string fromName = name.Trim();
                    string messageText = message.Trim();
                    mailMessage.From = new MailAddress(fromEmail, fromName);
                    mailMessage.To.Add(ToEmail);
                    mailMessage.Subject = "Feedback";
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
            catch (Exception ex)
            {
                
                throw; 
            }
         
        }
      

    }
}