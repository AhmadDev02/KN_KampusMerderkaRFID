using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Dto.Module.Request;
using KN2021_E_RPS.Common.Dto.Module.Response;
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
    public class ModuleController : Controller
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
                return Json(clsAPI.CreateResult(true, new ModuleRequest(), string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult getAllRole(int page = 1, int size = 20, string cari = "")
        {
            try
            {
                Pageable<ModuleResponse> pageResponse = mModuleCustomBL.findAll(page, size, cari);
                return Json(clsAPI.CreateResult(true, pageResponse, string.Empty, string.Empty));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(e));
            }
        }


        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(ModuleRequest roleRequest)
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

                if (mRoleCustomBL.IsExistMRole(roleRequest.intRoleID) && roleRequest.intRoleID != 0)
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
