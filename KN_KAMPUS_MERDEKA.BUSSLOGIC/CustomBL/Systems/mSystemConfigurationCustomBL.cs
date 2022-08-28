using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.DAL.Context;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems
{
    public class mSystemConfigurationCustomBL
    {
        public static bool SavemSystemConfiguration(mSystemConfiguration dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SavemSystemConfiguration(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool SavemSystemConfiguration(mSystemConfiguration dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);


            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;

            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.txtSystemConfigurationID, dat.txtKeyID, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mSystemConfigurations.Add(dat);
                dObjContext.SaveChanges();
            }

            return true;
        }

        public static bool UpdatemSystemConfiguration(mSystemConfiguration dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdatemSystemConfiguration(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdatemSystemConfiguration(mSystemConfiguration dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mSystemConfigurations.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }


        public static mSystemConfiguration GetmSystemConfigurationBySysConfigAndKey(string txtSystemConfigurationID, string txtKeyID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetmSystemConfigurationBySysConfigAndKey(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
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

        public static mSystemConfiguration GetmSystemConfigurationBySysConfigAndKey(string txtSystemConfigurationID, string txtKeyID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mSystemConfigurations
                          where Item.txtSystemConfigurationID.Equals(txtSystemConfigurationID) && Item.txtKeyID.Equals(txtKeyID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        public static bool DeletemSystemConfiguration(string txtSystemConfigurationID, string txtKeyID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeletemSystemConfiguration(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
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

        public static bool DeletemSystemConfiguration(string txtSystemConfigurationID, string txtKeyID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemConfiguration dat = GetmSystemConfigurationBySysConfigAndKey(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mSystemConfigurations.Attach(dat);
                dObjContext.mSystemConfigurations.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mSystemConfiguration> GetAllmSystemConfiguration()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllmSystemConfiguration(dObjContext, dObjTran);
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

        public static List<mSystemConfiguration> GetAllmSystemConfiguration(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retList = (from Item in dObjContext.mSystemConfigurations
                           select Item).AsNoTracking().ToList();
            return retList;
        }

        public static bool IsExistmSystemConfiguration(string txtSystemConfigurationID, string txtKeyID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistmSystemConfiguration(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
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

        public static bool IsExistmSystemConfiguration(string txtSystemConfigurationID, string txtKeyID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemConfiguration dat = new mSystemConfiguration();
            dat = GetmSystemConfigurationBySysConfigAndKey(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
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


        private static bool ValidateInput(mSystemConfiguration dat, string txtUserID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            return true;
        }


        public static List<mSystemConfiguration> GetAllmSystemConfigurationBytxtSystemConfigurationID(string txtSystemConfigurationID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllmSystemConfigurationBytxtSystemConfigurationID(txtSystemConfigurationID, dObjContext, dObjTran);
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

        public static List<mSystemConfiguration> GetAllmSystemConfigurationBytxtSystemConfigurationID(string txtSystemConfigurationID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retList = (from Item in dObjContext.mSystemConfigurations
                           where Item.txtSystemConfigurationID.Equals(txtSystemConfigurationID)
                           select Item).AsNoTracking().ToList();
            return retList;
        }


        public static mSystemConfiguration GetmSystemConfigurationBySYSCONFIG_KEY(string txtSystemConfigurationID, string txtKeyID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetmSystemConfigurationBySYSCONFIG_KEY(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
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

        public static mSystemConfiguration GetmSystemConfigurationBySYSCONFIG_KEY(string txtSystemConfigurationID, string txtKeyID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mSystemConfigurations
                          where Item.txtSystemConfigurationID.Equals(txtSystemConfigurationID) && Item.txtKeyID.Equals(txtKeyID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        public static string GetmSystemConfigurationValue(string txtSystemConfigurationID, string txtKeyID, string txtLangID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetmSystemConfigurationValue(txtSystemConfigurationID, txtKeyID, txtLangID, dObjContext, dObjTran);
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

        public static string GetmSystemConfigurationValue(string txtSystemConfigurationID, string txtKeyID, string txtLangID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemConfiguration sysDat = GetmSystemConfigurationBySysConfigAndKey(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
            if (sysDat == null)
            {
                throw new Exception("Configuration Not Found!");
                //throw new Exception(clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_CONFIGURATION_NOTFOUND, txtLanguageID));
            }

            if (sysDat.txtValue.Equals(string.Empty))
            {
                return sysDat.txtDefaultValue.ToString().Trim();
            }
            else
            {
                return sysDat.txtValue.ToString().Trim();
            }
        }

        public static bool GetmSystemConfigurationBoolean(string txtSystemConfigurationID, string txtKeyID, string txtLangID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetmSystemConfigurationBoolean(txtSystemConfigurationID, txtKeyID, txtLangID, dObjContext, dObjTran);
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

        public static bool GetmSystemConfigurationBoolean(string txtSystemConfigurationID, string txtKeyID, string txtLangID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemConfiguration sysDat = GetmSystemConfigurationBySysConfigAndKey(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
            if (sysDat == null)
            {
                return false;
                //throw new Exception(clsMWebSystemLanguageCustomBL.GetclsMWebSystemLanguageValue(clsMWebMainConstant.MODULE_NAME, clsMWebMainConstant.LANGUAGE.ERR_CONFIGURATION_NOTFOUND, txtLanguageID));
            }

            if (sysDat.txtValue.Equals(string.Empty))
            {
                if (sysDat.txtDefaultValue.ToString().ToLower().Equals("yes"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                if (sysDat.txtValue.ToString().ToLower().Equals("yes"))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public static bool IsExistmSystemConfigurationBySysConfig_Key(string txtSystemConfigurationID, string txtKeyID, string txtLangID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistmSystemConfigurationBySysConfig_Key(txtSystemConfigurationID, txtKeyID, txtLangID, dObjContext, dObjTran);
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


        public static bool IsExistmSystemConfigurationBySysConfig_Key(string txtSystemConfigurationID, string txtKeyID, string txtLangID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemConfiguration dat = new mSystemConfiguration();
            dat = GetmSystemConfigurationBySysConfigAndKey(txtSystemConfigurationID, txtKeyID, dObjContext, dObjTran);
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


        public static mSystemConfiguration CreateBlankmSystemConfiguration()
        {
            mSystemConfiguration dat = new mSystemConfiguration();
            dat.intModuleID = 0;
            dat.txtDefaultValue = string.Empty;
            dat.txtDescription = string.Empty;
            dat.txtKeyID = string.Empty;
            dat.txtSystemConfigurationID = string.Empty;
            dat.txtValue = string.Empty;

            dat.txtInsertedBy = string.Empty;
            dat.txtUpdatedBy = string.Empty;
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.txtGUID = string.Empty;

            return dat;
        }

        #region "GUID"
        public static void SetGUIDToObject(ref mSystemConfiguration dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref mSystemConfiguration dat)
        {

        }

        public static bool IsExistBytxtGUID(string txtSystemConfigurationID, string txtKeyID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(txtSystemConfigurationID, txtKeyID, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(string txtSystemConfigurationID, string txtKeyID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mSystemConfiguration dat = new mSystemConfiguration();
            dat = GetBytxtGUID(txtSystemConfigurationID, txtKeyID, txtGUID, dObjContext, dObjTran);
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

        public static mSystemConfiguration GetBytxtGUID(string txtSystemConfigurationID, string txtKeyID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtSystemConfigurationID, txtKeyID, txtGUID, dObjContext, dObjTran);
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

        public static mSystemConfiguration GetBytxtGUID(string txtSystemConfigurationID, string txtKeyID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mSystemConfigurations
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtSystemConfigurationID.Equals(txtSystemConfigurationID)
                          && item.txtKeyID.Equals(txtKeyID)
                          select item).FirstOrDefault();

            return retDat;
        }

        #endregion
    }
}
