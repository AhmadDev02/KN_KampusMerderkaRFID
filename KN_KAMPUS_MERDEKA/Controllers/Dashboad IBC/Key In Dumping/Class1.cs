////using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Masters;
////using KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems;
////using KN_KAMPUS_MERDEKA.COMMON.Constant;
////using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.RFID_Reader;
////using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.RFID_Reader;
////using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;
////using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
////using KN_KAMPUS_MERDEKA.COMMON.Helper;
////using KN_KAMPUS_MERDEKA.COMMON.Library;
////using KN_KAMPUS_MERDEKA.MVC.App_Start;
////using KN_KAMPUS_MERDEKA.MVC.App_Start.Filter;
////using System;
////using System.Net;
////using System.Web.Mvc;

////namespace KN_KAMPUS_MERDEKA.MVC.Controllers.Dashboard_IBC.BackOffice.Tabel_Master_RFID_Reader
////{
////    public class RfidReaderController : Controller
////    {
////        // GET: RfidReader
////        [CheckSessionTimeOut]
////        [CheckAuthorizationAttribute]
////        public ActionResult Index()
////        {
////            return View();
////        }

////        [HttpPost()]
////        [ValidateHeaderAntiForgeryTokenAttribute()]
////        [CheckSessionTimeOut()]
////        public ActionResult InitiateData()
////        {
////            try
////            {
////                return Json(new SuccessResponse<RfidReaderRequest>(new RfidReaderRequest()));
////            }
////            catch (Exception ex)
////            {
////                Response.StatusCode = (int)HttpStatusCode.BadRequest;
////                return Json(new ErrorResponse<Exception>(ex), JsonRequestBehavior.AllowGet);
////            }
////        }

////        [HttpPost()]
////        [ValidateHeaderAntiForgeryTokenAttribute()]
////        [CheckSessionTimeOut()]
////        public ActionResult getAllRfid(int page = 1, int size = 20, string cari = "")
////        {
////            try
////            {
////                Pageable<RfidReaderResponse> pageResponse = mRfidReaderCustomBL.findAll(page, size, cari);
////                return Json(new SuccessResponse<Pageable<RfidReaderResponse>>(pageResponse));
////            }
////            catch (Exception e)
////            {
////                Response.StatusCode = (int)HttpStatusCode.BadRequest;
////                return Json(new ErrorResponse<Exception>(e));
////            }
////        }

////        [HttpPost()]
////        [ValidateHeaderAntiForgeryTokenAttribute()]
////        [CheckSessionTimeOut()]
////        public ActionResult Save(RfidReaderRequest rfidReq)
////        {
////            try
////            {
////                string userLogin = CurrentSession.getPrincipal.user.intUserID.ToString();
////                string txtStatus = string.Empty;
////                if (!ModelState.IsValid)
////                {
////                    foreach (var er in ModelState.Values)
////                    {
////                        if (er.Errors.Count > 0)
////                        {
////                            txtStatus = er.Errors[0].ErrorMessage;
////                        };
////                    }
////                    throw new Exception(txtStatus);
////                }

////                bool bitSuccess = false;

////                if (mRfidReaderCustomBL.IsExistMRfidReader(rfidReq.intReader_id) && rfidReq.intReader_id != 0)
////                {
////                    mRFID_Reader savedRfidReader = mRfidReaderCustomBL.GetMRfidReader(rfidReq.intReader_id);
////                    savedRfidReader.txt_lokasi = rfidReq.txt_lokasi;
////                    savedRfidReader.txtUpdatedBy = userLogin;
////                    savedRfidReader.dtmUpdatedBy = DateTime.Now;
////                    savedRfidReader.txtIP_address = rfidReq.txtIP_address;
////                    savedRfidReader.txtKode_Lokasi = rfidReq.txtKode_Lokasi;
////                    //Update 
////                    bitSuccess = mRfidReaderCustomBL.UpdateMRfidReader(savedRfidReader, userLogin, CurrentSession.getPrincipal.txtLangID, savedRfidReader.txtGUID);
////                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, userLogin);
////                }
////                else
////                {
////                    mRFID_Reader rfid = new mRFID_Reader();
////                    rfid.intReader_id = rfidReq.intReader_id;
////                    rfid.dtmUpdatedBy = DateTime.Now;
////                    rfid.txtUpdatedBy = userLogin;
////                    rfid.txt_lokasi = rfidReq.txt_lokasi;
////                    rfid.txtIP_address = rfidReq.txtIP_address;
////                    rfid.txtKode_Lokasi = rfidReq.txtKode_Lokasi;
////                    //Create 
////                    rfid.txtGUID = rfidReq.txtGUID;
////                    rfid.intReader_id = mRfidReaderCustomBL.SaveMRfidReader(rfid, userLogin, CurrentSession.getPrincipal.txtLangID, rfidReq.txtGUID);
////                    txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, userLogin);
////                    bitSuccess = true;
////                }
////                return Json(new SuccessResponse<RfidReaderRequest>(rfidReq));
////            }
////            catch (Exception ex)
////            {
////                Response.StatusCode = (int)HttpStatusCode.BadRequest;
////                return Json(new ErrorResponse<Exception>(ex));
////            }
////        }

