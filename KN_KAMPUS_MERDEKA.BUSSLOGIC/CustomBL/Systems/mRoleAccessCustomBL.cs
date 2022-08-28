using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Module;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Role;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.RoleAccess;
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
    public static class mRoleAccessCustomBL
    {
        /*=========================
            FIND ALL BY ROLE
        =========================*/
        public static Pageable<RoleAccessResponse> findAllByRole(int intRoleId, int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from roleAccess in dObjContext.mRoleAccesses
                            join role in dObjContext.mRoles.DefaultIfEmpty() on roleAccess.intRoleID equals role.intRoleID
                            join module in dObjContext.mModules.DefaultIfEmpty() on roleAccess.intModuleID equals module.intModuleID
                            where
                            role.intRoleID == intRoleId &&
                            role.txtRoleName.Contains(cari)
                            orderby roleAccess.intRoleAccessID ascending
                            select new RoleAccessResponse
                            {
                                intRoleAccessID = roleAccess.intRoleAccessID,
                                bitDelete = roleAccess.bitDelete.HasValue ? roleAccess.bitDelete.Value : true,
                                bitEdit = roleAccess.bitEdit.HasValue ? roleAccess.bitEdit.Value : true,
                                bitPrint = roleAccess.bitPrint.HasValue ? roleAccess.bitPrint.Value : true,
                                bitView = roleAccess.bitView.HasValue ? roleAccess.bitView.Value : true,
                                txtInsertedBy = roleAccess.txtInsertedBy,
                                dtmInsertedDate = roleAccess.dtmInsertedDate.HasValue ? roleAccess.dtmInsertedDate.Value : DateTime.Now,
                                txtUpdatedBy = roleAccess.txtUpdatedBy,
                                dtmUpdatedDate = roleAccess.dtmUpdatedDate.HasValue ? roleAccess.dtmUpdatedDate.Value : DateTime.Now,
                                txtGUID = roleAccess.txtGUID,
                                role = new RoleResponse
                                {
                                    intRoleID = role.intRoleID,
                                    dtmUpdatedDate = role.dtmUpdatedDate.HasValue ? role.dtmUpdatedDate.Value : DateTime.Now,
                                    dtmInsertedDate = role.dtmInsertedDate.HasValue ? role.dtmInsertedDate.Value : DateTime.Now,
                                    bitSuperuser = role.bitSuperuser.HasValue ? role.bitSuperuser.Value : true,
                                    txtGUID = role.txtGUID,
                                    txtInsertedBy = role.txtInsertedBy,
                                    txtRoleName = role.txtRoleName,
                                    txtUpdatedBy = role.txtUpdatedBy
                                },
                                module = new ModuleResponse
                                {
                                    intModuleID = module.intModuleID,
                                    txtModuleName = module.txtModuleName,
                                    txtDescription = module.txtDescription,
                                    txtInsertedBy = module.txtInsertedBy,
                                    dtmInsertedDate = module.dtmInsertedDate.HasValue ? module.dtmInsertedDate.Value : DateTime.Now,
                                    txtUpdatedBy = module.txtUpdatedBy,
                                    dtmUpdatedDate = module.dtmUpdatedDate.HasValue ? module.dtmUpdatedDate.Value : DateTime.Now,
                                    txtGUID = module.txtGUID,
                                }

                            }).AsNoTracking().ToList();

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                Pageable<RoleAccessResponse> pageRoleResponse = new Pageable<RoleAccessResponse>();
                pageRoleResponse.size = size;
                pageRoleResponse.page = page;
                pageRoleResponse.content = data;
                pageRoleResponse.hasPrevious = page > 1;
                pageRoleResponse.hasNext = (page * size) < total;
                pageRoleResponse.total = (int)total;
                pageRoleResponse.hasContent = data.Count > 0;
                return pageRoleResponse;
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
        /*=========================
        END FIND ALL BY ROLE
        =========================*/

        public static int SaveMRoleAccess(mRoleAccess dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveMRoleAccess(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return dat.intRoleAccessID;
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

        public static int SaveMRoleAccess(mRoleAccess dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;

            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID((int)dat.intRoleID, (int)dat.intModuleID, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mRoleAccesses.Add(dat);
                dObjContext.SaveChanges();
            }

            return dat.intRoleAccessID;
        }

        public static bool UpdateMRoleAccess(mRoleAccess dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateMRoleAccess(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdateMRoleAccess(mRoleAccess dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mRoleAccesses.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static mRoleAccess GetMRoleAccess(int intRoleAccessID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMRoleAccess(intRoleAccessID, dObjContext, dObjTran);
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

        public static mRoleAccess GetMRoleAccess(int intRoleAccessID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mRoleAccesses
                    where Item.intRoleAccessID.Equals(intRoleAccessID)
                    select Item).AsNoTracking().FirstOrDefault();
        }

        public static bool DeleteMRoleAccess(int intRoleAccessID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteMRoleAccess(intRoleAccessID, dObjContext, dObjTran);
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

        public static bool DeleteMRoleAccess(int intRoleAccessID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRoleAccess dat = GetMRoleAccess(intRoleAccessID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mRoleAccesses.Attach(dat);
                dObjContext.mRoleAccesses.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mRoleAccess> GetAllMRoleAccess()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllMRoleAccess(dObjContext, dObjTran);
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

        public static List<mRoleAccess> GetAllMRoleAccess(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mRoleAccesses
                    select Item).AsNoTracking().ToList();
        }

        public static bool IsExistMRoleAccess(int intRoleAccessID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistMRoleAccess(intRoleAccessID, dObjContext, dObjTran);
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

        public static bool IsExistMRoleAccess(int intRoleAccessID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRoleAccess dat = new mRoleAccess();
            dat = GetMRoleAccess(intRoleAccessID, dObjContext, dObjTran);
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

        public static mRoleAccess GetPrivilegeUser(int intRoleID, int intModuleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetPrivilegeUser(intRoleID, intModuleID, dObjContext, dObjTran);
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

        public static mRoleAccess GetPrivilegeUser(int intRoleID, int intModuleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mRoleAccesses
                    where Item.intRoleID == intRoleID && Item.intModuleID == intModuleID
                    select Item).AsNoTracking().FirstOrDefault();
        }


        public static mRoleAccess GetPrivilegeUserUrl(int intRoleID, string txtUrl)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetPrivilegeUserUrl(intRoleID, txtUrl, dObjContext, dObjTran);
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

        public static mRoleAccess GetPrivilegeUserUrl(int intRoleID, string txtUrl, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            string txtReplaceUrl = txtUrl.Replace("/Index", "");
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mRoleAccesses
                    join module in dObjContext.mModules on Item.intModuleID equals module.intModuleID
                    join menu in dObjContext.mMenus on module.intModuleID equals menu.intModuleID
                    where 1 == 1
                    && Item.intRoleID == intRoleID
                    && menu.txtLink.Contains(txtReplaceUrl)
                    select Item).AsNoTracking().FirstOrDefault();
        }

        public static mRoleAccess GetPrivilegeUserUrlWithoutMenus(int intRoleID, string txtUrl)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetPrivilegeUserUrlWithoutMenus(intRoleID, txtUrl, dObjContext, dObjTran);
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

        public static mRoleAccess GetPrivilegeUserUrlWithoutMenus(int intRoleID, string txtUrl, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            string[] txtReplaceUrl = txtUrl.Split(new string[] { "/" }, StringSplitOptions.RemoveEmptyEntries);
            string moduleName = (txtReplaceUrl[0].ToLower().Equals("master") || (txtReplaceUrl[0].ToLower().Equals("transaction") && txtReplaceUrl.Length > 1) || (txtReplaceUrl[0].ToLower().Equals("system") && txtReplaceUrl.Length > 1)) ? txtReplaceUrl.Length >= 2 ? txtReplaceUrl[1] : string.Empty : txtReplaceUrl[0];
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mRoleAccesses
                    join module in dObjContext.mModules on Item.intModuleID equals module.intModuleID
                    where 1 == 1
                    && Item.intRoleID == intRoleID
                    && module.txtModuleName.ToUpper().Equals(moduleName)
                    select Item).AsNoTracking().FirstOrDefault();
        }

        public static bool ValidateInput(mRoleAccess dat, string txtRoleAccessID, string txtlangId)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return ValidateInput(dat, txtRoleAccessID, txtlangId, dObjContext, dObjTran);
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

        private static bool ValidateInput(mRoleAccess dat, string txtRoleAccessID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            if (dat.intRoleID == 0)
            {
                throw new Exception("Role Must be Filled!");// clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(mRoleAccessConstant.MODULE_NAME, mRoleAccessConstant.LANGUAGE.ERR_ROLE_IS_EMPTY, txtLangId, dObjConn, dObjTran));
            }
            if (dat.intModuleID == 0)
            {
                throw new Exception("Module Must be Filled!");// clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(mRoleAccessConstant.MODULE_NAME, mRoleAccessConstant.LANGUAGE.ERR_MODULE_IS_EMPTY, txtLangId, dObjConn, dObjTran));
            }

            //Check if Name Already Exist. 
            mRoleAccess prevDat = mRoleAccessCustomBL.GetPrivilegeUser(dat.intRoleID.Value, dat.intModuleID.Value);
            if ((prevDat != null))
            {
                if (!(prevDat.intRoleID == dat.intRoleID))
                {
                    throw new Exception("Role Access is Already Exsist!");// clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(mRoleAccessConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjConn, dObjTran));
                }
            }
            return true;
        }




        #region "GUID"
        public static void SetGUIDToObject(ref mRoleAccess dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref mRoleAccess dat)
        {

        }

        public static bool IsExistBytxtGUID(int intRoleID, int intModuleID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(intRoleID, intModuleID, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(int intRoleID, int intModuleID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRoleAccess dat = new mRoleAccess();
            dat = GetBytxtGUID(intRoleID, intModuleID, txtGUID, dObjContext, dObjTran);
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

        public static mRoleAccess GetBytxtGUID(int intRoleID, int intModuleID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(intRoleID, intModuleID, txtGUID, dObjContext, dObjTran);
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

        public static mRoleAccess GetBytxtGUID(int intRoleID, int intModuleID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mRoleAccesses
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.intRoleID == intRoleID
                          && item.intModuleID == intModuleID
                          select item).FirstOrDefault();

            return retDat;
        }

        #endregion

    }
}
