
using System.Web.Mvc;
using static KN2021_E_RPS.MVC.FilterConfig;

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
        ViewBag.Title = "SELECT MODULE";
        return View();
    }

}
