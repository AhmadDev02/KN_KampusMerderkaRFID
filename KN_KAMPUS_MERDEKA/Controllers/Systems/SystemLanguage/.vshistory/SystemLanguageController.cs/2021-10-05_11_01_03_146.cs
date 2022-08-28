using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.Common.Entity.System;
using System;
using System.Collections.Generic;
using System.Web.Mvc;


namespace KN2021_E_RPS.MVC.Controllers
{
    public class SystemLanguageController : Controller
    {
        [FilterConfig.CheckSessionTimeOut()]
        [FilterConfig.CheckAuthorizationAttribute]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult InitiateData()
        {
            try
            {
                List<mSystemLanguage> returnList = new List<mSystemLanguage>();
                mSystemLanguage headerDat = mSystemLanguageCustomBL.CreateBlankmSystemLanguage();
                return Json(clsAPI.CreateResult(true, headerDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult GetData(string txtID)
        {
            try
            {
                ////mSystemLanguage retDat = new mSystemLanguage();
                ////if (!txtID.Equals(string.Empty))
                ////{
                ////    retDat = mSystemLanguageCustomBL.GetMSystemLanguage(clsGlobal.ParseToInteger(txtID));
                ////}

                ////return Json(clsAPI.CreateResult(true, retDat, string.Empty, string.Empty));
                return Json(clsAPI.CreateResult(true, null, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult SaveData(string data, string txtGUID)
        {
            try
            {
                return Json(clsAPI.CreateResult(true, null, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult GenerateAll(string data)
        {
            try
            {
                clsMMainCustomBL.SetupSystemLanguageALL(GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, Guid.NewGuid().ToString());
                return Json(clsAPI.CreateResult(true, null, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

    }
}
