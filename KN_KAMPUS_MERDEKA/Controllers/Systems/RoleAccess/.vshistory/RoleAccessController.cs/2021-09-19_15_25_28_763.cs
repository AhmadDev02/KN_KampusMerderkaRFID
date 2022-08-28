using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace KN2021_E_RPS.MVC.Controllers
{
    public class RoleAccessController : Controller
    {
        // GET: RoleAccess
        //[FilterConfig.CheckSessionTimeOut()]
        //[FilterConfig.CheckAuthorizationAttribute]
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
                List<mRoleAccess> returnList = new List<mRoleAccess>();
                mRoleAccess headerDat = mRoleAccessCustomBL.CreateBlankmRoleAccess();
                return Json(clsAPI.CreateResult(true, headerDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        public ActionResult PopulateRole()
        {
            try
            {
                List<mRole> returnList = new List<mRole>();
                returnList = mRoleCustomBL.GetAllMRole();
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
                mRoleAccess retDat = new mRoleAccess();
                if (!txtID.Equals(string.Empty))
                {
                    retDat = mRoleAccessCustomBL.GetMRoleAccess(clsGlobal.ParseToInteger(txtID));
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
                mRoleAccess objDat = new mRoleAccess();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mRoleAccessCustomBL.parseFromJSON(jsonDat);
                    mRoleAccessCustomBL.ValidateInput(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID);
                    if (mRoleAccessCustomBL.IsExistMRoleAccess(objDat.intRoleAccessID))
                    {
                        //Update 
                        bitSuccess = mRoleAccessCustomBL.UpdateMRoleAccess(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    }
                    else
                    {
                        //Create 
                        objDat.intRoleAccessID = mRoleAccessCustomBL.SaveMRoleAccess(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
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
                mRoleAccess objDat = new mRoleAccess();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mRoleAccessCustomBL.parseFromJSON(jsonDat);
                    if (mRoleAccessCustomBL.IsExistMRoleAccess(objDat.intRoleAccessID))
                    {
                        //Delete 
                        bitSuccess = mRoleAccessCustomBL.DeleteMRoleAccess(objDat.intRoleAccessID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, mRoleAccessCustomBL.CreateBlankmRoleAccess(), txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }


    }
}