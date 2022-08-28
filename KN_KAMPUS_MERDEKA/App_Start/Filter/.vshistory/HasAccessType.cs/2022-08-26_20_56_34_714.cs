using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC.App_Start.Filter
{

    [AttributeUsage(AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class HasAccessType : ActionFilterAttribute
    {
        public enum AccessType
        {
            [Description("FULL")]
            FULL = 1,
            [Description("READ")]
            READ = 2,
        }
        private AccessType acccessType = AccessType.READ;
        private object roles;

        public HasAccessType(AccessType type)
        {
            this.acccessType = type;
        }
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
        {
            try
            {
                dynamic context = filterContext.HttpContext;
                if (context.Session != null)
                {
                    if (GlobalClass.dLogin != null)
                    {
                        string txtUrl = filterContext.HttpContext.Request.CurrentExecutionFilePath.ToString(); //.Url.ToString();
                        mRoleAccess selectedRole = null;
                        for (int i = 0; i < GlobalClass.dLogin.roles.Count; i++)
                        {
                            mRoleAccess RoleAccessDat = mRoleAccessCustomBL.GetPrivilegeUserUrlWithoutMenus(GlobalClass.dLogin.roles[i], txtUrl);
                            if (RoleAccessDat != null)
                            {
                                bool canView = false;
                                bool canEdit = false;
                                if (RoleAccessDat.bitView.HasValue)
                                {
                                    canView = RoleAccessDat.bitView.Value;
                                }
                                if (RoleAccessDat.bitEdit.HasValue)
                                {
                                    canEdit = RoleAccessDat.bitEdit.Value;
                                    selectedRole = RoleAccessDat;
                                    return;
                                }
                            }
                        }

                        if (selectedRole != null)
                        {

                            if (selectedRole.bitView == false)
                            {
                                // Goto Home Page.
                                string redirectTo = "~/";
                                filterContext.Result = new RedirectResult(redirectTo);
                            }
                            if (this.acccessType.Equals(AccessType.FULL) && selectedRole.bitEdit == false)
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
            catch (Exception e)
            {

            }
        }
    }
}