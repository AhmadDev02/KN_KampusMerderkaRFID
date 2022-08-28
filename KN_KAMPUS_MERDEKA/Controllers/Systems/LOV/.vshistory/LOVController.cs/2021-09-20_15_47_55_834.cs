using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.Common.Library;
using KN2021_E_RPS.MVC;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using GlobalClass = KN2021_E_RPS.MVC.GlobalClass;

public class LOVController : System.Web.Mvc.Controller
{
    public ActionResult Index()
    {

        return View();
    }

    [HttpPost()]
    [ValidateAntiForgeryToken()]
    public ActionResult GetDataSource(string data)
    {
        try
        {
            JArray jarrayDat = default(JArray);
            List<clsMLOV> returnList = new List<clsMLOV>();

            if (!data.Equals(string.Empty))
            {
                jarrayDat = (JArray)JsonConvert.DeserializeObject(data);
                if (jarrayDat != null)
                {
                    foreach (JObject jObj in jarrayDat)
                    {
                        string txtModule = jObj[clsGlobal.Request.Mdl].ToString();
                        string txtFunction = jObj[clsGlobal.Request.Fnc].ToString();
                        string txtQuery = jObj[clsGlobal.Request.Query].ToString();
                        decimal decTotalRow = 0;
                        returnList = ProcessData(txtModule, txtFunction, txtQuery, 0, 0, 0, string.Empty, ref decTotalRow);
                    }
                }
            }

            return Json(clsAPI.CreateResult(true, returnList, string.Empty, string.Empty));
        }
        catch (Exception ex)
        {
            return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
        }
    }

    [HttpPost()]
    public ActionResult GetDataSourceJSONPaging(string data)
    {
        if (GlobalClass.dLogin == null)
        {
            return Json(clsAPIPaging.CreateResultJSONPaging(0, (int)0, (int)0, new List<clsMLOV> { }), JsonRequestBehavior.AllowGet);
        }

        int intStart = clsGlobal.ParseToInteger(Request.Form["start"]);
        int intLength = clsGlobal.ParseToInteger(Request.Form["length"]);
        string txtSearch = Request.Form["search[value]"].ToString();
        int intDraw = clsGlobal.ParseToInteger(Request.Form["draw"]);
        decimal decTotalRow = decimal.Zero;
        intStart += 1;
        try
        {
            JArray jarrayDat = default(JArray);
            List<clsMLOV> returnList = new List<clsMLOV>();

            if (!data.Equals(string.Empty))
            {
                jarrayDat = (JArray)JsonConvert.DeserializeObject(data);
                if (jarrayDat != null)
                {
                    foreach (JObject jObj in jarrayDat)
                    {
                        string txtModule = jObj[clsGlobal.Request.Mdl].ToString();
                        string txtFunction = jObj[clsGlobal.Request.Fnc].ToString();
                        string txtQuery = jObj[clsGlobal.Request.Query].ToString();

                        returnList = ProcessData(txtModule, txtFunction, txtQuery, intStart, intStart + (intLength - 1), intLength, txtSearch, ref decTotalRow);
                    }
                }
            }

            return Json(clsAPIPaging.CreateResultJSONPaging(intDraw, (int)decTotalRow, (int)decTotalRow, returnList), JsonRequestBehavior.AllowGet);
        }
        catch (Exception ex)
        {
            return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
        }
    }

    [HttpGet()]
    public ActionResult GetDataSource(string txtModule, string txtFunction, string txtQuery)
    {
        try
        {
            List<clsMLOV> returnList = new List<clsMLOV>();
            decimal decTotalRow = 0;
            returnList = ProcessData(txtModule, txtFunction, txtQuery, 0, 0, 0, string.Empty, ref decTotalRow);
            return Json(clsAPI.CreateResult(true, returnList, string.Empty, string.Empty), JsonRequestBehavior.AllowGet);
        }
        catch (Exception ex)
        {
            return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
        }
    }

    public List<clsMLOV> ProcessData(string txtModule, string txtFunction, string txtQuery, int intStart, int intEnd, int intLength, string txtSearch, ref decimal decTotalRow)
    {
        List<clsMLOV> retList = new List<clsMLOV>();

        // Note : Kalau pakai EF. pakainya intStart dan intLength
        //        Jika pakai ADO.Net pakai intStart dan intEnd

        switch (txtModule.Trim().ToUpper())
        {
            //case clsMMenuConstant.MODULE_NAME:
            //    retList = mMenuCustomBL.GetListLOVmMenuLOVPaging(GlobalClass.dLogin.userDat.intUserID.ToString(), mRoleCustomBL.IsSuperuserMWebRole(GlobalClass.dLogin.intRoleID), intStart, intLength, txtSearch, ref decTotalRow);
            //    break;
            //case clsMRoleConstant.MODULE_NAME:
            //    retList = mRoleCustomBL.GetListLOVmRoleLOVPaging(GlobalClass.dLogin.userDat.intUserID.ToString(), mRoleCustomBL.IsSuperuserMWebRole(GlobalClass.dLogin.intRoleID), intStart, intLength, txtSearch, ref decTotalRow);
            //    break;
            //case clsMRoleAccessConstant.MODULE_NAME:
            //    retList = mRoleAccessCustomBL.GetListLOVmRoleAccessLOVPaging(GlobalClass.dLogin.userDat.intUserID.ToString(), mRoleCustomBL.IsSuperuserMWebRole(GlobalClass.dLogin.intRoleID), intStart, intLength, txtSearch, ref decTotalRow);
            //    break;
            //case clsMModuleConstant.MODULE_NAME:
            //    retList = mModuleCustomBL.GetListLOVmModuleLOVPaging(GlobalClass.dLogin.userDat.intUserID.ToString(), mRoleCustomBL.IsSuperuserMWebRole(GlobalClass.dLogin.intRoleID), intStart, intLength, txtSearch, ref decTotalRow);
            //    break;
            //case clsMUserConstant.MODULE_NAME:
            //    retList = mUserCustomBL.GetListLOVmUserLOVPaging(GlobalClass.dLogin.userDat.intUserID.ToString(), mRoleCustomBL.IsSuperuserMWebRole(GlobalClass.dLogin.intRoleID), intStart, intLength, txtSearch, ref decTotalRow);
            //    break;
            //case clsMUserRoleConstant.MODULE_NAME:
            //    retList = mUserRoleCustomBL.GetListLOVmUserRoleLOVPaging(GlobalClass.dLogin.userDat.intUserID.ToString(), mRoleCustomBL.IsSuperuserMWebRole(GlobalClass.dLogin.intRoleID), intStart, intLength, txtSearch, ref decTotalRow);
            //    break;
            //case clsMParameterConstant.MODULE_NAME:
            //    retList = mParameter_HeaderCustomBL.GetListLOVmParameter_HeaderLOVPaging(GlobalClass.dLogin.userDat.intUserID.ToString(), mRoleCustomBL.IsSuperuserMWebRole(GlobalClass.dLogin.intRoleID), intStart, intLength, txtSearch, ref decTotalRow);
            //    break;
        }
        return retList;
    }

}
