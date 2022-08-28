using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace KN2021_E_RPS.MVC2.Controllers
{
    public class RoleController : Controller
    {
        // GET: Role
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
                List<mRole> returnList = new List<mRole>();
                mRole headerDat = mRoleCustomBL.CreateBlankmRole();
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
                mRole retDat = new mRole();
                if (!txtID.Equals(string.Empty))
                {
                    retDat = mRoleCustomBL.GetMRole(clsGlobal.ParseToInteger(txtID));
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
        public ActionResult GetRole()
        {
            try
            {
                mRole retDat = new mRole();

                retDat = mRoleCustomBL.GetMRoleByintUserID(GlobalClass.dLogin.userDat.intUserID);

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
                mRole objDat = new mRole();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mRoleCustomBL.parseFromJSON(jsonDat);
                    mRoleCustomBL.ValidateInput(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID);
                    if (mRoleCustomBL.IsExistMRole(objDat.intRoleID))
                    {
                        //Update 
                        bitSuccess = mRoleCustomBL.UpdateMRole(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    }
                    else
                    {
                        //Create 
                        objDat.intRoleID = mRoleCustomBL.SaveMRole(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
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
                mRole objDat = new mRole();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mRoleCustomBL.parseFromJSON(jsonDat);
                    if (mRoleCustomBL.IsExistMRole(objDat.intRoleID))
                    {
                        //Delete 
                        bitSuccess = mRoleCustomBL.DeleteMRole(objDat.intRoleID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, mRoleCustomBL.CreateBlankmRole(), txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

    }
}