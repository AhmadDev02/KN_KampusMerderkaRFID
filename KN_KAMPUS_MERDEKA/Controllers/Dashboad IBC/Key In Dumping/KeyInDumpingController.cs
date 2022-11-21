using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Masters;
using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.dashboard.keyindumping;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Dashboard;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;
using KN_KAMPUS_MERDEKA.COMMON.Helper;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.MVC.App_Start;
using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
using System;
using System.Net;
using System.Web.Mvc;

namespace KN_KAMPUS_MERDEKA.MVC.Controllers.Dashboad_IBC.Key_In_Dumping
{
    public class KeyInDumpingController : Controller
    {
        // GET: KeyInDumping
        [CheckSessionTimeOut]
        [CheckAuthorizationAttribute]
        public ActionResult Index()
        {
            return View();
        }


        //INITIAL DATA

        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]

        public ActionResult InitiateData()
        {
            try
            {
                return Json(new SuccessResponse<KeyInDumpingRequest>(new KeyInDumpingRequest()));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(ex), JsonRequestBehavior.AllowGet);
            }
        }

        //====NewgetAllHistory====/ revisi
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]
        public ActionResult getAllHistory(int page = 1, int size = 20, string cari = "")
        {
            try
            {
                Pageable<KeyInDumpingResponse> pageResponse = mKeyInDumpingCustomBL.findAllHistory(page, size, cari);
                return Json(new SuccessResponse<Pageable<KeyInDumpingResponse>>(pageResponse));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(e));
            }
        }


        //GetALLMENU revisi
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]

        public ActionResult getAllKeyInDumping (int page = 1, int size=20, string cari ="")
        {
            try
            {
                Pageable<KeyInDumpingResponse> pageResponse = mKeyInDumpingCustomBL.findAll(page, size, cari);
                return Json(new SuccessResponse<Pageable<KeyInDumpingResponse>>(pageResponse));
            }
            catch (Exception e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(e));
            }
        }


        //Delete
        [HttpPost()]
        [ValidateHeaderAntiForgeryToken()]
        [CheckSessionTimeOut()]
        public ActionResult Delete(int id)
        {
            try
            {
                bool bitSuccess = false;
                mKeyInDumping objDat = new mKeyInDumping();
                string txtStatus = string.Empty;
                if (mKeyInDumpingCustomBL.IsExistKeyInDumping(id))
                {
                    //Delete 
                    bitSuccess = mKeyInDumpingCustomBL.DeleteKeyInDumping(id);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_DELETE_DATA, CurrentSession.getPrincipal.txtLangID);
                }
                return Json(new SuccessResponse<mKeyInDumping>(objDat));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ErrorResponse<Exception>(ex));
            }
        }

       
        //Save
        [HttpPost()]
        [ValidateHeaderAntiForgeryTokenAttribute()]
        [CheckSessionTimeOut()]

        public ActionResult Save(KeyInDumpingRequest keyindumpingrequest)
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
                        }
                    }
                    throw new Exception(txtStatus);
                }

                bool bitSucces = false;

                if (mKeyInDumpingCustomBL.IsExistKeyInDumping(keyindumpingrequest.intKeyInDumpingID) && keyindumpingrequest.intKeyInDumpingID != 0)
                {
                    mKeyInDumping savedKeyInDumping = mKeyInDumpingCustomBL.GetMKeyInDumping(keyindumpingrequest.intKeyInDumpingID);
                    savedKeyInDumping.intNoBO = keyindumpingrequest.intNoBO;
                    savedKeyInDumping.txtUpdatedBy = userLogin;
                    savedKeyInDumping.dtmUpdatedDate = DateTime.Now;
                    savedKeyInDumping.txtNamaProduk = keyindumpingrequest.txtNamaProduk;
                    savedKeyInDumping.txtCharges = keyindumpingrequest.txtCharges;
                    savedKeyInDumping.txtDumpingLine = keyindumpingrequest.txtDumpingLine;
                    savedKeyInDumping.txtPIC = keyindumpingrequest.txtPIC;
                    savedKeyInDumping.intNoBO = keyindumpingrequest.intNoBO;
                    savedKeyInDumping.txtStartTime = keyindumpingrequest.txtStartTime;
                    savedKeyInDumping.txtEndTime = keyindumpingrequest.txtEndTime;
                    savedKeyInDumping.txtStatus = keyindumpingrequest.txtStatus;
                    //savedKeyInDumping.bitStatus = keyindumpingrequest.bitStatus;

                    //Update 
                    bitSucces = mKeyInDumpingCustomBL.UpdateMKeyInDumping(savedKeyInDumping, userLogin, CurrentSession.getPrincipal.txtLangID, savedKeyInDumping.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, userLogin);
                }
                else
                {
                    mKeyInDumping keyindumping = new mKeyInDumping(keyindumpingrequest);
                    keyindumping.txtUpdatedBy = userLogin;
                    keyindumping.intKeyInDumpingID = keyindumping.intKeyInDumpingID;
                    keyindumping.intNoBO = keyindumpingrequest.intNoBO;
                    keyindumping.txtCharges = keyindumpingrequest.txtCharges;
                    keyindumping.txtNamaProduk = keyindumpingrequest.txtNamaProduk;
                    keyindumping.dtmUpdatedDate = DateTime.Now;
                    keyindumping.txtDumpingLine = keyindumpingrequest.txtDumpingLine;
                    keyindumping.txtPIC = keyindumpingrequest.txtPIC;
                    keyindumping.txtStartTime = keyindumpingrequest.txtStartTime;
                    keyindumping.txtEndTime = keyindumpingrequest.txtEndTime;
                    keyindumping.txtStatus = keyindumpingrequest.txtStatus;
                    //keyindumping.bitStatus = keyindumpingrequest.bitStatus;

                    //Create 
                    keyindumping.txtGUID = keyindumpingrequest.txtGUID;
                    keyindumping.intKeyInDumpingID = mKeyInDumpingCustomBL.SaveMKeyInDumping(keyindumping, userLogin, CurrentSession.getPrincipal.txtLangID, keyindumpingrequest.txtGUID);
                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, userLogin);
                    bitSucces = true;

                }
                return Json(new SuccessResponse<KeyInDumpingRequest>(keyindumpingrequest));
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadGateway;
                return Json(new ErrorResponse<Exception>(ex));
            }
        }


    }
}


