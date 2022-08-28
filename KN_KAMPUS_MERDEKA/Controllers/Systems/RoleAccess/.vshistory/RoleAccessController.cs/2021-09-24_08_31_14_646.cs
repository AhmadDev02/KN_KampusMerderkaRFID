using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace KN2021_E_RPS.MVC.Controllers
{
    public class RoleAccessController : Controller
    {
        // GET: RoleAccess
        //[FilterConfig.CheckSessionTimeOut()]
        //[FilterConfig.CheckAuthorizationAttribute]
        public ActionResult Index()
        {
            return View();
        }



        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult DeleteData(string data)
        {
            try
            {
                bool bitSuccess = false;
                mRoleAccess objDat = new mRoleAccess();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    //objDat = mRoleAccessCustomBL.parseFromJSON(jsonDat);
                    if (mRoleAccessCustomBL.IsExistMRoleAccess(objDat.intRoleAccessID))
                    {
                        //Delete 
                        bitSuccess = mRoleAccessCustomBL.DeleteMRoleAccess(objDat.intRoleAccessID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, null, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }


    }
}