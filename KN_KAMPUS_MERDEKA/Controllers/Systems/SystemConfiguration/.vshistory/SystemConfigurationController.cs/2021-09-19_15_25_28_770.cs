using KN2021_E_RPS.BussLogic.CustomBL;
using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.DAL;
using KN2021_E_RPS.DAL.Context;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Mvc;


namespace KN2021_E_RPS.MVC.Controllers
{
    public class SystemConfigurationController : Controller
    {
        [FilterConfig.CheckSessionTimeOut()]
        [FilterConfig.CheckAuthorizationAttribute]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult InitiateData()
        {
            try
            {
                List<mSystemConfiguration> returnList = new List<mSystemConfiguration>();
                mSystemConfiguration headerDat = mSystemConfigurationCustomBL.CreateBlankmSystemConfiguration();
                return Json(clsAPI.CreateResult(true, headerDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult GetData(string txtID)
        {
            try
            {
                return Json(clsAPI.CreateResult(true, null, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult SaveData(string data, string txtGUID)
        {
            try
            {
                return Json(clsAPI.CreateResult(true, null, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult GenerateAll(string data)
        {
            try
            {
                clsMMainCustomBL.SetupSystemConfigurationALL(GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, Guid.NewGuid().ToString());
                return Json(clsAPI.CreateResult(true, null, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost()]
        public ActionResult GetDataSourceJSONPaging(string data, string txtSystemConfigurationID)
        {
            string txtSystemConfigurationID2 = Request.Form["txtSystemConfigurationID"].ToString();
            try
            {
                List<mSystemConfiguration> returnList = new List<mSystemConfiguration>();
                returnList = mSystemConfigurationCustomBL.GetAllmSystemConfigurationBytxtSystemConfigurationID(txtSystemConfigurationID);

                for (int i = 0; i < returnList.Count; i++)
                {
                    mSystemConfiguration idat = returnList[i];
                    idat.intIndex = i;
                }
                return Json(clsAPIPaging.CreateResultJSONPaging(0, (int)returnList.Count, (int)returnList.Count, returnList), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult UpdateItem(string data, string txtGUID)
        {
            try
            {
                bool bitSuccess = false;
                mSystemConfiguration objDat = new mSystemConfiguration();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mSystemConfigurationCustomBL.parseFromJSON(jsonDat);
                    if (mSystemConfigurationCustomBL.IsExistmSystemConfiguration(objDat.txtSystemConfigurationID, objDat.txtKeyID))
                    {
                        //Update 
                        bitSuccess = mSystemConfigurationCustomBL.UpdatemSystemConfiguration(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    }
                    else
                    {
                        //Create 
                        mSystemConfigurationCustomBL.SavemSystemConfiguration(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                        bitSuccess = true;
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, objDat, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost()]
        public ActionResult GiteaInfo(object data)
        {
            try
            {
                SFERPSEntities dObjContext = new SFERPSEntities(EFClientUtility.GetConnectionString());
                DbContextTransaction dObjTran = dObjContext.Database.BeginTransaction();
                clsEmailBL.SendEmail("Smartfactory ada push baru", "no-reply@kalbenutritionals.com", "Smartfactory Update Webhook", "asep.sopiyan@kalbenutritionals.com", ",", dObjContext, dObjTran);
                    return Json(clsAPI.CreateResult(true, true, "OK", string.Empty));
            }
            catch(Exception e)
            {
                return Json(clsAPI.CreateError(e));
            }
        }


    }
}
