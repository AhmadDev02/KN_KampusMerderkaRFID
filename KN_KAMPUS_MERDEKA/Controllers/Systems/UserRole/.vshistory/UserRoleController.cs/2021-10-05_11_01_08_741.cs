using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Dto.System.UserRole.Request;
using KN2021_E_RPS.Common.Dto.System.UserRole.Response;
using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.Common.Entity.System;
using KN2021_E_RPS.Common.Entity.Systems;
using KN2021_E_RPS.Common.Library;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using static KN2021_E_RPS.MVC.FilterConfig;

namespace KN2021_E_RPS.MVC.Controllers
{
    public class UserRoleController : Controller
    {
        // GET: UserRole
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
                return Json(clsAPI.CreateResult(true, new UserRoleRequest(), string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult getAllByUser(int intUserId = 0, int page = 1, int size = 20, string cari = "")
        {
            try
            {
                Pageable<UserRoleResponse> pageResponse = mUserRoleCustomBL.findAllByUser(intUserId, page, size, cari);
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
                    bitSuccess = mUserRoleCustomBL.DeleteMUserRole(id);
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
        public ActionResult Save(UserRoleRequest userRoleRequest)
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

                if (mUserRoleCustomBL.IsExistMUserRole(userRoleRequest.intUserRoleID) && userRoleRequest.intUserRoleID != 0)
                {
                    mUserRole savedUserRole = mUserRoleCustomBL.GetMUserRole(userRoleRequest.intUserRoleID);
                    savedUserRole.intRoleID = userRoleRequest.intRoleID;
                    savedUserRole.dtmUpdatedDate = DateTime.Now;
                    savedUserRole.txtUpdatedBy = userLogin;
                    //Update 
                    bitSuccess = mUserRoleCustomBL.UpdateMUserRole(savedUserRole, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, savedUserRole.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                }
                else
                {
                    mUserRole userRole = new mUserRole(userRoleRequest);
                    userRole.dtmUpdatedDate = DateTime.Now;
                    userRole.txtUpdatedBy = userLogin;
                    //Create 
                    userRole.txtGUID = userRoleRequest.txtGUID;
                    userRole.intUserRoleID = mUserRoleCustomBL.SaveMUserRole(userRole, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, userRole.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    bitSuccess = true;
                }
                return Json(clsAPI.CreateResult(bitSuccess, userRoleRequest, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(ex));
            }
        }

    

    }
}