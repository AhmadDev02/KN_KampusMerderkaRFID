
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
        ViewBag.Title = "SELECT ROLE";
        return View();
    }
    public ActionResult VariantCategory()
    {
        ViewBag.Title = "SELECT VARIANT CATEGORY";
        return View();
    }
    public ActionResult Variant()
    {
        ViewBag.Title = "SELECT VARIANT";
        return View();
    }
    public ActionResult Product()
    {
        ViewBag.Title = "SELECT PRODUCT";
        return View();
    }
    public ActionResult Alergen()
    {
        ViewBag.Title = "SELECT ALERGEN";
        return View();
    }
    public ActionResult MetodeChangeOver()
    {
        ViewBag.Title = "SELECT METODE CHANGE OVER";
        return View();
    }
    public ActionResult MaterialChangeOver()
    {
        ViewBag.Title = "SELECT MATERIAL CHANGE OVER";
        return View();
    }
    public ActionResult ProductionLine()
    {
        ViewBag.Title = "SELECT PRODUCTION LINE";
        return View();
    }
}
