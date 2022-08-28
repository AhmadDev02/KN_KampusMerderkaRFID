
using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.RoleAccess;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.RoleAccess;
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
    public class RoleAccessController : Controller
    {
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
                return Json(new SuccessResponse<RoleAccessRequest>( new RoleAccessRequest()));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(ex), JsonRequestBehavior.AllowGet);
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
                return Json(new SuccessResponse<Pageable<RoleAccessResponse>>(pageResponse));
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
                    bitSuccess = mRoleAccessCustomBL.DeleteMRoleAccess(id);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_DELETE_DATA, CurrentSession.getPrincipal.txtLangID);
                }
                return Json(new SuccessResponse<mRoleAccess>( objDat));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(ex));
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(RoleAccessRequest roleAccessRequest)
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

                if (mRoleAccessCustomBL.IsExistMRoleAccess(roleAccessRequest.intRoleAccessID) && roleAccessRequest.intRoleAccessID != 0)
                {
                    mRoleAccess savedRoleAccess = mRoleAccessCustomBL.GetMRoleAccess(roleAccessRequest.intRoleAccessID);
                    savedRoleAccess.intModuleID = roleAccessRequest.intModuleID;
                    savedRoleAccess.dtmUpdatedDate = DateTime.Now;
                    savedRoleAccess.txtUpdatedBy = userLogin;
                    //Update 
                    bitSuccess = mRoleAccessCustomBL.UpdateMRoleAccess(savedRoleAccess, userLogin, CurrentSession.getPrincipal.txtLangID, savedRoleAccess.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA,CurrentSession.getPrincipal.txtLangID);
                }
                else
                {
                    mRoleAccess roleAccess = new mRoleAccess(roleAccessRequest);
                    roleAccess.dtmUpdatedDate = DateTime.Now;
                    roleAccess.txtUpdatedBy = userLogin;
                    //Create 
                    roleAccess.txtGUID = roleAccess.txtGUID;
                    roleAccess.intRoleAccessID = mRoleAccessCustomBL.SaveMRoleAccess(roleAccess, userLogin, CurrentSession.getPrincipal.txtLangID, roleAccess.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, CurrentSession.getPrincipal.txtLangID);
                    bitSuccess = true;
                }
                return Json(new SuccessResponse<RoleAccessRequest>( roleAccessRequest));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(ex));
            }
        }

    }
}