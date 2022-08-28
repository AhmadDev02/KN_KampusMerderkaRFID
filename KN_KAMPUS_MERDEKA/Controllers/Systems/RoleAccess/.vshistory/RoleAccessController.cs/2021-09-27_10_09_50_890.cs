using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Dto.System.RoleAccess.Request;
using KN2021_E_RPS.Common.Dto.System.RoleAccess.Response;
using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.Common.Library;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using static KN2021_E_RPS.MVC.FilterConfig;

namespace KN2021_E_RPS.MVC.Controllers
{
    public class RoleAccessController : Controller
    {
        [FilterConfig.CheckSessionTimeOut()]
        [FilterConfig.CheckAuthorizationAttribute]
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult InitiateData()
        {
            try
            {
                return Json(clsAPI.CreateResult(true, new RoleAccessRequest(), string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult getAllByRole(int intRoleId = 0, int page = 1, int size = 20, string cari = "")
        {
            try
            {
                Pageable<RoleAccessResponse> pageResponse = mRoleAccessCustomBL.findAllByRole(intRoleId, page, size, cari);
                return Json(clsAPI.CreateResult(true, pageResponse, string.Empty, string.Empty));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(e));
            }
        }


        [HttpPost()]
        [ValidateHeaderAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult Delete(int id)
        {
            try
            {
                bool bitSuccess = false;
                mRoleAccess objDat = new mRoleAccess();
                string txtStatus = string.Empty;
                //objDat = mRoleAccessCustomBL.parseFromJSON(jsonDat);
                if (mRoleAccessCustomBL.IsExistMRoleAccess(id))
                {
                    //Delete 
                    bitSuccess = mRoleAccessCustomBL.DeleteMRoleAccess(id);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                }
                return Json(clsAPI.CreateResult(bitSuccess, null, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(RoleAccessRequest roleAccessRequest)
        {
            try
            {
                string userLogin = GlobalClass.dLogin.userDat.intUserID.ToString();
                string txtStatus = string.Empty;
                if (!ModelState.IsValid)
                {
                    foreach (var er in ModelState.Values)
                    {
                        if (er.Errors.Count > 0)
                        {
                            txtStatus = er.Errors[0].ErrorMessage;
                        };
                    }
                    throw new Exception(txtStatus);
                }

                bool bitSuccess = false;

                if (mRoleAccessCustomBL.IsExistMRoleAccess(roleAccessRequest.intRoleAccessID) && roleAccessRequest.intRoleAccessID != 0)
                {
                    mRoleAccess savedRoleAccess = mRoleAccessCustomBL.GetMRoleAccess(roleAccessRequest.intRoleAccessID);
                    savedRoleAccess.intModuleID = roleAccessRequest.intModuleID;
                    savedRoleAccess.dtmUpdatedDate = DateTime.Now;
                    savedRoleAccess.txtUpdatedBy = userLogin;
                    //Update 
                    bitSuccess = mRoleAccessCustomBL.UpdateMRoleAccess(savedRoleAccess, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, savedRoleAccess.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                }
                else
                {
                    mRoleAccess roleAccess = new mRoleAccess(roleAccessRequest);
                    roleAccess.dtmUpdatedDate = DateTime.Now;
                    roleAccess.txtUpdatedBy = userLogin;
                    //Create 
                    roleAccess.txtGUID = roleAccess.txtGUID;
                    roleAccess.intRoleAccessID = mRoleAccessCustomBL.SaveMRoleAccess(roleAccess, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, roleAccess.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    bitSuccess = true;
                }
                return Json(clsAPI.CreateResult(bitSuccess, roleAccessRequest, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(ex));
            }
        }

    }
}