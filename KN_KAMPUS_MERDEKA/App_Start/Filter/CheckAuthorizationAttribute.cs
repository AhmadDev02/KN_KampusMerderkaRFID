using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC.App_Start.Filter
{

    [AttributeUsage(AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class CheckAuthorizationAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
        {
            dynamic context = filterContext.HttpContext;
            if (context.Session != null)
            {
                if (CurrentSession.getPrincipal != null)
                {
                    //Check jika user bisa akses atau tidak.
                    // Check Privilege User
                    string txtUrl = filterContext.HttpContext.Request.CurrentExecutionFilePath.ToString(); //.Url.ToString();
                    mRoleAccess RoleAccessDat = null;
                    foreach (int roleId in CurrentSession.getPrincipal.roles)
                    {
                        RoleAccessDat = mRoleAccessCustomBL.GetPrivilegeUserUrl(roleId, txtUrl);
                        if (RoleAccessDat != null)
                        {
                            break;
                        }
                    }
                    if (RoleAccessDat != null)
                    {
                        //Check if not authorize to open document.
                        if (RoleAccessDat.bitView == false)
                        {
                            // Goto Home Page.
                            string redirectTo = "~/";
                            filterContext.Result = new RedirectResult(redirectTo);
                        }
                    }
                    else
                    {
                        // Goto Home Page.
                        string redirectTo = "~/";
                        filterContext.Result = new RedirectResult(redirectTo);
                    }
                }

            }
            base.OnActionExecuting(filterContext);
        }
    }
}