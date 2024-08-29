using Election_projectFor_me.Models;

using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Configuration;
using System.Web.Mvc;

namespace Election_projectFor_me.Controllers
{
    public class PaymentController : Controller
    {
        private readonly ELECTION_PROJECTEntities1 _context;


        public PaymentController()
        {
            // Initialize Stripe with the secret key
            StripeConfiguration.ApiKey = WebConfigurationManager.AppSettings["StripeSecretKey"];
            _context = new ELECTION_PROJECTEntities1();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreatePayment(int AdID, string FirstName, string LastName, string PaymentMethod, DateTime PaymentDate, decimal Amount, string stripeToken, string PostalCode)
        {
            var ad = _context.Ads.Find(AdID);
            if (ad == null)
            {
                return HttpNotFound();
            }

            // Always set StatusOfAds to "Pending" initially
            ad.StatusOfAds = "Pending";

            if (PaymentMethod == "Stripe")
            {
                try
                {
                    var options = new ChargeCreateOptions
                    {
                        Amount = (long)(Amount * 100), // Stripe accepts payment in cents
                        Currency = "usd",
                        Description = "Advertisement Payment",
                        Source = stripeToken,
                        Metadata = new Dictionary<string, string>
            {
                { "PostalCode", PostalCode } // Add Postal Code to metadata
            }
                    };
                    var service = new ChargeService();
                    Charge charge = service.Create(options);

                    if (charge.Status == "succeeded")
                    {
                        var payment = new Payment
                        {
                            Amount = Amount,
                            PaymentDate = PaymentDate,
                            PaymentMethod = PaymentMethod,
                            TransactionID = charge.Id,
                            Status = "Pending",  // Always set Status to "Pending" initially
                            PaymentGateway = "Stripe"
                        };

                        _context.Payments.Add(payment);
                        _context.SaveChanges();

                        ad.PaymentID = payment.PaymentID;
                        _context.SaveChanges();

                        // Redirect to the Success action
                        return RedirectToAction("Success", "Payment");
                    }
                    else
                    {
                        return RedirectToAction("Cancel", "Payment");
                    }
                }
                catch (Exception ex)
                {
                    // Handle error
                    ViewBag.Message = $"Error: {ex.Message}";
                    return View("Error");
                }
            }
            else if (PaymentMethod == "PayPal")
            {
                // PayPal payment process
                string transactionID = Guid.NewGuid().ToString();

                var payment = new Payment
                {
                    Amount = Amount,
                    PaymentDate = PaymentDate,
                    PaymentMethod = PaymentMethod,
                    TransactionID = transactionID,
                    Status = "Pending",  // Always set Status to "Pending" initially
                    PaymentGateway = "PayPal"
                };

                _context.Payments.Add(payment);
                _context.SaveChanges();

                ad.PaymentID = payment.PaymentID;
                _context.SaveChanges();

                // PayPal settings
                string paypalUrl = WebConfigurationManager.AppSettings["PayPalSubmitUrl"];
                string business = WebConfigurationManager.AppSettings["PayPalBusinessEmail"];
                string item_name = "Advertisement Payment";
                string currency_code = "USD";
                string custom = payment.PaymentID.ToString();
                string returnUrl = Url.Action("Success", "Payment", null, Request.Url.Scheme); // Updated line
                string cancelUrl = WebConfigurationManager.AppSettings["PayPalCancelUrl"];
                string notifyUrl = WebConfigurationManager.AppSettings["PayPalNotifyUrl"];

                // Replace placeholders with actual values
                returnUrl = $"{returnUrl}?paymentId={payment.PaymentID}";
                cancelUrl = $"{cancelUrl}?paymentId={payment.PaymentID}";
                notifyUrl = $"{notifyUrl}?paymentId={payment.PaymentID}";

                string redirectUrl = $"{paypalUrl}?cmd=_xclick&business={business}&item_name={item_name}&amount={Amount}&currency_code={currency_code}&custom={custom}&return={returnUrl}&cancel_return={cancelUrl}&notify_url={notifyUrl}";

                return Redirect(redirectUrl);
            }

            return RedirectToAction("Index", "Home");
        }

        public ActionResult Success()
        {
            //ViewBag.Message = "Payment was successful.";
            //return RedirectToAction("Index", "Home");
            return View();
        }

        [HttpPost]
        public ActionResult IPN()
        {
            var formVals = new Dictionary<string, string>
            {
                { "cmd", "_notify-validate" }
            };

            string response;
            using (var client = new WebClient())
            {
                client.BaseAddress = "https://ipnpb.sandbox.paypal.com"; // Use sandbox for testing
                var req = Encoding.ASCII.GetBytes(Request.Form.ToString() + "&" + string.Join("&", formVals.Select(kvp => kvp.Key + "=" + kvp.Value)));
                var res = client.UploadData("/cgi-bin/webscr", "POST", req);
                response = Encoding.ASCII.GetString(res);
            }

            if (response.Equals("VERIFIED", StringComparison.OrdinalIgnoreCase))
            {
                var txnId = Request["txn_id"];
                var custom = Request["custom"];
                var payment = _context.Payments.SingleOrDefault(p => p.TransactionID == txnId);
                if (payment == null)
                {
                    var paymentId = int.Parse(custom);
                    payment = _context.Payments.Find(paymentId);

                    if (payment != null)
                    {
                        payment.Amount = Convert.ToDecimal(Request["mc_gross"]);
                        payment.PaymentDate = DateTime.Now;
                        payment.PaymentMethod = Request["payment_type"];
                        payment.TransactionID = txnId;
                        payment.Status = "Completed";

                        _context.SaveChanges();

                        var ad = _context.Ads.FirstOrDefault(a => a.PaymentID == paymentId);
                        if (ad != null)
                        {
                            ad.StatusOfAds = "Pending"; // Keep Pending until admin approval
                            _context.SaveChanges();
                        }
                    }
                }
            }

            return new HttpStatusCodeResult(200);
        }

        public ActionResult Cancel()
        {
            ViewBag.Message = "Payment was cancelled.";
            return View();
        }
    }
}