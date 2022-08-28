
using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
using System.Web.Mvc;

public class LOVController : System.Web.Mvc.Controller
{
    [CheckSessionTimeOut()]
    [CheckAuthorizationAttribute]
    public ActionResult Index()
    {
        ViewBag.Title = "LOV";
        return View();
    }

    public ActionResult Module(string cari = "")
    {
        ViewBag.Title = "SELECT MODULE";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult Menu(string cari = "")
    {
        ViewBag.Title = "SELECT MENU";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult Role(string cari = "")
    {
        ViewBag.Title = "SELECT ROLE";
        ViewData["cari"] = cari;
        return View();
    }
}
