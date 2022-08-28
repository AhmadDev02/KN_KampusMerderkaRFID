using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        // GET: Error
        [AllowAnonymous]
        public ActionResult NotFOund()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult BadGateway()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult InternalError()
        {
            return View();
        }
    }
}