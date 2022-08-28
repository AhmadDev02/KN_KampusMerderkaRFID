using KN2021_E_RPS.Common;
using KN2021_E_RPS.Common.Constant;
using KN2021_E_RPS.Common.Dto.System.Menu.Request;
using KN2021_E_RPS.Common.Dto.System.Menu.Response;
using KN2021_E_RPS.Common.Entity;
using KN2021_E_RPS.Common.Entity.System;
using KN2021_E_RPS.Common.Library;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using static KN2021_E_RPS.MVC.FilterConfig;

namespace KN2021_E_RPS.MVC.Controllers
{
    public class MenuController : Controller
    {
        [CheckSessionTimeOut()]
        [CheckAuthorizationAttribute]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult InitiateData()
        {
            try
            {
                return Json(clsAPI.CreateResult(true, new MenuRequest(), string.Empty, string.Empty));
            }
            catch (Exception ex)
            {
                return Json(clsMMainCustomBL.CreateError(ex, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID.ToString(), Request.Url.ToString(), GlobalClass.dLogin.userDat), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult getAllMenu(int page = 1, int size = 20, string cari = "")
        {
            try
            {
                Pageable<MenuResponse> pageResponse = mMenuCustomBL.findAll(page, size, cari);
                return Json(clsAPI.CreateResult(true, pageResponse, string.Empty, string.Empty));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(e));
            }
        }


        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(MenuRequest menuRequest)
        {
            try
            {
                string userLogin = GlobalClass.dLogin.userDat.intUserID.ToString();
                string txtStatus = string.Empty;
                if (!ModelState.IsValid)
                {
                    foreach (var er in ModelState.Values)
                    {
                        if (er.Errors.Count > 0)
                        {
                            txtStatus = er.Errors[0].ErrorMessage;
                        };
                    }
                    throw new Exception(txtStatus);
                }

                bool bitSuccess = false;

                if (mMenuCustomBL.IsExistMMenu(menuRequest.intMenuID) && menuRequest.intMenuID != 0)
                {
                    mMenu savedMenu = mMenuCustomBL.GetMMenu(menuRequest.intMenuID);
                    savedMenu.txtUpdatedBy = userLogin;
                    savedMenu.dtmUpdatedDate = DateTime.Now;
                    savedMenu.txtDescription = menuRequest.txtDescription.ToUpper();
                    savedMenu.txtMenuName = menuRequest.txtMenuName;
                    savedMenu.intModuleID = menuRequest.intModuleID;
                    savedMenu.txtLink = menuRequest.txtLink;
                    savedMenu.intOrderID = menuRequest.intOrderID;
                    savedMenu.bitActive = menuRequest.bitActive;
                    savedMenu.txtIcon = menuRequest.txtIcon;
                    savedMenu.intParentID = menuRequest.intParentID;
                    //Update 
                    bitSuccess = mMenuCustomBL.UpdateMMenu(savedMenu, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, savedMenu.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                }
                else
                {
                    mMenu menu = new mMenu(menuRequest);
                    menu.dtmUpdatedDate = DateTime.Now;
                    menu.txtUpdatedBy = userLogin;
                    //Create 
                    menu.txtGUID = menuRequest.txtGUID;
                    menu.intMenuID = mMenuCustomBL.SaveMMenu(menu, GlobalClass.dLogin.userDat.intUserID.ToString(), GlobalClass.dLogin.txtLangID, menuRequest.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
                    bitSuccess = true;
                }
                return Json(clsAPI.CreateResult(bitSuccess, menuRequest, txtStatus, string.Empty));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(clsAPI.CreateError(ex));
            }
        }


    }
}
