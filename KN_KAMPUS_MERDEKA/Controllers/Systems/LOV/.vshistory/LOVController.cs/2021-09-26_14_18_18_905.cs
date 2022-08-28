
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

    public ActionResult Module()
    {
        ViewBag.Title = "SELECT MODULE";
        return View();
    }
    public ActionResult Menu()
    {
        ViewBag.Title = "SELECT MENU";
        return View();
    }
    public ActionResult Role()
    {
        ViewBag.Title = "SELECT Role";
        return View();
    }
}
