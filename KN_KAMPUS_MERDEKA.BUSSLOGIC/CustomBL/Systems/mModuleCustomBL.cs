using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Module;
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
    public static class mModuleCustomBL
    {
        public static Pageable<ModuleResponse> findAll(int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from module in dObjContext.mModules
                            where
                            module.txtDescription.Contains(cari) ||
                            module.txtModuleName.Contains(cari) ||
                            module.intModuleID.ToString().Equals(cari)
                            orderby module.txtModuleName ascending
                            select module)
                            .Select(module => new ModuleResponse
                            {
                                intModuleID = module.intModuleID,
                                txtModuleName = module.txtModuleName,
                                txtDescription = module.txtDescription,
                                txtInsertedBy = module.txtInsertedBy,
                                dtmInsertedDate = module.dtmInsertedDate.HasValue ? module.dtmInsertedDate.Value : DateTime.Now,
                                txtUpdatedBy = module.txtUpdatedBy,
                                dtmUpdatedDate = module.dtmUpdatedDate.HasValue ? module.dtmUpdatedDate.Value : DateTime.Now,
                                txtGUID = module.txtGUID,

                            }).AsNoTracking().ToList();

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                Pageable<ModuleResponse> pageModuleResponse = new Pageable<ModuleResponse>();
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

        public static int SaveMModule(mModule dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveMModule(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return dat.intModuleID;
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

        public static int SaveMModule(mModule dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;

            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.txtModuleName, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mModules.Add(dat);
                dObjContext.SaveChanges();
            }

            return dat.intModuleID;
        }

        public static bool UpdateMModule(mModule dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateMModule(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdateMModule(mModule dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mModules.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static mModule GetMModule(int intModuleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMModule(intModuleID, dObjContext, dObjTran);
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

        public static mModule GetMModule(int intModuleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mModules
                          where Item.intModuleID.Equals(intModuleID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        public static bool DeleteMModule(int intModuleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteMModule(intModuleID, dObjContext, dObjTran);
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

        public static bool DeleteMModule(int intModuleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mModule dat = GetMModule(intModuleID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mModules.Attach(dat);
                dObjContext.mModules.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mModule> GetAllMModule()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllMModule(dObjContext, dObjTran);
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

        public static List<mModule> GetAllMModule(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mModules
                    select Item).AsNoTracking().ToList();
        }

        public static bool IsExistMModule(int intModuleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistMModule(intModuleID, dObjContext, dObjTran);
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

        public static bool IsExistMModule(int intModuleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mModule dat = new mModule();
            dat = GetMModule(intModuleID, dObjContext, dObjTran);
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

        public static mModule GetMModuleByName(string TxtModuleName)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMModuleByName(TxtModuleName, dObjContext, dObjTran);
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

        public static mModule GetMModuleByName(string TxtModuleName, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mModules
                    where Item.txtModuleName.Equals(TxtModuleName)
                    select Item).AsNoTracking().FirstOrDefault();
        }


        public static bool ValidateInput(mModule dat, string txtUserID, string txtlangId)
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

        private static bool ValidateInput(mModule dat, string txtUserId, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            if (dat.txtModuleName.Equals(string.Empty))
            {
                throw new Exception("Module Name Must be Filled!");// clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(mModuleConstant.MODULE_NAME, mModuleConstant.LANGUAGE.ERR_NAMA_IS_EMPTY, txtLangId, dObjConn, dObjTran));
            }

            //Check if Name Already Exist. 
            mModule prevDat = mModuleCustomBL.GetMModuleByName(dat.txtModuleName.Trim());
            if ((prevDat != null))
            {
                if (!(prevDat.intModuleID == dat.intModuleID))
                {
                    throw new Exception("Module Name is Already Exsist!");// clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(mModuleConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjConn, dObjTran));
                }
            }
            return true;
        }

        public static mModule CreateBlankmModule()
        {
            mModule dat = new mModule();
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.intModuleID = 0;
            dat.txtInsertedBy = string.Empty;
            dat.txtDescription = string.Empty;
            dat.txtModuleName = string.Empty;
            dat.txtUpdatedBy = string.Empty;
            dat.txtGUID = string.Empty;

            return dat;
        }

        public static void SetGUIDToObject(ref mModule dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref mModule dat)
        {

        }

        public static bool IsExistBytxtGUID(string txtModuleName, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(txtModuleName, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(string txtModuleName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mModule dat = new mModule();
            dat = GetBytxtGUID(txtModuleName, txtGUID, dObjContext, dObjTran);
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

        public static mModule GetBytxtGUID(string txtModuleName, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtModuleName, txtGUID, dObjContext, dObjTran);
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

        public static mModule GetBytxtGUID(string txtModuleName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mModules
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtModuleName.Equals(txtModuleName)
                          select item).FirstOrDefault();

            return retDat;
        }
    }
}