////    }
////}

////[HttpPost()]
////[ValidateHeaderAntiForgeryTokenAttribute()]
////[CheckSessionTimeOut()]
////public ActionResult Save(KeyInDumpingRequest keyindumpingRequest)
////{
////    try
////    {
////        string userLogin = CurrentSession.getPrincipal.user.intUserID.ToString();
////        string txtStatus = string.Empty;
////        if (!ModelState.IsValid)
////        {
////            foreach (var er in ModelState.Values)
////            {
////                if (er.Errors.Count > 0)
////                {
////                    txtStatus = er.Errors[0].ErrorMessage;
////                };
////            }
////            throw new Exception(txtStatus);
////        }

////        bool bitSuccess = false;

////        if (mKeyInDumpingCustomBL.IsExistMKeyInDumping(keyindumpingRequest.intKeyInDumpingID) && keyindumpingRequest.intKeyInDumpingID != 0)
////        {
////            mKeyInDumping savedKeyInDumping = mKeyInDumpingCustomBL.GetMKeyInDumping(keyindumpingRequest.intKeyInDumpingID);
////            savedKeyInDumping.txtUpdatedBy = userLogin;
////            savedKeyInDumping.dtmUpdatedDate = DateTime.Now;
////            savedKeyInDumping.txtNamaProduk = keyindumpingRequest.txtNamaProduk;
////            savedKeyInDumping.txtCharges = keyindumpingRequest.txtCharges;
////            savedKeyInDumping.txtDumpingLine = keyindumpingRequest.txtDumpingLine;
////            savedKeyInDumping.txtPIC = keyindumpingRequest.txtPIC;
////            savedKeyInDumping.intNoBO = keyindumpingRequest.intNoBO;
////            savedKeyInDumping.dtmStartTime = DateTime.Now;
////            savedKeyInDumping.dtmEndTime = DateTime.Now;
////            //Update 
////            bitSuccess = mKeyInDumpingCustomBL.UpdateMKeyInDumping(savedKeyInDumping, userLogin, CurrentSession.getPrincipal.txtLangID, savedKeyInDumping.txtGUID);
////            txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, userLogin);
////        }
////        else
////        {
////            mKeyInDumping keyindumping = new mKeyInDumping();
////            keyindumping.intKeyInDumpingID = keyindumping.intKeyInDumpingID;
////            keyindumping.dtmUpdatedDate = DateTime.Now;
////            keyindumping.txtUpdatedBy = userLogin;
////            keyindumping.txtNamaProduk = keyindumpingRequest.txtNamaProduk;
////            keyindumping.txtCharges = keyindumpingRequest.txtCharges;
////            keyindumping.txtDumpingLine = keyindumpingRequest.txtDumpingLine;
////            keyindumping.txtPIC = keyindumpingRequest.txtPIC;
////            keyindumping.intNoBO = keyindumpingRequest.intNoBO;
////            keyindumping.dtmStartTime = DateTime.Now;
////            keyindumping.dtmEndTime = DateTime.Now;
////            //Create 
////            keyindumping.txtGUID = keyindumpingRequest.txtGUID;
////            keyindumping.intKeyInDumpingID = mKeyInDumpingCustomBL.SaveMKeyInDumping(keyindumping, userLogin, CurrentSession.getPrincipal.txtLangID, keyindumpingRequest.txtGUID);
////            txtStatus = mSystemLanguageCustomBL.GetmSystemLanguageValue(Configuration.MODULE_NAME, Configuration.LANGUAGE.MSG_INSERT_DATA, userLogin);
////            bitSuccess = true;
////        }
////        return Json(new SuccessResponse<KeyInDumpingRequest>(keyindumpingRequest));
////    }
////    catch (Exception ex)
////    {
////        Response.StatusCode = (int)HttpStatusCode.BadRequest;
////        return Json(new ErrorResponse<Exception>(ex));
////    }
////}



//using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.RFID_Reader;
//using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;
//using KN_KAMPUS_MERDEKA.COMMON.Library;
//using KN_KAMPUS_MERDEKA.DAL;
//using KN_KAMPUS_MERDEKA.DAL.Context;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;

//namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Masters
//{
//    public static class mRfidReaderCustomBL
//    {
//        public static Pageable<RfidReaderResponse> findAll(int page = 1, int size = 20, string cari = "")
//        {
//            KampusMerdekaEntities dObjContext = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                page = page < 1 ? 1 : page;
//                size = size < 1 ? 20 : size;
//                int start = (page * size) - size;
//                var data = (from rfid in dObjContext.mRFID_Reader
//                            where
//                            rfid.txtIP_address.Contains(cari) ||
//                            rfid.txt_lokasi.Contains(cari)
//                            orderby rfid.txtKode_Lokasi descending
//                            select rfid)
//                            .Select(rfid => new RfidReaderResponse
//                            {
//                                intReader_id = rfid.intReader_id,
//                                txtIP_address = rfid.txtIP_address,
//                                txt_lokasi = rfid.txt_lokasi,
//                                txtInsertedBy = rfid.txtInsertedBy,
//                                dtmInsertedBy = rfid.dtmInsertedBy.HasValue ? rfid.dtmInsertedBy.Value : DateTime.Now,
//                                txtUpdatedBy = rfid.txtUpdatedBy,
//                                dtmUpdatedBy = rfid.dtmUpdatedBy.HasValue ? rfid.dtmUpdatedBy.Value : DateTime.Now,
//                                txtGUID = rfid.txtGUID,

//                            }).AsNoTracking().ToList();

//                var total = data.Count();
//                data = data.Skip(start).Take(size).ToList();
//                Pageable<RfidReaderResponse> pageRfidReaderResponse = new Pageable<RfidReaderResponse>();
//                pageRfidReaderResponse.size = size;
//                pageRfidReaderResponse.page = page;
//                pageRfidReaderResponse.content = data;
//                pageRfidReaderResponse.hasPrevious = page > 1;
//                pageRfidReaderResponse.hasNext = (page * size) < total;
//                pageRfidReaderResponse.total = (int)total;
//                pageRfidReaderResponse.hasContent = data.Count > 0;
//                return pageRfidReaderResponse;
//            }
//            catch (Exception e)
//            {
//                throw e;
//            }
//            finally
//            {
//                if (dObjContext != null)
//                {
//                    dObjContext.Dispose();
//                }
//            }
//        }

//        public static mRFID_Reader GetMRfidReader(int intReader_id)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                return GetMRfidReader(intReader_id, dObjContext, dObjTran);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }
//        }

//        public static mRFID_Reader GetMRfidReader(int intReader_id, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            dObjContext.Configuration.ProxyCreationEnabled = false;
//            var retDat = (from Item in dObjContext.mRFID_Reader
//                          where Item.intReader_id.Equals(intReader_id)
//                          select Item).AsNoTracking().FirstOrDefault();

//            return retDat;
//        }

//        //================
//        //SAVE START
//        public static int SaveMRfidReader(mRFID_Reader dat, string txtUserID, string txtLangId, string txtGUID)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                dObjTran = dObjContext.Database.BeginTransaction();
//                SaveMRfidReader(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
//                dObjTran.Commit();
//                return dat.intReader_id;
//            }
//            catch (Exception ex)
//            {
//                dObjTran.Rollback();
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }
//        }

//        public static int SaveMRfidReader(mRFID_Reader dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            //Validate dulu
//            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);


//            // Set User login.
//            dat.txtInsertedBy = txtUserID;
//            dat.dtmInsertedBy = DateTime.Now;
//            dat.txtGUID = txtGUID;

//            // Check jika GUID sudah ada.
//            if (!IsExistBytxtGUID(dat.txtIP_address, txtGUID, dObjContext, dObjTran))
//            {
//                dObjContext.mRFID_Reader.Add(dat);
//                dObjContext.SaveChanges();
//            }

//            return dat.intReader_id;
//        }
//        //================
//        //UPDATE START
//        public static bool UpdateMRfidReader(mRFID_Reader dat, string txtUserID, string txtLangId, string txtGUID)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                dObjTran = dObjContext.Database.BeginTransaction();
//                UpdateMRfidReader(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
//                dObjTran.Commit();
//                return true;
//            }
//            catch (Exception ex)
//            {
//                dObjTran.Rollback();
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }
//        }

//        public static bool UpdateMRfidReader(mRFID_Reader dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            //Validate dulu
//            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

//            // Set User login. 
//            dat.txtUpdatedBy = txtUserID;
//            dat.dtmUpdatedBy = DateTime.Now;
//            dat.txtGUID = txtGUID;
//            dObjContext.mRFID_Reader.Add(dat);
//            dObjContext.Entry(dat).State = EntityState.Modified;
//            dObjContext.SaveChanges();

//            return true;
//        }
//        //UPDATE END
//        //==================

