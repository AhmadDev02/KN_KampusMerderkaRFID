
using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Role;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Role;
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
    public class RoleController : Controller
    {
        // GET: Role
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
                return Json(new SuccessResponse<RoleRequest>(new RoleRequest()));
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
        public ActionResult getAllRole(int page = 1, int size = 20, string cari = "")
        {
            try
            {
                Pageable<RoleResponse> pageResponse = mRoleCustomBL.findAll(page, size, cari);
                return Json(new SuccessResponse<Pageable<RoleResponse>>(pageResponse));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(e));
            }
        }
       

        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(RoleRequest roleRequest)
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

                if (mRoleCustomBL.IsExistMRole(roleRequest.intRoleID) && roleRequest.intRoleID != 0)
                {
                    mRole savedRole = mRoleCustomBL.GetMRole(roleRequest.intRoleID);
                    savedRole.bitSuperuser = roleRequest.bitSuperuser;
                    savedRole.txtRoleName = roleRequest.txtRoleName.ToUpper();
                    savedRole.dtmUpdatedDate = DateTime.Now;
                    savedRole.txtUpdatedBy = userLogin;
                    //Update 
                    bitSuccess = mRoleCustomBL.UpdateMRole(savedRole, userLogin, CurrentSession.getPrincipal.txtLangID, savedRole.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, CurrentSession.getPrincipal.txtLangID);
                }
                else
                {
                    mRole role = new mRole(roleRequest);
                    role.dtmUpdatedDate = DateTime.Now;
                    role.txtUpdatedBy = userLogin;
                    //Create 
                    role.txtGUID = roleRequest.txtGUID;
                    role.intRoleID = mRoleCustomBL.SaveMRole(role, userLogin, CurrentSession.getPrincipal.txtLangID, roleRequest.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, CurrentSession.getPrincipal.txtLangID);
                    bitSuccess = true;
                }
                return Json(new SuccessResponse<RoleRequest>(roleRequest));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(ex));
            }
        }

    }
}