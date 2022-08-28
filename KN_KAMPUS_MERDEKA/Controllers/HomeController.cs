using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers
{
    public class HomeController : Controller
    {
        [CheckSessionTimeOut()]
        public ActionResult Index()
        {
            return View();
        }
    }
}