
using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.UserRole;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.UserRole;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Helper;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.MVC.App_Start;
using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using static KN_KAMPUS_MERDEKA.MVC.FilterConfig;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers
{
    public class UserRoleController : Controller
    {
        // GET: UserRole
        [CheckSessionTimeOut()]
        [CheckAuthorizationAttribute]
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
                return Json(new SuccessResponse<UserRoleRequest>( new UserRoleRequest()));
            }
            catch (Exception ex)
            {
                return Json(new ErrorResponse<Exception>(ex), JsonRequestBehavior.AllowGet);
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
                return Json(new SuccessResponse<Pageable<UserRoleResponse>>(pageResponse));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(e));
            }
        }


        [HttpPost()]
        [ValidateHeaderAntiForgeryToken()]
        [CheckSessionTimeOut()]
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
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_DELETE_DATA, CurrentSession.getPrincipal.txtLangID);
                }
                return Json(new SuccessResponse<mRoleAccess>(null));
            }
            catch (Exception ex)
            {
                return Json(new ErrorResponse<Exception>(ex));
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(UserRoleRequest userRoleRequest)
        {
            try
            {
                string userLogin = CurrentSession.getPrincipal.user.intUserID.ToString();
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
                    bitSuccess = mUserRoleCustomBL.UpdateMUserRole(savedUserRole, userLogin, CurrentSession.getPrincipal.txtLangID, savedUserRole.txtGUID);
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