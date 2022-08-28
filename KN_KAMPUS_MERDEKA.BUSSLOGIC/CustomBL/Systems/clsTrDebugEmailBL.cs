using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems
{
    public static class clsTrDebugEmailBL
    {
        public static int SaveTrDebugEmail(TrDebugEmail dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveTrDebugEmail(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return dat.intDebugEmailID;
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

        public static int SaveTrDebugEmail(TrDebugEmail dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;

            // Debug email ga perlu cek GUID, langsung save saja!
            //// Check jika GUID sudah ada.
            //    if (!IsExistBytxtGUID(dat.txtTo, txtGUID, dObjContext, dObjTran))
            //    {
            dObjContext.TrDebugEmails.Add(dat);
            dObjContext.SaveChanges();
            //}
            return dat.intDebugEmailID;
        }

        public static bool UpdateTrDebugEmail(TrDebugEmail dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateTrDebugEmail(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdateTrDebugEmail(TrDebugEmail dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static TrDebugEmail GetTrDebugEmail(int intDebugEmailID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetTrDebugEmail(intDebugEmailID, dObjContext, dObjTran);
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

        public static TrDebugEmail GetTrDebugEmail(int intDebugEmailID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.TrDebugEmails
                          where Item.intDebugEmailID.Equals(intDebugEmailID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        public static bool DeleteTrDebugEmail(int intDebugEmailID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteTrDebugEmail(intDebugEmailID, dObjContext, dObjTran);
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

        public static bool DeleteTrDebugEmail(int intDebugEmailID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            TrDebugEmail dat = GetTrDebugEmail(intDebugEmailID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.TrDebugEmails.Attach(dat);
                dObjContext.TrDebugEmails.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<TrDebugEmail> GetAllTrDebugEmail()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllTrDebugEmail(dObjContext, dObjTran);
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

        public static List<TrDebugEmail> GetAllTrDebugEmail(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.TrDebugEmails
                    select Item).AsNoTracking().ToList();
        }

        public static bool IsExistTrDebugEmail(int intDebugEmailID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistTrDebugEmail(intDebugEmailID, dObjContext, dObjTran);
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

        public static bool IsExistTrDebugEmail(int intDebugEmailID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            TrDebugEmail dat = new TrDebugEmail();
            dat = GetTrDebugEmail(intDebugEmailID, dObjContext, dObjTran);
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

        //    public static TrDebugEmail GetTrDebugEmailByName(string TxtModuleName)
        //    {
        //        SFECompetencyDBEntities dObjContext = null;
        //        DbContextTransaction dObjTran = null;
        //        try
        //        {
        //            dObjContext = new SFECompetencyDBEntities(EFClientUtility.GetConnectionString());
        //            return GetTrDebugEmailByName(TxtModuleName, dObjContext, dObjTran);
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //        finally
        //        {
        //            dObjContext.Dispose();

        //        }
        //    }

        //    public static TrDebugEmail GetTrDebugEmailByName(string TxtModuleName, SFECompetencyDBEntities dObjContext, DbContextTransaction dObjTran)
        //{
        //    dObjContext.Configuration.ProxyCreationEnabled = false;
        //    return (from Item in dObjContext.TrDebugEmails
        //                where Item.txtModuleName.Equals(TxtModuleName)
        //                select Item).AsNoTracking().FirstOrDefault();
        //    }

        //public static List<clsMLOV> GetListLOVTrDebugEmailLOVPaging(string txtUserId, bool bitSuperUser, int intStart, int intEnd, string txtSearch, ref decimal decTotalRow)
        //{
        //    SFECompetencyDBEntities dObjContext = null;
        //    DbContextTransaction dObjTran = null;
        //    try
        //    {
        //        dObjContext = new SFECompetencyDBEntities(EFClientUtility.GetConnectionString());
        //        return GetListLOVTrDebugEmailLOVPaging(txtUserId, bitSuperUser, intStart, intEnd, txtSearch, ref decTotalRow, dObjContext, dObjTran);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dObjContext.Dispose();
        //    }
        //}

        //public static List<clsMLOV> GetListLOVTrDebugEmailLOVPaging(string txtUserId, bool bitSuperUser, int intStart, int intEnd, string txtSearch, ref decimal decTotalRow, SFECompetencyDBEntities dObjContext, DbContextTransaction dObjTran)
        //{
        //    var retList = (from Item in dObjContext.TrDebugEmails
        //                   where 1 == 1
        //                   && (txtSearch == ""
        //                   || Item.intDebugEmailID.ToString().Contains(txtSearch)
        //                   || Item.txtModuleName.ToString().Contains(txtSearch)
        //                   || Item.txtDescription.ToString().Contains(txtSearch)
        //                   )
        //                   orderby Item.intDebugEmailID descending
        //                   select new clsMLOV
        //                   {
        //                       txtColumn1 = Item.intDebugEmailID.ToString(),
        //                       txtColumn2 = Item.txtModuleName.ToString(),
        //                       txtColumn3 = Item.txtDescription.ToString(),
        //                       txtColumnName1 = "Module ID",
        //                       txtColumnName2 = "Module Name",
        //                       txtColumnName3 = "Description",
        //                   }
        //      ).AsNoTracking().ToList();

        //        decTotalRow = retList.Count() ; 
        //        return retList.Skip(intStart-1).Take(intEnd).ToList();
        //}

        public static bool ValidateInput(TrDebugEmail dat, string txtUserID, string txtlangId)
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

        private static bool ValidateInput(TrDebugEmail dat, string txtUserId, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            //if (dat.txtModuleName.Equals(string.Empty))
            //{
            //throw new Exception("Kolom Nama Module harus di isi!");// clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(TrDebugEmailConstant.MODULE_NAME, TrDebugEmailConstant.LANGUAGE.ERR_NAMA_IS_EMPTY, txtLangId, dObjConn, dObjTran));
            //}

            ////Check if Name Already Exist. 
            //TrDebugEmail prevDat = TrDebugEmailCustomBL.GetTrDebugEmailByName(dat.txtModuleName.Trim());
            //if ((prevDat != null))
            //{
            //    if (!(prevDat.intDebugEmailID == dat.intDebugEmailID))
            //    {
            //    throw new Exception("Nama Module sudah ada di database!");// clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(TrDebugEmailConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjConn, dObjTran));
            //    }
            //}
            return true;
        }

        public static TrDebugEmail CreateBlankTrDebugEmail()
        {
            TrDebugEmail dat = new TrDebugEmail();
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.intDebugEmailID = 0;
            dat.txtInsertedBy = string.Empty;
            dat.txtUpdatedBy = string.Empty;

            dat.bitIsBodyHTML = 0;
            dat.txtBody = string.Empty;
            dat.txtCC = string.Empty;
            dat.txtFrom = string.Empty;
            dat.txtPriority = string.Empty;
            dat.txtSubject = string.Empty;
            dat.txtTo = string.Empty;
            dat.txtGUID = string.Empty;

            return dat;
        }


        #region "GUID"
        public static void SetGUIDToObject(ref TrDebugEmail dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref TrDebugEmail dat)
        {

        }

        public static bool IsExistBytxtGUID(string txtTo, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(txtTo, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(string txtTo, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            TrDebugEmail dat = new TrDebugEmail();
            dat = GetBytxtGUID(txtTo, txtGUID, dObjContext, dObjTran);
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

        public static TrDebugEmail GetBytxtGUID(string txtTo, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtTo, txtGUID, dObjContext, dObjTran);
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

        public static TrDebugEmail GetBytxtGUID(string txtTo, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.TrDebugEmails
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtTo.Equals(txtTo)
                          select item).FirstOrDefault();

            return retDat;
        }

        #endregion
    }
}
