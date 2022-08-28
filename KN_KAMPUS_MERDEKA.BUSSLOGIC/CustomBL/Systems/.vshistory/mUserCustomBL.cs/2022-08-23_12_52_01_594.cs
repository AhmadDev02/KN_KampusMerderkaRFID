using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.User;
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
    public static class mUserCustomBL
    {

        public static int SavemUser(mUser dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SavemUser(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static int SavemUser(mUser dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;


            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.txtUserName, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mUsers.Add(dat);
                dObjContext.SaveChanges();
            }
            return dat.intUserID;
        }

        public static bool UpdateMUser(mUser dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateMUser(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdateMUser(mUser dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mUsers.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        public static mUser GetMUser(int intUserID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMUser(intUserID, dObjContext, dObjTran);
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
        public static mUser GetMUser(int intUserID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mUsers
                          where Item.intUserID.Equals(intUserID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }
        public static mUser GetMUserByEmpID(string EmpID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMUserByEmpID(EmpID, dObjContext, dObjTran);
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
        public static mUser GetMUserByEmpID(string EmpID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mUsers
                          where Item.txtEmpID.Equals(EmpID)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }

        public static bool DeleteMUser(int intUserID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteMUser(intUserID, dObjContext, dObjTran);
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

        public static bool DeleteMUser(int intUserID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUser dat = GetMUser(intUserID, dObjContext, dObjTran);
            if (dat != null)
            {
                //dObjContext.mUsers.Attach(dat);
                //dObjContext.mUsers.Remove(dat);

                // Jangan hapus user!.
                dat.bitActive = false;
                dObjContext.mUsers.Attach(dat);
                dObjContext.Entry(dat).State = EntityState.Modified;
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mUser> GetAllMUser()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllMUser(dObjContext, dObjTran);
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

        public static List<mUser> GetAllMUser(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retList = (from Item in dObjContext.mUsers
                           select Item).AsNoTracking().ToList();
            return retList;
        }

        public static List<mUser> GetAllMUserActive()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllMUserActive(dObjContext, dObjTran);
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

        public static List<mUser> GetAllMUserActive(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retList = (from Item in dObjContext.mUsers
                           where Item.bitActive == true
                           select Item).AsNoTracking().ToList();
            return retList;
        }
        public static bool IsExistMUser(int intUserID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistMUser(intUserID, dObjContext, dObjTran);
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
        public static bool IsExistMUser(int intUserID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUser dat = new mUser();
            dat = GetMUser(intUserID, dObjContext, dObjTran);
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

        public static bool IsExistMUserByEmpID(string empID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistMUserByEmpID(empID, dObjContext, dObjTran);
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
        public static bool IsExistMUserByEmpID(string empID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUser dat = new mUser();
            var data = (from a in dObjContext.mUsers
                        where a.txtEmpID == empID
                        select a).FirstOrDefault();
            if (data == null)
            {
                return true;
                // Data tidak ditemukan bisa nambah user baru
            }
            else
            {
                return false;
                // Data ditemukan ga bisa nambah user baru
            }
        }

        public static mUser GetMUserbyTxtUserName(string txtUserName)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMUserbyTxtUserName(txtUserName, dObjContext, dObjTran);
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

        public static mUser GetMUserbyTxtUserName(string txtUserName, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mUsers
                          where Item.txtUserName.Equals(txtUserName)
                          select Item).AsNoTracking().FirstOrDefault();
            return retDat;
        }


        public static bool IsValidLoginByTxtNameAndTxtPassword(string TxtName, string txtPassword)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsValidLoginByTxtNameAndTxtPassword(TxtName, txtPassword, dObjContext, dObjTran);
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

        public static bool IsValidLoginByTxtNameAndTxtPassword(string TxtName, string txtPassword, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUser userDat = (from Item in dObjContext.mUsers
                             where Item.txtUserName.Equals(TxtName) && Item.txtPassword.Equals(txtPassword)
                             select Item).AsNoTracking().FirstOrDefault();
            if (userDat == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }


        public static bool Login(string txtUserName, string txtPassword, string txtLangId)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return Login(txtUserName, txtPassword, txtLangId, dObjContext, dObjTran);
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

        public static bool Login(string txtUserName, string txtPassword, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUser userDat = mUserCustomBL.GetMUserbyTxtUserName(txtUserName, dObjContext, dObjTran);
            if (userDat != null)
            {
                if ((bool)!userDat.bitActive)
                {
                    return false;
                }
                if (userDat.bitUseActiveDirectory == true)
                {
                    //Login dengan Active Directory. 
                    string txtDomain = mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.DOMAIN, txtLangId, dObjContext, dObjTran);
                    bool dWSAD = new clsActiveDirectory().AuthenticateUser(txtDomain, txtUserName, txtPassword);

                    ////Lewatin dulu AD-nya.
                    //dWSAD = true;

                    if (dWSAD == true)
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
                    //Login Pakai NIK dan Password in Portal. 
                    if (mUserCustomBL.IsValidLoginByTxtNameAndTxtPassword(txtUserName.Trim(), CryptoEngine.MD5Encrypt(txtPassword.Trim())))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }

            return false;
        }


        public static mUser CreateBlankmUser()
        {
            mUser dat = new mUser();
            dat.bitActive = false;
            dat.bitUseActiveDirectory = false;
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.dtmLastLogin = DateTime.Now;
            dat.intUserID = 0;
            dat.txtInsertedBy = string.Empty;
            dat.txtEmail = string.Empty;
            dat.txtEmpID = string.Empty;
            dat.txtFullName = string.Empty;
            dat.txtNick = string.Empty;
            dat.txtPassword = string.Empty;
            dat.txtUpdatedBy = string.Empty;
            dat.txtUserName = string.Empty;
            dat.txtGUID = string.Empty;

            return dat;
        }


        public static bool ValidateInput(mUser dat, string txtUserID, string txtlangId)
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

        private static bool ValidateInput(mUser dat, string txtUserID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            if (dat.txtEmpID.Equals(string.Empty))
            {
                throw new Exception("Employee ID Must be Filled!");// mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMUserConstant.MODULE_NAME, clsMUserConstant.LANGUAGE.ERR_EMPLOYEEID_EMPTY, txtLangId, dObjContext, dObjTran));
            }
            if (dat.txtUserName.Equals(string.Empty))
            {
                throw new Exception("Username Must be Filled!"); // mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMUserConstant.MODULE_NAME, clsMUserConstant.LANGUAGE.ERR_USERNAME_EMPTY, txtLangId, dObjContext, dObjTran));
            }

            //Check if Name Already Exist. 
            mUser prevDat = mUserCustomBL.GetMUserbyTxtUserName(dat.txtUserName.Trim());
            if ((prevDat != null))
            {
                if (!(prevDat.intUserID == dat.intUserID))
                {
                    throw new Exception("Username -" + dat.txtUserName.Trim() + "- is Already Exsist!"); // mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjContext, dObjTran));
                }
            }
            return true;
        }

        public static bool ResetPassword(mUser dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                ResetPassword(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool ResetPassword(mUser dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateReset(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;

            // Reset password.
            dat.txtPassword = CryptoEngine.MD5Encrypt(mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.DefaultPassword, txtLangId, dObjContext, dObjTran));

            // Set GUID.
            SetGUIDToObject(ref dat, txtGUID);

            dObjContext.mUsers.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }

        private static void ValidateReset(mUser dat, string txtUserID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUser prevDat = GetMUser(dat.intUserID, dObjContext, dObjTran);
            if (prevDat.bitUseActiveDirectory == true)
            {
                throw new Exception("User harus di set tidak menggunakan Active Directory!");
            }
        }


        /*=========================
        FIND ALL USER
        =========================*/
        public static Pageable<UserResponse> findAll(int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from user in dObjContext.mUsers
                            where
                            user.txtEmail.Contains(cari) ||
                            user.txtEmpID.Contains(cari) ||
                            user.txtFullName.Contains(cari) ||
                            user.txtNick.Contains(cari) ||
                            user.txtUserName.Contains(cari)
                            orderby user.txtUserName ascending
                            select user)
                            .Select(user => new UserResponse
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
                            })
                            .AsNoTracking().ToList();

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                Pageable<UserResponse> pageUserResponse = new Pageable<UserResponse>();
                pageUserResponse.size = size;
                pageUserResponse.page = page;
                pageUserResponse.content = data;
                pageUserResponse.hasPrevious = page > 1;
                pageUserResponse.hasNext = (page * size) < total;
                pageUserResponse.total = (int)total;
                pageUserResponse.hasContent = data.Count > 0;
                return pageUserResponse;
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
        END FIND ALL USER
        =========================*/



        #region "GUID"
        public static void SetGUIDToObject(ref mUser dat, string txtGUID)
        {
            dat.txtGUID = txtGUID;
        }
        public static void RemoveLinkPrimaryKey(ref mUser dat)
        {

        }

        public static bool IsExistBytxtGUID(string txtUserName, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistBytxtGUID(txtUserName, txtGUID, dObjContext, dObjTran);
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
        public static bool IsExistBytxtGUID(string txtUserName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mUser dat = new mUser();
            dat = GetBytxtGUID(txtUserName, txtGUID, dObjContext, dObjTran);
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

        public static mUser GetBytxtGUID(string txtUserName, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtUserName, txtGUID, dObjContext, dObjTran);
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

        public static mUser GetBytxtGUID(string txtUserName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mUsers
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtUserName.Equals(txtUserName)
                          select item).FirstOrDefault();

            return retDat;
        }

        #endregion

    }
}
