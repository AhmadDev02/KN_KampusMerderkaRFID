using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Role;
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
    public static class mRoleCustomBL
    {
        public static Pageable<RoleResponse> findAll(int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from role in dObjContext.mRoles
                            where
                            role.txtRoleName.Contains(cari)
                            orderby role.txtRoleName ascending
                            select role)
                            .Select(role => new RoleResponse
                            {
                                intRoleID = role.intRoleID,
                                dtmUpdatedDate = role.dtmUpdatedDate.HasValue ? role.dtmUpdatedDate.Value : DateTime.Now,
                                dtmInsertedDate = role.dtmInsertedDate.HasValue ? role.dtmInsertedDate.Value : DateTime.Now,
                                bitSuperuser = role.bitSuperuser.HasValue ? role.bitSuperuser.Value : true,
                                txtGUID = role.txtGUID,
                                txtInsertedBy = role.txtInsertedBy,
                                txtRoleName = role.txtRoleName,
                                txtUpdatedBy = role.txtUpdatedBy

                            }).AsNoTracking().ToList();

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                Pageable<RoleResponse> pageRoleResponse = new Pageable<RoleResponse>();
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
        END FIND ALL ROLE
        =========================*/

        public static int SaveMRole(mRole dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveMRole(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return dat.intRoleID;
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

        public static int SaveMRole(mRole dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;

            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.txtRoleName, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mRoles.Add(dat);
                dObjContext.SaveChanges();
            }
            return dat.intRoleID;
        }

        public static bool UpdateMRole(mRole dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateMRole(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdateMRole(mRole dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mRoles.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static mRole GetMRole(int intRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMRole(intRoleID, dObjContext, dObjTran);
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

        public static mRole GetMRole(int intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mRoles
                          where Item.intRoleID.Equals(intRoleID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        public static bool DeleteMRole(int intRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteMRole(intRoleID, dObjContext, dObjTran);
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

        public static bool DeleteMRole(int mRole, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRole dat = GetMRole(mRole, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mRoles.Attach(dat);
                dObjContext.mRoles.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mRole> GetAllMRole()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllMRole(dObjContext, dObjTran);
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

        public static List<mRole> GetAllMRole(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mRoles
                    select Item).AsNoTracking().ToList();
        }

        public static bool IsExistMRole(int intRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistMRole(intRoleID, dObjContext, dObjTran);
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

        public static bool IsExistMRole(int intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRole dat = new mRole();
            dat = GetMRole(intRoleID, dObjContext, dObjTran);
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

        public static mRole GetMRoleByName(string TxtRoleName)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMRoleByName(TxtRoleName, dObjContext, dObjTran);
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

        public static mRole GetMRoleByName(string TxtRoleName, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mRoles
                          where Item.txtRoleName.Equals(TxtRoleName)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        

        public static bool IsSuperuserMWebRole(int intRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsSuperuserMWebRole(intRoleID, dObjContext, dObjTran);
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

        public static bool IsSuperuserMWebRole(int intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRole dat = new mRole();
            dat = GetMRole(intRoleID, dObjContext, dObjTran);
            if (dat == null)
            {
                return false;
            }
            else
            {
                return (bool)dat.bitSuperuser;
            }
        }
        public static bool ValidateInput(mRole dat, string txtRoleID, string txtlangId)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return ValidateInput(dat, txtRoleID, txtlangId, dObjContext, dObjTran);
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

        private static bool ValidateInput(mRole dat, string txtRoleID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            if (dat.txtRoleName.Equals(string.Empty))
            {
                throw new Exception("Role Name Must be Filled!"); // clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(mRoleConstant.MODULE_NAME, mRoleConstant.LANGUAGE.ERR_NAMA_IS_EMPTY, txtLangId, dObjConn, dObjTran));
            }

            //Check if Name Already Exist. 
            mRole prevDat = mRoleCustomBL.GetMRoleByName(dat.txtRoleName.Trim());
            if ((prevDat != null))
            {
                if (!(prevDat.intRoleID == dat.intRoleID))
                {
                    throw new Exception("Role Name is Already Exsist!"); // clsMSystemLanguageCustomBL.GetclsMSystemLanguageValue(mRoleConstant.MODULE_NAME, mRoleConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjConn, dObjTran));
                }
            }
            return true;
        }


        public static mRole GetMRoleByintUserID(int intUserID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMRoleByintUserID(intUserID, dObjContext, dObjTran);
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

        public static mRole GetMRoleByintUserID(int intUserID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mRoles
                          join userRole in dObjContext.mUserRoles on Item.intRoleID equals userRole.intRoleID
                          where 1 == 1
                          && userRole.intUserID == intUserID
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }


        public static List<mRole> GetAllmRolerByRoleID(int intRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllmRolerByRoleID(intRoleID, dObjContext, dObjTran);
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

        public static List<mRole> GetAllmRolerByRoleID(int intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            var retList = new List<mRole> { };
            if (intRoleID != 0)
            {
                retList = (from Item in dObjContext.mRoles
                           where Item.intRoleID == intRoleID
                           select Item).AsNoTracking().ToList();
            }

            return retList;
        }

        public static mRole CreateBlankmRole()
        {
            mRole dat = new mRole();
            dat.bitSuperuser = false;
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.intRoleID = 0;
            dat.txtInsertedBy = string.Empty;
            dat.txtRoleName = string.Empty;
            dat.txtUpdatedBy = string.Empty;
            dat.txtGUID = string.Empty;

            return dat;
        }

      

        #region "GUID"
        public static void SetGUIDToObject(ref mRole dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref mRole dat)
        {

        }

        public static bool IsExistBytxtGUID(string txtRoleName, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(txtRoleName, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(string txtRoleName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRole dat = new mRole();
            dat = GetBytxtGUID(txtRoleName, txtGUID, dObjContext, dObjTran);
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

        public static mRole GetBytxtGUID(string txtRoleName, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtRoleName, txtGUID, dObjContext, dObjTran);
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

        public static mRole GetBytxtGUID(string txtRoleName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mRoles
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtRoleName.Equals(txtRoleName)
                          select item).FirstOrDefault();

            return retDat;
        }

        internal static mRole GetMRoleByintUserID(object intUserID)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
