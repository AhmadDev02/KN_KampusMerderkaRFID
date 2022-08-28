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
    public class mSystemLanguageCustomBL
    {
        public static bool SavemSystemLanguage(mSystemLanguage dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SavemSystemLanguage(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool SavemSystemLanguage(mSystemLanguage dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            //ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;

            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.txtSystemLanguageID, dat.txtKeyID, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mSystemLanguages.Add(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static bool UpdatemSystemLanguage(mSystemLanguage dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdatemSystemLanguage(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdatemSystemLanguage(mSystemLanguage dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            //ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mSystemLanguages.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static mSystemLanguage GetmSystemLanguage(string txtSystemLanguageID, string txtKeyID, string txtLanguageID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetmSystemLanguage(txtSystemLanguageID, txtKeyID, txtLanguageID, dObjContext, dObjTran);
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

        public static mSystemLanguage GetmSystemLanguage(string txtSystemLanguageID, string txtKeyID, string txtLanguageID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mSystemLanguages
                          where Item.txtSystemLanguageID.Equals(txtSystemLanguageID)
                          && Item.txtKeyID.Equals(txtKeyID)
                          && Item.txtLanguageID.Equals(txtLanguageID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        public static bool DeletemSystemLanguage(string txtSystemLanguageID, string txtKeyID, string txtLanguageID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeletemSystemLanguage(txtSystemLanguageID, txtKeyID, txtLanguageID, dObjContext, dObjTran);
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

        public static bool DeletemSystemLanguage(string txtSystemLanguageID, string txtKeyID, string txtLanguageID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemLanguage dat = GetmSystemLanguage(txtSystemLanguageID, txtKeyID, txtLanguageID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mSystemLanguages.Attach(dat);
                dObjContext.mSystemLanguages.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mSystemLanguage> GetAllmSystemLanguage()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllmSystemLanguage(dObjContext, dObjTran);
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

        public static List<mSystemLanguage> GetAllmSystemLanguage(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retList = (from Item in dObjContext.mSystemLanguages
                           select Item).AsNoTracking().ToList();
            return retList;
        }

        public static bool IsExistmSystemLanguage(string txtSystemLanguageID, string txtKeyID, string txtLanguageID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistmSystemLanguage(txtSystemLanguageID, txtKeyID, txtLanguageID, dObjContext, dObjTran);
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

        public static bool IsExistmSystemLanguage(string txtSystemLanguageID, string txtKeyID, string txtLanguageID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemLanguage dat = null;
            dat = GetmSystemLanguage(txtSystemLanguageID, txtKeyID, txtLanguageID, dObjContext, dObjTran);
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

        public static List<mSystemLanguage> GetListSystemLanguageBySystemLanguage(string txtSystemLanguageID, string txtLanguageID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetListSystemLanguageBySystemLanguage(txtSystemLanguageID, txtLanguageID, dObjContext, dObjTran);
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

        public static List<mSystemLanguage> GetListSystemLanguageBySystemLanguage(string txtSystemLanguageID, string txtLanguageID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retList = (from Item in dObjContext.mSystemLanguages
                           where Item.txtSystemLanguageID.Equals(txtSystemLanguageID)
                           && Item.txtLanguageID.Equals(txtLanguageID)
                           select Item).AsNoTracking().ToList();
            return retList;
        }

        public static string GetmSystemLanguageValue(string txtSystemLanguageID, string txtKeyID, string txtLanguageID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetmSystemLanguageValue(txtSystemLanguageID, txtKeyID, txtLanguageID, dObjContext, dObjTran);
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

        public static string GetmSystemLanguageValue(string txtSystemLanguageID, string txtKeyID, string txtLanguageID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemLanguage mSystemLanguageDat = GetmSystemLanguage(txtSystemLanguageID, txtKeyID, txtLanguageID, dObjContext, dObjTran);
            if ((mSystemLanguageDat != null))
            {
                if (mSystemLanguageDat.txtValue.Equals(string.Empty))
                {
                    return mSystemLanguageDat.txtDefaultValue.ToString();
                }
                else
                {
                    return mSystemLanguageDat.txtValue.ToString();
                }
            }
            else
            {
                return string.Empty;
            }
        }

        //public static bool AllSavemSystemLanguage(List<mSystemLanguage> itemList, string txtUserID)
        //{
        //    SqlConnection dObjConn = SqlClientUtility.GetConnection();
        //    SqlTransaction dObjTran = null;
        //    try
        //    {
        //        dObjConn.Open();
        //        dObjTran = dObjConn.BeginTransaction();
        //        AllSavemSystemLanguage(itemList, txtUserID, dObjConn, dObjTran);
        //        dObjTran.Commit();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        dObjTran.Rollback();
        //        throw ex;
        //    }
        //    finally
        //    {
        //        dObjConn.Close();
        //        dObjConn.Dispose();
        //    }
        //}

        //public static bool AllSavemSystemLanguage(List<mSystemLanguage> itemList, string txtUserID, SFECompetencyDBEntities dObjContext, DbContextTransaction dObjTran)
        //{
        //    foreach (mSystemLanguage idat in itemList)
        //    {
        //        if (!mSystemLanguageCustomBL.IsExistmSystemLanguage(idat.txtSystemLanguageID, idat.txtKeyID, idat.txtLanguageID, dObjConn, dObjTran))
        //        {
        //            mSystemLanguageCustomBL.SavemSystemLanguage(idat, txtUserID, dObjConn, dObjTran);
        //        }
        //        else
        //        {
        //            mSystemLanguage dat = mSystemLanguageCustomBL.GetmSystemLanguage(idat.txtSystemLanguageID, idat.txtKeyID, idat.txtLanguageID, dObjConn, dObjTran);
        //            dat.txtValue = idat.txtValue;
        //            mSystemLanguageCustomBL.UpdatemSystemLanguage(dat, txtUserID, dObjConn, dObjTran);
        //        }
        //    }
        //    return true;
        //}


        public static mSystemLanguage CreateBlankmSystemLanguage()
        {
            mSystemLanguage dat = new mSystemLanguage();
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.txtInsertedBy = string.Empty;
            dat.txtDefaultValue = string.Empty;
            dat.txtKeyID = string.Empty;
            dat.txtLanguageID = string.Empty;
            dat.txtSystemLanguageID = string.Empty;
            dat.txtUpdatedBy = string.Empty;
            dat.txtValue = string.Empty;
            dat.txtGUID = string.Empty;

            return dat;
        }


        #region "GUID"
        public static void SetGUIDToObject(ref mSystemLanguage dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref mSystemLanguage dat)
        {

        }

        public static bool IsExistBytxtGUID(string txtSystemLanguageID, string txtKeyID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(txtSystemLanguageID, txtKeyID, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(string txtSystemLanguageID, string txtKeyID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemLanguage dat = new mSystemLanguage();
            dat = GetBytxtGUID(txtSystemLanguageID, txtKeyID, txtGUID, dObjContext, dObjTran);
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

        public static mSystemLanguage GetBytxtGUID(string txtSystemLanguageID, string txtKeyID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtSystemLanguageID, txtKeyID, txtGUID, dObjContext, dObjTran);
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

        public static mSystemLanguage GetBytxtGUID(string txtSystemLanguageID, string txtKeyID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mSystemLanguages
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtSystemLanguageID.Equals(txtSystemLanguageID)
                          && item.txtKeyID.Equals(txtKeyID)
                          select item).FirstOrDefault();

            return retDat;
        }

        #endregion

    }
}
