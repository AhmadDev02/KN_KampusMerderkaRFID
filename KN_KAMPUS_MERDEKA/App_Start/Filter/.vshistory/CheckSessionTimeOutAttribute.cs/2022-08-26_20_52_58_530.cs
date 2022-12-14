using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.COMMON.Model;
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
                        mUser user = new mUser();
                        user = mUserCustomBL.GetMUserbyTxtUserName(filterContext.HttpContext.User.Identity.Name.Trim());

                        if (user != null)
                        {
                            Principal principal = new Principal();
                            principal.txtLangID = Configuration.DefaultValue.DefaultLangID;
                            principal.user = user;

                            //Role 
                            if (user != null)
                            {
                                List<mUserRole> userRoleList = mUserRoleCustomBL.GetAllmUserRoleByRoleAndUser(0, user.intUserID);
                                if (userRoleList != null)
                                {
                                    if (userRoleList.Count > 0)
                                    {
                                        principal.roles.Clear();
                                        foreach (mUserRole u in userRoleList)
                                        {
                                            principal.roles.Add(HelperConverter.ParseToInteger(u.intRoleID));
                                        };
                                    }
                                }
                            }
                            filterContext.HttpContext.Session[Configuration.SESSION_NAME] = principal;
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