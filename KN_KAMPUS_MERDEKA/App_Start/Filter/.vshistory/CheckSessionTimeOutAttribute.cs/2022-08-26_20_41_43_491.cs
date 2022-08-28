using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace KN_KAMPUS_MERDEKA.MVC.App_Start.Filter
{
    [AttributeUsage(AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class CheckSessionTimeOutAttribute : ActionFilterAttribute
    {
        //private HttpContextBase x;
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)

        {
            dynamic context = filterContext.HttpContext;
            if (context.Session != null)
            {
                if (CurrentSession.getPrincipal == null)
                {
                    if (filterContext.HttpContext.User.Identity.IsAuthenticated)
                    {
                        mUser objclsAccount = new mUser();
                        objclsAccount = mUserCustomBL.GetMUserbyTxtUserName(filterContext.HttpContext.User.Identity.Name.Trim());

                        if (objclsAccount != null)
                        {
                            clsLogin dLogin = new clsLogin();
                            dLogin.txtLangID = clsMMainConstant.CONFIGURATION.DefaultValue.DefaultLangID;
                            dLogin.userDat = objclsAccount;

                            //Role 
                            if (objclsAccount != null)
                            {
                                List<mUserRole> userRoleList = mUserRoleCustomBL.GetAllmUserRoleByRoleAndUser(0, objclsAccount.intUserID);
                                if (userRoleList != null)
                                {
                                    if (userRoleList.Count > 0)
                                    {
                                        dLogin.roles.Clear();
                                        foreach (mUserRole u in userRoleList)
                                        {
                                            dLogin.roles.Add(clsGlobal.ParseToInteger(u.intRoleID));
                                        };
                                    }
                                }
                            }
                            filterContext.HttpContext.Session[clsGlobal.SessionName.objclsAccount] = dLogin;
                            filterContext.HttpContext.Session.Timeout = 120;
                        }
                        else
                        {
                            //Check jika user Login masih ada. 
                            HttpContext.Current.Session.Clear();
                            FormsAuthentication.SignOut();
                            var url = HttpContext.Current.Request.Url.AbsoluteUri;
                            filterContext.HttpContext.Session["returnurl"] = url;

                            //  string redirectTo = clsPathHelper.AppVirtualDirectory + "/Account/Login";
                            string redirectTo = "~/Account/Login";
                            filterContext.Result = new RedirectResult(redirectTo);
                        }
                    }
                    else
                    {

                        //Check jika user Login masih ada. 
                        HttpContext.Current.Session.Clear();
                        FormsAuthentication.SignOut();
                        var url = HttpContext.Current.Request.Url.AbsoluteUri;
                        filterContext.HttpContext.Session["returnurl"] = url;

                        //  string redirectTo = clsPathHelper.AppVirtualDirectory + "/Account/Login";
                        string redirectTo = "~/Account/Login";
                        filterContext.Result = new RedirectResult(redirectTo);
                    }

                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}