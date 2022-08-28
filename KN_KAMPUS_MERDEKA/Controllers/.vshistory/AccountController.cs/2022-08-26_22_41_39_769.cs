using BotDetect.Web.Mvc;
using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
                        MvcCaptcha.ResetCaptcha("ExampleCaptcha");
                        ModelState.AddModelError("", "The user name or password is incorrect.");
                        return View(model);
                    }
                }
                else
                {
                    MvcCaptcha.ResetCaptcha("ExampleCaptcha");
                    ModelState.AddModelError("", "The user name or password is incorrect.");
                    return View(model);
                }
            }
            return View(model);
        }

    }
}