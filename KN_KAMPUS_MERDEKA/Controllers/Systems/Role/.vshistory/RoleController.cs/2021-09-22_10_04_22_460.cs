using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Dto.Role.Request;
using KN2021_E_RPS.Common.Dto.Role.Response;
using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.Common.Library;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using static KN2021_E_RPS.MVC.FilterConfig;

namespace KN2021_E_RPS.MVC.Controllers
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
                return Json(clsAPI.CreateResult(true, new RoleRequest(), string.Empty, string.Empty));
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
                Pageable<RoleResponse> pageResponse = mRoleCustomBL.findAll(page, size, cari);
                return Json(clsAPI.CreateResult(true, pageResponse, string.Empty, string.Empty));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(e));
            }
        }
        public ActionResult ResetPassword(string data, string txtGUID)
        {
            try
            {
                bool bitSuccess = false;
                mUser objDat = new mUser();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mUserCustomBL.parseFromJSON(jsonDat);
                    mUserCustomBL.ValidateInput(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID);
                    if (mUserCustomBL.IsExistMUser(objDat.intUserID))
                    {
                        //Update 
                        bitSuccess = mUserCustomBL.ResetPassword(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = "Password berhasil di reset!";
                    }
                    else
                    {
                        throw new Exception("User tidak ditemukan!");
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
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(UserRegister userRegister)
        {
            try
            {
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

                if (mUserCustomBL.IsExistMUser(userRegister.intUserID) && userRegister.intUserID != 0)
                {
                    mUser savedUser = mUserCustomBL.GetMUser(userRegister.intUserID);
                    savedUser.bitActive = userRegister.bitActive;
                    savedUser.txtEmail = userRegister.txtEmail;
                    savedUser.bitUseActiveDirectory = userRegister.bitUseActiveDirectory;
                    savedUser.txtEmpID = userRegister.txtEmpID;
                    savedUser.txtFullName = userRegister.txtFullName;
                    if (!userRegister.txtPassword.Equals("unchanged"))
                    {
                        savedUser.txtPassword = userRegister.txtPassword;
                    }
                    savedUser.txtNick = userRegister.txtNick;
                    savedUser.txtUserName = userRegister.txtUserName;
                    //Update 
                    bitSuccess = mUserCustomBL.UpdateMUser(savedUser, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, savedUser.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                }
                else
                {
                    mUser user = new mUser(userRegister);
                    //Create 
                    user.txtGUID = userRegister.txtGUID;
                    user.intUserID = mUserCustomBL.SavemUser(user, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, userRegister.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    bitSuccess = true;
                }
                return Json(clsAPI.CreateResult(bitSuccess, userRegister, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(ex));
            }
        }

    }
}