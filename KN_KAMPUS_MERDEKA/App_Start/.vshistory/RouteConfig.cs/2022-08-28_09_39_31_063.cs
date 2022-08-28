using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace KN_KAMPUS_MERDEKA.MVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // BotDetect requests must not be routed 
            routes.IgnoreRoute("{*botdetect}",
               new { botdetect = @"(.*)BotDetectCaptcha\.ashx" });
            routes.MapRoute(
               name: "UserRole",
               url: "System/UserRole/{action}/{id}",
               defaults: new { controller = "UserRole", action = "Index", id = UrlParameter.Optional }
           );

            routes.MapRoute(
                name: "Role",
                url: "System/Role/{action}/{id}",
                defaults: new { controller = "Role", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "RoleAccess",
                url: "System/RoleAccess/{action}/{id}",
                defaults: new { controller = "RoleAccess", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "User",
                url: "System/User/{action}/{id}",
                defaults: new { controller = "User", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Module",
                url: "System/Module/{action}/{id}",
                defaults: new { controller = "Module", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Menu",
                url: "System/Menu/{action}/{id}",
                defaults: new { controller = "Menu", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "LOV",
                url: "System/LOV/{action}/{id}",
                defaults: new { controller = "LOV", action = "Index", id = UrlParameter.Optional }
            );


            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
