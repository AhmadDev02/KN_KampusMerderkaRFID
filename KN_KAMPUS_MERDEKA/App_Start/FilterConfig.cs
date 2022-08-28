using System.Web;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
