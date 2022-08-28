using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KN_KAMPUS_MERDEKA.MVC.App_Start
{
    public static class CurrentSession
    {
        public static Principal getCurrentUser
        {
            get { return (Principal)HttpContext.Current.Session[Configuration.SESSION_NAME]; }
        }
    }
}