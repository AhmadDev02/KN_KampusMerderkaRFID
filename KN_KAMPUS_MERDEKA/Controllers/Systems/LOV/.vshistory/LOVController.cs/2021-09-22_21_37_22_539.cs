using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.Common.Library;
using KN2021_E_RPS.MVC;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using static KN2021_E_RPS.MVC.FilterConfig;
using GlobalClass = KN2021_E_RPS.MVC.GlobalClass;

public class LOVController : System.Web.Mvc.Controller
{
    [CheckSessionTimeOut()]
    [CheckAuthorizationAttribute]
    public ActionResult Index()
    {
        ViewBag.Title = "LOV";
        return View();
    }
    [CheckSessionTimeOut()]
    [CheckAuthorizationAttribute]
    public ActionResult Module()
    {
        ViewBag.Title = "LOV";
        return View();
    }

}
