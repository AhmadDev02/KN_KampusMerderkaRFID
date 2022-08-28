
using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.User;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.User;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Helper;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.MVC.App_Start;
using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using static KN_KAMPUS_MERDEKA.MVC.FilterConfig;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers
{
    public class UserController : Controller
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
                return Json(new SuccessResponse<UserRegister>(new UserRegister()));
            }
            catch (Exception ex)
            {
                return Json(new ErrorResponse<Exception>(ex), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult getAllUser(int page = 1, int size = 20, string cari = "")
        {
            try
            {
                Pageable<UserResponse> pageResponse = mUserCustomBL.findAll(page, size, cari);
                return Json(new SuccessResponse<Pageable<UserResponse>>(pageResponse));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(e));
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
                    mUserCustomBL.ValidateInput(objDat, CurrentSession.getPrincipal.user.intUserID.ToString(), CurrentSession.getPrincipal.txtLangID);
                    if (mUserCustomBL.IsExistMUser(objDat.intUserID))
                    {
                        //Update 
                        bitSuccess = mUserCustomBL.ResetPassword(objDat, CurrentSession.getPrincipal.user.intUserID.ToString(), CurrentSession.getPrincipal.txtLangID, txtGUID);
                        txtStatus = "Password berhasil di reset!";
                    }
                    else
                    {
                        throw new Exception("User tidak ditemukan!");
                    }
                }
                return Json(new SuccessResponse<mUser>(objDat));
            }
            catch (Exception ex)
            {
                return Json(new ErrorResponse<Exception>(ex), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(UserRegister userRegister)
        {
            try
            {
                string userLogin = CurrentSession.getPrincipal.user.intUserID.ToString();
                string txtStatus = string.Empty;
                if (!ModelState.IsValid)
                {
                    foreach(var er in ModelState.Values)
                    {
                        if (er.Errors.Count > 0)
                        {
                            txtStatus= er.Errors[0].ErrorMessage;
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
                    savedUser.txtUpdatedBy = userLogin;
                    savedUser.dtmUpdatedDate = DateTime.Now;
                    //Update 
                    bitSuccess = mUserCustomBL.UpdateMUser(savedUser, userLogin, CurrentSession.getPrincipal.txtLangID, savedUser.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, CurrentSession.getPrincipal.txtLangID);
                }
                else
                {
                    mUser user = new mUser(userRegister);
                    //Create 
                    user.txtGUID = userRegister.txtGUID;
                    user.txtUserName = userRegister.txtUserName;
                    user.txtUpdatedBy = userLogin;
                    user.dtmUpdatedDate = DateTime.Now;
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

