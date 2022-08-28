using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace KN2021_E_RPS.MVC.Controllers
{
    public class ParameterController : Controller
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
                List<mParameter_Header> returnList = new List<mParameter_Header>();
                mParameter_Header headerDat = mParameter_HeaderCustomBL.CreateBlankmParameter_Header();
                return Json(clsAPI.CreateResult(true, headerDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult GetData(string txtID)
        {
            try
            {
                mParameter_Header retDat = new mParameter_Header();
                if (!txtID.Equals(string.Empty))
                {
                    retDat = mParameter_HeaderCustomBL.GetMParameter_Header(clsGlobal.ParseToInteger(txtID));
                }

                // Untuk menghilangkan EF object.
                var result = JsonConvert.SerializeObject(retDat, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                retDat = mParameter_HeaderCustomBL.parseFromJSON(JObject.Parse(result));

                return Json(clsAPI.CreateResult(true, retDat, string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }

        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult SaveData(string data, string txtGUID)
        {
            try
            {
                bool bitSuccess = false;
                mParameter_Header objDat = new mParameter_Header();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mParameter_HeaderCustomBL.parseFromJSON(jsonDat);
                    mParameter_HeaderCustomBL.ValidateInput(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID);
                    if (mParameter_HeaderCustomBL.IsExistMParameter_Header(objDat.intParameter_HeaderID))
                    {
                        //Update 
                        bitSuccess = mParameter_HeaderCustomBL.UpdateMParameter_Header(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    }
                    else
                    {
                        //Create 
                        objDat.intParameter_HeaderID = mParameter_HeaderCustomBL.SaveMParameter_Header(objDat, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, txtGUID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                        bitSuccess = true;
                    }
                }

                // Untuk menghilangkan EF object.
                var result = JsonConvert.SerializeObject(objDat, Formatting.Indented, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
                objDat = mParameter_HeaderCustomBL.parseFromJSON(JObject.Parse(result));


                return Json(clsAPI.CreateResult(bitSuccess, objDat, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        [FilterConfig.CheckSessionTimeOut()]
        public ActionResult DeleteData(string data)
        {
            try
            {
                bool bitSuccess = false;
                mParameter_Header objDat = new mParameter_Header();
                string txtStatus = string.Empty;
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mParameter_HeaderCustomBL.parseFromJSON(jsonDat);
                    if (mParameter_HeaderCustomBL.IsExistMParameter_Header(objDat.intParameter_HeaderID))
                    {
                        //Delete 
                        bitSuccess = mParameter_HeaderCustomBL.DeleteMParameter_Header(objDat.intParameter_HeaderID);
                        txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_DELETE_DATA, GlobalClass.dLogin.txtLangID);
                    }
                }
                return Json(clsAPI.CreateResult(bitSuccess, mParameter_HeaderCustomBL.CreateBlankmParameter_Header(), txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsAPI.CreateError(ex));
            }
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public ActionResult AddRow(string data)
        {
            try
            {
                mParameter_Header objDat = mParameter_HeaderCustomBL.CreateBlankmParameter_Header();
                if (!data.Equals(string.Empty))
                {
                    JObject jsonDat = JObject.Parse(data);
                    objDat = mParameter_HeaderCustomBL.parseFromJSON(jsonDat);
                    objDat.mParameter_Detail.Add(mParameter_DetailCustomBL.CreateBlankmParameter_Detail());
                }
                return Json(clsAPI.CreateResult(true, objDat, string.Empty, string.Empty), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }


    }
}
