
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
    public ActionResult VariantCategory(string cari = "")
    {
        ViewBag.Title = "SELECT VARIANT CATEGORY";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult Variant(string cari = "")
    {
        ViewBag.Title = "SELECT VARIANT";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult Product(string cari = "")
    {
        ViewBag.Title = "SELECT PRODUCT";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult Alergen(string cari = "")
    {
        ViewBag.Title = "SELECT ALERGEN";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult MetodeChangeOver(string cari = "")
    {
        ViewBag.Title = "SELECT METODE CHANGE OVER";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult MaterialChangeOver(string cari = "")
    {
        ViewBag.Title = "SELECT MATERIAL CHANGE OVER";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult ProductionLine(string cari = "")
    {
        ViewBag.Title = "SELECT PRODUCTION LINE";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult ProductVariant(string cari = "")
    {
        ViewBag.Title = "SELECT PRODUCT VARIANT";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult Auger(string cari = "")
    {
        ViewBag.Title = "SELECT AUGER";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult ProductVariantAugerGramasi(string cari = "")
    {
        ViewBag.Title = "SELECT Gramasi";
        ViewData["cari"] = cari;
        return View();
    }
    public ActionResult Simulai4Week(string cari = "")
    {
        ViewBag.Title = "SELECT Week";
        ViewData["cari"] = cari;
        return View();
    }
}
