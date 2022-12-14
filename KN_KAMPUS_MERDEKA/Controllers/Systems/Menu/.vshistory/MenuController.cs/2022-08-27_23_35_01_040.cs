using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Menu;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Menu;
using KN_KAMPUS_MERDEKA.COMMON.Entity;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Helper;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.COMMON.Model;
using KN_KAMPUS_MERDEKA.MVC.App_Start;
using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers
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
                return Json(new SuccessResponse<MenuRequest>( new MenuRequest()));
                
            }
            catch (Exception ex)
            {
                return Json(new ErrorResponse<Exception>(ex) , JsonRequestBehavior.AllowGet);
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
                return Json(new SuccessResponse<Pageable<MenuResponse>>(pageResponse));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(e));
            }
        }


        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult Save(MenuRequest menuRequest)
        {
            try
            {
                string userLogin = CurrentSession.getPrincipal.user.intUserID.ToString();
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
                    savedMenu.txtMenuName = menuRequest.txtMenuName.ToUpper();
                    savedMenu.intModuleID = menuRequest.intModuleID;
                    savedMenu.txtLink = menuRequest.txtLink;
                    savedMenu.intOrderID = menuRequest.intOrderID;
                    savedMenu.bitActive = menuRequest.bitActive;
                    savedMenu.txtIcon = menuRequest.txtIcon;
                    savedMenu.intParentID = menuRequest.intParentID;
                    //Update 
                    bitSuccess = mMenuCustomBL.UpdateMMenu(savedMenu, userLogin, CurrentSession.getPrincipal.txtLangID, savedMenu.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, GlobalClass.dLogin.txtLangID);
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
                return Json(new ErrorResponse<Exception>(ex));
            }
        }


    }
}
