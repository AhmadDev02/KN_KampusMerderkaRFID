using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Role;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.User;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.UserRole;
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
    public static class mUserRoleCustomBL
    {
        /*=========================
  FIND ALL BY USER
  =========================*/
        public static Pageable<UserRoleResponse> findAllByUser(int intUserId, int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from userRole in dObjContext.mUserRoles
                            join user in dObjContext.mUsers on userRole.intUserID equals user.intUserID
                            join role in dObjContext.mRoles on userRole.intRoleID equals role.intRoleID
                            where
                            userRole.intUserID == intUserId &&
                            role.txtRoleName.Contains(cari)
                            orderby userRole.intUserRoleID ascending
                            select new UserRoleResponse
                            {
                                intUserRoleID = userRole.intUserRoleID,
                                txtInsertedBy = userRole.txtInsertedBy,
                                dtmInsertedDate = userRole.dtmInsertedDate.HasValue ? userRole.dtmInsertedDate.Value : DateTime.Now,
                                dtmUpdatedDate = userRole.dtmUpdatedDate.HasValue ? userRole.dtmUpdatedDate.Value : DateTime.Now,
                                txtGUID = userRole.txtGUID,
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
                                user = new UserResponse
                                {
                                    intUserID = user.intUserID,
                                    txtUserName = user.txtUserName,
                                    txtFullName = user.txtFullName,
                                    txtNick = user.txtNick,
                                    txtEmpID = user.txtEmpID,
                                    txtEmail = user.txtEmail,
                                    bitActive = user.bitActive.HasValue ? user.bitActive.Value : false,
                                    bitUseActiveDirectory = user.bitUseActiveDirectory.HasValue ? user.bitUseActiveDirectory.Value : false,
                                    dtmLastLogin = user.dtmLastLogin.HasValue ? user.dtmLastLogin.Value : DateTime.Now,
                                    txtInsertedBy = user.txtInsertedBy,
                                    dtmInsertedDate = user.dtmInsertedDate.HasValue ? user.dtmInsertedDate.Value : DateTime.Now,
                                    txtUpdatedBy = user.txtUpdatedBy,
                                    dtmUpdatedDate = user.dtmUpdatedDate.HasValue ? user.dtmUpdatedDate.Value : DateTime.Now,
                                    txtGUID = user.txtGUID,
                                }

                            }).AsNoTracking().ToList();

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                Pageable<UserRoleResponse> pageUSerRole = new Pageable<UserRoleResponse>();
                pageUSerRole.size = size;
                pageUSerRole.page = page;
                pageUSerRole.content = data;
                pageUSerRole.hasPrevious = page > 1;
                pageUSerRole.hasNext = (page * size) < total;
                pageUSerRole.total = (int)total;
                pageUSerRole.hasContent = data.Count > 0;
                return pageUSerRole;
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
        END FIND ALL BY USER
        =========================*/
        public static int SaveMUserRole(mUserRole dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveMUserRole(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return dat.intUserID;
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

        public static int SaveMUserRole(mUserRole dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;

            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.intUserID, dat.intRoleID, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mUserRoles.Add(dat);
                dObjContext.SaveChanges();
            }

            return dat.intUserRoleID;
        }

        public static bool UpdateMUserRole(mUserRole dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateMUserRole(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdateMUserRole(mUserRole dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mUserRoles.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static mUserRole GetMUserRole(int intUserRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMUserRole(intUserRoleID, dObjContext, dObjTran);
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

        public static mUserRole GetMUserRole(int intUserRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mUserRoles
                          where Item.intUserRoleID.Equals(intUserRoleID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }


        //tambahan adel
        public static mUserRole GetMUserRoleDashboard(int intUserID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMUserRoleDashboard(intUserID, dObjContext, dObjTran);
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

        public static mUserRole GetMUserRoleDashboard(int intUserID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mUserRoles
                          where Item.intUserID.Equals(intUserID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }


        public static bool DeleteMUserRole(int intUserRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteMUserRole(intUserRoleID, dObjContext, dObjTran);
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

        public static bool DeleteMUserRole(int intUserRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUserRole dat = GetMUserRole(intUserRoleID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mUserRoles.Attach(dat);
                dObjContext.mUserRoles.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mUserRole> GetAllMUserRole()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllMUserRole(dObjContext, dObjTran);
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

        public static List<mUserRole> GetAllMUserRole(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retList = (from Item in dObjContext.mUserRoles
                           select Item).AsNoTracking().ToList();
            return retList;
        }

        public static bool IsExistMUserRole(int intUserRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistMUserRole(intUserRoleID, dObjContext, dObjTran);
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

        public static bool IsExistMUserRole(int intUserRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUserRole dat = new mUserRole();
            dat = GetMUserRole(intUserRoleID, dObjContext, dObjTran);
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

        public static List<mUserRole> GetAllmUserRoleByRoleAndUser(int intRoleID, int intUserID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllmUserRoleByRoleAndUser(intRoleID, intUserID, dObjContext, dObjTran);
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

        public static List<mUserRole> GetAllmUserRoleByRoleAndUser(int intRoleID, int intUserID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            var retList = new List<mUserRole> { };
            if (intRoleID != 0 && intUserID != 0)
            {
                retList = (from Item in dObjContext.mUserRoles
                           where Item.intUserID == intUserID && Item.intRoleID == intRoleID
                           select Item).AsNoTracking().ToList();
            }
            else if (intRoleID != 0)
            {
                retList = (from Item in dObjContext.mUserRoles
                           where Item.intRoleID == intRoleID
                           select Item).AsNoTracking().ToList();
            }
            else
            {
                retList = (from Item in dObjContext.mUserRoles
                           where Item.intUserID == intUserID
                           select Item).AsNoTracking().ToList();
            }
            return retList;
        }

        private static bool ValidateInput(mUserRole dat, string txtUserID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            return true;
        }

        public static mUserRole CreateBlankmUserRole()
        {
            mUserRole dat = new mUserRole();
            dat.intUserRoleID = 0;
            dat.intRoleID = 0;
            dat.intUserID = 0;

            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.txtUpdatedBy = string.Empty;
            dat.txtInsertedBy = string.Empty;
            dat.txtGUID = string.Empty;

            return dat;
        }

        public static mUserRole parseFromJSON(JObject jsonDat)
        {
            mUserRole dat = new mUserRole();
            dat.intRoleID = Convert.ToInt32(jsonDat["intRoleID"].ToString());
            dat.intUserID = Convert.ToInt32(jsonDat["intUserID"].ToString());
            dat.intUserRoleID = Convert.ToInt32(jsonDat["intUserRoleID"].ToString());


            dat.dtmInsertedDate = DateTime.Parse(jsonDat["dtmInsertedDate"].ToString());
            dat.dtmUpdatedDate = DateTime.Now;
            dat.txtInsertedBy = Convert.ToString(jsonDat["txtInsertedBy"].ToString());
            dat.txtUpdatedBy = Convert.ToString(jsonDat["txtUpdatedBy"].ToString());
            dat.txtGUID = Convert.ToString(jsonDat["txtGUID"].ToString());

            dat.dtmInsertedDate = DateTime.Parse(dat.dtmInsertedDate.ToString()).AddHours(TimeZone.CurrentTimeZone.GetUtcOffset(new DateTime()).Hours);

            return dat;
        }

        #region "GUID"
        public static void SetGUIDToObject(ref mUserRole dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref mUserRole dat)
        {

        }

        public static bool IsExistBytxtGUID(int intUserID, int intRoleID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(intUserID, intRoleID, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(int intUserID, int intRoleID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUserRole dat = new mUserRole();
            dat = GetBytxtGUID(intUserID, intRoleID, txtGUID, dObjContext, dObjTran);
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

        public static mUserRole GetBytxtGUID(int intUserID, int intRoleID, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(intUserID, intRoleID, txtGUID, dObjContext, dObjTran);
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

        public static mUserRole GetBytxtGUID(int intUserID, int intRoleID, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mUserRoles
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.intUserID == intUserID
                          && item.intRoleID == intRoleID
                          select item).FirstOrDefault();

            return retDat;
        }

        #endregion
    }
}
