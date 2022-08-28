using BotDetect.Web.Mvc;
using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Helper;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.COMMON.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = Session["returnurl"];// returnUrl;
            return View();

        }
        [HttpPost]
        [AllowAnonymous]
        [CaptchaValidation("txtCaptcha", "captcha", "Incorrect CAPTCHA code!")]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            bool bitByPasLogin = mSystemConfigurationCustomBL.GetmSystemConfigurationBoolean(Configuration.MODULE_NAME, Configuration.Key.byPassLogin, Configuration.DefaultValue.DefaultLangID);
            if (ModelState.IsValid || bitByPasLogin)
            {
                bool bolSuccess = false;
                Principal principal = new Principal();
                principal.txtLangID = Configuration.DefaultValue.DefaultLangID;
                bolSuccess = mUserCustomBL.Login(model.txtUserName, model.txtPassword,Configuration.DefaultValue.DefaultLangID);

                if (bolSuccess == true)
                {
                    mUser userDat = mUserCustomBL.GetMUserbyTxtUserName(model.txtUserName.Trim());
                    if (userDat != null)
                    {
                        MvcCaptcha.ResetCaptcha("captcha");
                        userDat.dtmLastLogin = DateTime.Now;
                        mUserCustomBL.UpdateMUser(userDat, userDat.txtUserName, Configuration.DefaultValue.DefaultLangID, Guid.NewGuid().ToString());
                        return p_SetUserLoginAndRedirect(userDat, model, returnUrl);

                    }
                    else
                    {
                        MvcCaptcha.ResetCaptcha("captcha");
                        ModelState.AddModelError("", "The user name or password is incorrect.");
                        return View(model);
                    }
                }
                else
                {
                    MvcCaptcha.ResetCaptcha("captcha");
                    ModelState.AddModelError("", "The user name or password is incorrect.");
                    return View(model);
                }
            }
            return View(model);
        }
        private ActionResult p_SetUserLoginAndRedirect(mUser objclsAccount, LoginModel model, string returnUrl)
        {
            List<mUserRole> userRoleList = mUserRoleCustomBL.GetAllmUserRoleByRoleAndUser(0, objclsAccount.intUserID);

            Principal principal = new Principal();
            bool bitNoRole = userRoleList.Count < 1;

            principal.txtLangID = Configuration.DefaultValue.DefaultLangID;
            principal.user = objclsAccount;
            foreach (mUserRole u in userRoleList)
            {
                principal.roles.Add(HelperConverter.ParseToInteger(u.intRoleID));
            }
            Session[Configuration.SESSION_NAME] = principal;
            Session.Timeout = 360; //6 jam

            string sUserLogin = objclsAccount.txtEmpID;
            HttpCookie cookie = FormsAuthentication.GetAuthCookie(sUserLogin, true);
            FormsAuthenticationTicket oldTicket = FormsAuthentication.Decrypt(cookie.Value);
            FormsAuthenticationTicket Newticket = new FormsAuthenticationTicket(sUserLogin, true, 1000);
            String strEncryptedTicket = FormsAuthentication.Encrypt(oldTicket);
            cookie.Value = strEncryptedTicket;
            HttpContext.Response.Cookies.Add(cookie);
            FormsAuthentication.SetAuthCookie(sUserLogin, true);
            if (bitNoRole == true)
            {
                return RedirectToAction("Login", "Account");
            }
            else
            {
                return RedirectToLocal(returnUrl);
            }
        }
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (returnUrl == "" || returnUrl == null)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return Redirect(returnUrl);
            }
        }

    }
}