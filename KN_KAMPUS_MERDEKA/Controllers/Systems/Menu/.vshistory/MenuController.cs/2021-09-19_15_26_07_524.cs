using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;


namespace KN2021_E_RPS.MVC2.Controllers
{
    public class MenuController : Controller
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
                List<mMenu> returnList = new List<mMenu>();
                mMenu headerDat = mMenuCustomBL.CreateBlankmMenu();
                return Json(clsAPI.CreateResult(true, headerDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        public ActionResult PopulateParent()
        {
            try
            {
                List<mMenu> returnList = new List<mMenu>();
                returnList = mMenuCustomBL.GetAllMMenu();
                return Json(clsAPI.CreateResult(true, returnList, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        public ActionResult PopulateModule()
        {
            try
            {
                List<mModule> returnList = new List<mModule>();
                returnList = mModuleCustomBL.GetAllMModule();
                return Json(clsAPI.CreateResult(true, returnList, string.Empty, string.Empty));
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
                mMenu retDat = new mMenu();
                if (!txtID.Equals(string.Empty))
                {
                    retDat = mMenuCustomBL.GetMMenu(clsGlobal.ParseToInteger(txtID));
                }

                return Json(clsAPI.CreateResult(true, retDat, string.Empty, string.Empty));
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
                bool bitSuccess = false;
                mMenu objDat = new mMenu();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mMenuCustomBL.parseFromJSON(jsonDat);
                    if (mMenuCustomBL.IsExistMMenu(objDat.intMenuID))
                    {
                        //Update 
                        bitSuccess = mMenuCustomBL.UpdateMMenu(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    }
                    else
                    {
                        //Create 
                        objDat.intMenuID = mMenuCustomBL.SaveMMenu(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                        bitSuccess = true;
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, objDat, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult DeleteData(string data)
        {
            try
            {
                bool bitSuccess = false;
                mMenu objDat = new mMenu();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mMenuCustomBL.parseFromJSON(jsonDat);
                    if (mMenuCustomBL.IsExistMMenu(objDat.intMenuID))
                    {
                        //Delete 
                        bitSuccess = mMenuCustomBL.DeleteMMenu(objDat.intMenuID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, mMenuCustomBL.CreateBlankmMenu(), txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }



    }
}
