using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Dashboard;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.DAL.Context;

namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Masters
{

     public static class mKeyInDumpingCustomBL{

        //findAll  revisis=================//
        public static Pageable<KeyInDumpingResponse> findAll(int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from keyindumping in dObjContext.mKeyInDumpings
                            where keyindumping.txtStatus.Equals("ON PROGRESS") || keyindumping.txtStatus.Equals("WAITING") || keyindumping.txtStatus.Equals("")
                            orderby keyindumping.intKeyInDumpingID ascending
                            select keyindumping)
                            .Select( keyindumping => new KeyInDumpingResponse {
                                intKeyInDumpingID = keyindumping.intKeyInDumpingID,
                                intNoBO = keyindumping.intNoBO.HasValue ? keyindumping.intNoBO.Value : 0,
                                txtCharges = keyindumping.txtCharges,
                                txtNamaProduk = keyindumping.txtNamaProduk,
                                txtDumpingLine = keyindumping.txtDumpingLine,
                                txtPIC = keyindumping.txtPIC,
                                txtStartTime = keyindumping.txtStartTime,
                                txtEndTime = keyindumping.txtEndTime,
                                txtStatus = keyindumping.txtStatus,
                                txtInsertedBy = keyindumping.txtInsertedBy,
                                //bitStatus = keyindumping.bitStatus.HasValue ? keyindumping.bitStatus.Value : true,
                                dtmInsertedDate = keyindumping.dtmInsertedDate.HasValue ? keyindumping.dtmInsertedDate.Value : DateTime.Now,
                                txtUpdatedBy = keyindumping.txtUpdatedBy,
                                dtmUpdatedDate = keyindumping.dtmUpdatedDate.HasValue ? keyindumping.dtmUpdatedDate.Value : DateTime.Now,
                                txtGUID = keyindumping.txtGUID,
                            })
                            .AsNoTracking().ToList();

                if (!cari.Equals(String.Empty))
                {
                    data = data.Where(p => p.txtNamaProduk.ToString().Contains(cari)).ToList();

                    //=====untuk msalah searching ======//
                } 

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                Pageable<KeyInDumpingResponse> pageModuleResponse = new Pageable<KeyInDumpingResponse>();
                pageModuleResponse.size = size;
                pageModuleResponse.page = page;
                pageModuleResponse.content = data;
                pageModuleResponse.hasPrevious = page > 1;
                pageModuleResponse.hasNext = (page * size) < total;
                pageModuleResponse.total = (int)total;
                pageModuleResponse.hasContent = data.Count > 0;
                return pageModuleResponse;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (dObjContext != null)
                {
                    dObjContext.Dispose();
                }
            }
        }

        //====Fugsi classs for insert tabel operasi ke history======/

        //findAll =================//
        public static Pageable<KeyInDumpingResponse> findAllHistory(int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from keyindumping in dObjContext.mKeyInDumpings
                            where keyindumping.txtStatus.Equals("DONE") || keyindumping.txtStatus.Equals("REJECT")
                            orderby keyindumping.intKeyInDumpingID ascending
                            select keyindumping)
                            .Select(keyindumping => new KeyInDumpingResponse
                            {
                                intKeyInDumpingID = keyindumping.intKeyInDumpingID,
                                intNoBO = keyindumping.intNoBO.HasValue ? keyindumping.intNoBO.Value : 0,
                                txtCharges = keyindumping.txtCharges,
                                txtNamaProduk = keyindumping.txtNamaProduk,
                                txtDumpingLine = keyindumping.txtDumpingLine,
                                txtPIC = keyindumping.txtPIC,
                                txtStartTime = keyindumping.txtStartTime,
                                txtEndTime = keyindumping.txtEndTime,
                                txtStatus = keyindumping.txtStatus,
                            })
                            .AsNoTracking().ToList();

                if (!cari.Equals(String.Empty))
                {
                    data = data.Where(p => p.txtNamaProduk.ToString().Contains(cari)).ToList();

                    //=====untuk msalah searching ======//
                }

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                Pageable<KeyInDumpingResponse> pageModuleResponse = new Pageable<KeyInDumpingResponse>();
                pageModuleResponse.size = size;
                pageModuleResponse.page = page;
                pageModuleResponse.content = data;
                pageModuleResponse.hasPrevious = page > 1;
                pageModuleResponse.hasNext = (page * size) < total;
                pageModuleResponse.total = (int)total;
                pageModuleResponse.hasContent = data.Count > 0;
                return pageModuleResponse;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (dObjContext != null)
                {
                    dObjContext.Dispose();
                }
            }
        }


        //======GEtMKeyInDumping==========

        public static mKeyInDumping GetMKeyInDumping(int intKeyInDumpingID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        public static mKeyInDumping GetMKeyInDumping(int intKeyInDumpingID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mKeyInDumpings
                          where Item.intKeyInDumpingID.Equals(intKeyInDumpingID)
                          select Item).AsNoTracking().FirstOrDefault();

            return retDat;
        }

        //=========GetAllMKeyInDumping============

        public static List<mKeyInDumping> GetAllKeyInDumping()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllKeyInDumping(dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        public static List<mKeyInDumping> GetAllKeyInDumping(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mKeyInDumpings
                    orderby Item.intNoBO ascending
                   
                    select Item).AsNoTracking().ToList();
        }


        //=============Text Status============/
        public static bool IsTxtStatus(int intKeyInDumpingID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsTxtStatus(intKeyInDumpingID, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();

            }

        }

        public static bool IsTxtStatus(int intKeyInDumpingID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mKeyInDumping dat = new mKeyInDumping();
            dat = GetKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            if (dat == null)
            {
                return false;
            }
            else
            {
                return (bool)dat.bitStatus;
            }

        }


        //=================Bit Status====================//
        public static bool IsBitStatusKeyInDumping(int intKeyInDumpingID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsBitStatusKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();

            }
        }

        public static bool IsBitStatusKeyInDumping(int intKeyInDumpingID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mKeyInDumping dat = new mKeyInDumping();
            dat = GetKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            if (dat == null)
            {
                return false;
            }
            else
            {
                return (bool)dat.bitStatus;
            }
        }

        public static mKeyInDumping CreateBlankmKeyInDumping()
        {
            mKeyInDumping dat = new mKeyInDumping();
            dat.bitStatus = false;
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.intKeyInDumpingID = 0;
            dat.txtInsertedBy = string.Empty;
            dat.txtNamaProduk = string.Empty;
            dat.txtCharges = string.Empty;
            dat.txtDumpingLine = string.Empty;
            dat.txtPIC = string.Empty;
            dat.txtStartTime = string.Empty;
            dat.txtEndTime = string.Empty;
            dat.txtUpdatedBy = string.Empty;
            dat.txtGUID = string.Empty;

            return dat;
        }

        //==========GetKeyInDumping============//
        public static mKeyInDumping GetKeyInDumping(int intKeyInDumpingID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        public static mKeyInDumping GetKeyInDumping(int intKeyInDumpingID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mKeyInDumpings
                    where Item.intKeyInDumpingID.Equals(intKeyInDumpingID)
                    select Item).AsNoTracking().FirstOrDefault();
        }




        //===========Delete============//
        public static bool DeleteKeyInDumping(int intKeyInDumpingID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
                dObjTran.Commit();
                return true;
            }
            catch (Exception ex)
            {
                dObjTran.Rollback();
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        public static bool DeleteKeyInDumping(int intKeyInDumpingID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mKeyInDumping dat = GetKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mKeyInDumpings.Attach(dat);
                dObjContext.mKeyInDumpings.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        //=========UPDATEEKeyInDumping============
        public static bool UpdateMKeyInDumping(mKeyInDumping dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.txtGUID = txtGUID;
            dObjContext.mKeyInDumpings.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static bool UpdateMKeyInDumping(mKeyInDumping dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateMKeyInDumping(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return true;
            }
            catch (Exception ex)
            {
                dObjTran.Rollback();
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

       


        //=========IsEXitsKeyInDumping============

        public static bool IsExistKeyInDumping(int intKeyInDumpingID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();

            }
        }

        public static bool IsExistKeyInDumping(int intKeyInDumpingID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mKeyInDumping dat = new mKeyInDumping();
            dat = GetMKeyInDumping(intKeyInDumpingID, dObjContext, dObjTran);
            if (dat == null)
            {
                return false;
                // Data tidak ditemukan
            }
            else
            {
                return true;
                // Data ditemukan
            }
        }


        //=========SaveMKeyInDumping============

        public static int SaveMKeyInDumping(mKeyInDumping dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveMKeyInDumping(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return dat.intKeyInDumpingID;
            }
            catch (Exception ex)
            {
                dObjTran.Rollback();
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        public static int SaveMKeyInDumping(mKeyInDumping dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);


            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;
            dat.txtGUID = txtGUID;
            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.txtStatus, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mKeyInDumpings.Add(dat);
                dObjContext.SaveChanges();
            }

            return dat.intKeyInDumpingID;
        }


        //=========VALIDATEINPUT============

        public static bool ValidateInput(mKeyInDumping dat, string txtUserID, string txtlangId)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return ValidateInput(dat, txtUserID, txtlangId, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        private static bool ValidateInput(mKeyInDumping dat, string txtUserID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            if (dat.txtNamaProduk.Equals(string.Empty))
            {
                throw new Exception("Kolom Nama Produk harus di isi!");// mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMenuConstant.MODULE_NAME, clsMMenuConstant.LANGUAGE.ERR_NAMA_IS_EMPTY, txtLangId, dObjContext, dObjTran));
            }
            if (dat.txtDumpingLine.Equals (string.Empty))
            {
                throw new Exception("Kolom Dumping Line harus di isi!"); //mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMenuConstant.MODULE_NAME, clsMMenuConstant.LANGUAGE.ERR_MODULE_IS_EMPTY, txtLangId, dObjContext, dObjTran));
            }
            if (dat.txtCharges.Equals(string.Empty))
            {
                throw new Exception("Kolom Charges harus di isi!");// mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMenuConstant.MODULE_NAME, clsMMenuConstant.LANGUAGE.ERR_DESCRIPTION_IS_EMPTY, txtLangId, dObjContext, dObjTran));
            }

            //Check if Name Already Exist. 

            mKeyInDumping prevDat = GetMKeyInDumpingByNama(dat.txtStatus.Trim());
            if ((prevDat != null))
            {
                if (!(prevDat.intKeyInDumpingID == dat.intKeyInDumpingID))
                {
                    throw new Exception("Nama di data sudah ada di database!"); // mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjContext, dObjTran));
                }
            }
            return true;
        }


        //=========GETMMKeyInDumpingByNama============

        public static mKeyInDumping GetMKeyInDumpingByNama(string TxtCharges)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMKeyInDumpingByNama(TxtCharges, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        public static mKeyInDumping GetMKeyInDumpingByNama(string TxtNamaProduk, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mKeyInDumpings
                    where Item.txtNamaProduk.Equals(TxtNamaProduk)
                    select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        //=========IsExitsByTxtGUID============


        public static bool IsExistBytxtGUID(string txtNamaProduk, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mKeyInDumping dat = new mKeyInDumping();
            dat = GetBytxtGUID(txtNamaProduk, txtGUID, dObjContext, dObjTran);
            if (dat == null)
            {
                return false;
                // Data tidak ditemukan
            }
            else
            {
                return true;
                // Data ditemukan
            }
        }


        //=========GetByTxtGUID============
        public static mKeyInDumping GetBytxtGUID(string txtStatus, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtStatus, txtGUID, dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }

        }


    

        public static mKeyInDumping GetBytxtGUID(string txtNamaProduk, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mKeyInDumpings
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtNamaProduk.Equals(txtNamaProduk)
                          select item).FirstOrDefault();

            return retDat;
        }


    }
    
}
