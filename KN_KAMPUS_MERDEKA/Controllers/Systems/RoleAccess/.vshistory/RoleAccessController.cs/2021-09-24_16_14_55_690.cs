using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Dto.RoleAccess.Request;
using KN2021_E_RPS.Common.Dto.RoleAccess.Response;
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
        // GET: RoleAccess
        //[FilterConfig.CheckSessionTimeOut()]
        //[FilterConfig.CheckAuthorizationAttribute]
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
                    //objDat = mRoleAccessCustomBL.parseFromJSON(jsonDat);
                    if (mRoleAccessCustomBL.IsExistMRoleAccess(objDat.intRoleAccessID))
                    {
                        //Delete 
                        bitSuccess = mRoleAccessCustomBL.DeleteMRoleAccess(objDat.intRoleAccessID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                    }
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

                if (mRoleAccessCustomBL.IsExistMRoleAccess(roleAccessRequest.intRoleID) && roleRequest.intRoleID != 0)
                {
                    mRole savedRole = mRoleCustomBL.GetMRole(roleRequest.intRoleID);
                    savedRole.bitSuperuser = roleRequest.bitSuperuser;
                    savedRole.txtRoleName = roleRequest.txtRoleName;
                    savedRole.dtmUpdatedDate = DateTime.Now;
                    savedRole.txtUpdatedBy = userLogin;
                    //Update 
                    bitSuccess = mRoleCustomBL.UpdateMRole(savedRole, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, savedRole.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                }
                else
                {
                    mRole role = new mRole(roleRequest);
                    role.dtmUpdatedDate = DateTime.Now;
                    role.txtUpdatedBy = userLogin;
                    //Create 
                    role.txtGUID = roleRequest.txtGUID;
                    role.intRoleID = mRoleCustomBL.SaveMRole(role, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, roleRequest.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    bitSuccess = true;
                }
                return Json(clsAPI.CreateResult(bitSuccess, roleRequest, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(ex));
            }
        }

    }
}