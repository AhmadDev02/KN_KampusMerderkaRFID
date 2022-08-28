
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

    public ActionResult Module(string cari = "")
    {
        ViewBag.Title = "SELECT MODULE";
        return View();
    }
    public ActionResult Menu(string cari = "")
    {
        ViewBag.Title = "SELECT MENU";
        return View();
    }
    public ActionResult Role(string cari = "")
    {
        ViewBag.Title = "SELECT ROLE";
        return View();
    }
    public ActionResult VariantCategory(string cari = "")
    {
        ViewBag.Title = "SELECT VARIANT CATEGORY";
        return View();
    }
    public ActionResult Variant(string cari = "")
    {
        ViewBag.Title = "SELECT VARIANT";
        return View();
    }
    public ActionResult Product(string cari = "")
    {
        ViewBag.Title = "SELECT PRODUCT";
        return View();
    }
    public ActionResult Alergen(string cari = "")
    {
        ViewBag.Title = "SELECT ALERGEN";
        return View();
    }
    public ActionResult MetodeChangeOver(string cari = "")
    {
        ViewBag.Title = "SELECT METODE CHANGE OVER";
        return View();
    }
    public ActionResult MaterialChangeOver(string cari = "")
    {
        ViewBag.Title = "SELECT MATERIAL CHANGE OVER";
        return View();
    }
    public ActionResult ProductionLine(string cari = "")
    {
        ViewBag.Title = "SELECT PRODUCTION LINE";
        return View();
    }
    public ActionResult ProductVariant(string cari = "")
    {
        ViewBag.Title = "SELECT PRODUCT VARIANT";
        return View();
    }
    public ActionResult Auger(string cari = "")
    {
        ViewBag.Title = "SELECT AUGER";
        return View();
    }
    public ActionResult ProductVariantAugerGramasi(string cari = "")
    {
        ViewBag.Title = "SELECT Gramasi";
        ViewData["cari"] = cari;
        return View();
    }
}
