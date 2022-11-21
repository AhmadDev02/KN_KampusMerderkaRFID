using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Masters;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.dashboard.RFIDReader;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;
using KN_KAMPUS_MERDEKA.COMMON.Helper;
using KN_KAMPUS_MERDEKA.MVC.App_Start;
using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
using System;
using System.Net;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        [CheckSessionTimeOut()]
        public ActionResult Index()
        {
            return View();
        }

        //[HttpPost()]
        //public ActionResult Save(RFIDReaderRequest rfidReader)
        //{
        //    try
        //    {
        //        string txtIP_addreess = CurrentSession.getPrincipal.user.intUserID.ToString();
        //        string txtStatus = string.Empty;
        //        if (!ModelState.IsValid)
        //        {
        //            foreach (var er in ModelState.Values)
        //            {
        //                if (er.Errors.Count > 0)
        //                {
        //                    txtStatus = er.Errors[0].ErrorMessage;
        //                };
        //            }
        //            throw new Exception(txtStatus);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Response.StatusCode = (int)HttpStatusCode.BadRequest;
        //        return Json(new ErrorResponse<Exception>(ex));
        //    }

        //    if (mRFIDReaderCustomBL.SaveRFIDReader(string )  )
        //    {

        //    }
        //}
    }
}