using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace KN2021_E_RPS.MVC2.Controllers
{
    public class ModuleController : Controller
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
                List<mModule> returnList = new List<mModule>();
                mModule headerDat = mModuleCustomBL.CreateBlankmModule();
                return Json(clsAPI.CreateResult(true, headerDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult GetData(string txtID)
        {
            try
            {
                mModule retDat = new mModule();
                if (!txtID.Equals(string.Empty))
                {
                    retDat = mModuleCustomBL.GetMModule(clsGlobal.ParseToInteger(txtID));
                }

                return Json(clsAPI.CreateResult(true, retDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
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
                mModule objDat = new mModule();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mModuleCustomBL.parseFromJSON(jsonDat);
                    mModuleCustomBL.ValidateInput(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID);
                    if (mModuleCustomBL.IsExistMModule(objDat.intModuleID))
                    {
                        //Update 
                        bitSuccess = mModuleCustomBL.UpdateMModule(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    }
                    else
                    {
                        //Create 
                        objDat.intModuleID = mModuleCustomBL.SaveMModule(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                        bitSuccess = true;
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, objDat, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
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
                mModule objDat = new mModule();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mModuleCustomBL.parseFromJSON(jsonDat);
                    if (mModuleCustomBL.IsExistMModule(objDat.intModuleID))
                    {
                        //Delete 
                        bitSuccess = mModuleCustomBL.DeleteMModule(objDat.intModuleID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, mModuleCustomBL.CreateBlankmModule(), txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }


    }
}