//        //==================
//        //DELETE START
//        public static bool DeleteMRfidReader(int intReader_id)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                dObjTran = dObjContext.Database.BeginTransaction();
//                DeleteMRfidReader(intReader_id, dObjContext, dObjTran);
//                dObjTran.Commit();
//                return true;
//            }
//            catch (Exception ex)
//            {
//                dObjTran.Rollback();
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }
//        }

//        public static bool DeleteMRfidReader(int intMenuID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            mRFID_Reader dat = GetMRfidReader(intMenuID, dObjContext, dObjTran);
//            if (dat != null)
//            {
//                dObjContext.mRFID_Reader.Attach(dat);
//                dObjContext.mRFID_Reader.Remove(dat);
//                dObjContext.SaveChanges();
//            }
//            return true;
//        }
//        //DELETE END
//        //===================

//        //===================
//        //VALIDATE START
//        public static bool ValidateInput(mRFID_Reader dat, string txtUserID, string txtlangId)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                return ValidateInput(dat, txtUserID, txtlangId, dObjContext, dObjTran);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }
//        }

//        private static bool ValidateInput(mRFID_Reader dat, string txtUserID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {

//            if (dat.txtIP_address.Equals(string.Empty))
//            {
//                throw new Exception("Kolom IP Addres harus di isi!");
//            }
//            if (dat.intReader_id == 0)
//            {
//                throw new Exception("Kolom ID Reader harus di isi!");
//            }
//            if (dat.txtKode_Lokasi.Equals(string.Empty))
//            {
//                throw new Exception("Kolom Kode Lokasi harus di isi!");
//            }

//            //Check if Name Already Exist. 
//            mRFID_Reader prevDat = GetMRfidByReader(dat.txtIP_address.Trim());
//            if ((prevDat != null))
//            {
//                if (!(prevDat.intReader_id == dat.intReader_id))
//                {
//                    throw new Exception("ID Reader sudah ada di database!"); // mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjContext, dObjTran));
//                }
//            }
//            return true;
//        }
//        //VALIDATE END
//        //===================

//        public static mRFID_Reader GetMRfidByReader(string TxtIP_address)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                return GetMRfidByReader(TxtIP_address, dObjContext, dObjTran);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }
//        }

//        public static mRFID_Reader GetMRfidByReader(string TxtIP_address, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            dObjContext.Configuration.ProxyCreationEnabled = false;
//            return (from Item in dObjContext.mRFID_Reader
//                    where Item.txtIP_address.Equals(TxtIP_address)
//                    select Item).AsNoTracking().FirstOrDefault();
//        }

//        public static bool IsExistBytxtGUID(string txtIP_address, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            mRFID_Reader dat = new mRFID_Reader();
//            dat = GetBytxtGUID(txtIP_address, txtGUID, dObjContext, dObjTran);
//            if (dat == null)
//            {
//                return false;
//                // Data tidak ditemukan
//            }
//            else
//            {
//                return true;
//                // Data ditemukan
//            }
//        }

//        public static mRFID_Reader GetBytxtGUID(string txtIP_address, string txtGUID)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                return GetBytxtGUID(txtIP_address, txtGUID, dObjContext, dObjTran);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }

//        }

//        public static mRFID_Reader GetBytxtGUID(string txtIP_address, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            dObjContext.Configuration.ProxyCreationEnabled = false;
//            var retDat = (from item in dObjContext.mRFID_Reader
//                          where 1 == 1
//                          && item.txtGUID.Equals(txtGUID)
//                          && item.txtIP_address.Equals(txtIP_address)
//                          select item).FirstOrDefault();

//            return retDat;
//        }


//        public static bool IsExistMRfidReader(int intReader_id)
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                return IsExistMRfidReader(intReader_id, dObjContext, dObjTran);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();

//            }
//        }

//        public static bool IsExistMRfidReader(int intReader_id, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            mRFID_Reader dat = new mRFID_Reader();
//            dat = GetMRfidReader(intReader_id, dObjContext, dObjTran);
//            if (dat == null)
//            {
//                return false;
//                // Data tidak ditemukan
//            }
//            else
//            {
//                return true;
//                // Data ditemukan
//            }
//        }

//        public static List<mRFID_Reader> GetAllMRfidReader()
//        {
//            KampusMerdekaEntities dObjContext = null;
//            DbContextTransaction dObjTran = null;
//            try
//            {
//                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
//                return GetAllMRfidReader(dObjContext, dObjTran);
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {
//                dObjContext.Dispose();
//            }
//        }

//        public static List<mRFID_Reader> GetAllMRfidReader(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
//        {
//            dObjContext.Configuration.ProxyCreationEnabled = false;
//            return (from Item in dObjContext.mRFID_Reader
//                    orderby Item.intReader_id ascending
//                    select Item).AsNoTracking().ToList();
//        }

//    }