using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Menu;
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
    public static class mMenuCustomBL
    {
        public static Pageable<MenuResponse> findAll(int page = 1, int size = 20, string cari = "")
        {
            KampusMerdekaEntities dObjContext = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                page = page < 1 ? 1 : page;
                size = size < 1 ? 20 : size;
                int start = (page * size) - size;
                var data = (from menu in dObjContext.mMenus
                            where
                            menu.txtDescription.Contains(cari) ||
                            menu.txtMenuName.Contains(cari) ||
                            menu.intMenuID.ToString().Equals(cari)
                            orderby menu.txtMenuName ascending
                            select menu)
                            .AsNoTracking().ToList();

                var total = data.Count();
                data = data.Skip(start).Take(size).ToList();
                List<MenuResponse> listMenu = new List<MenuResponse>();
                data.ForEach(menu =>
                {
                    MenuResponse mr = new MenuResponse(menu);

                    try
                    {
                        mMenu parent = mMenuCustomBL.GetMMenu(menu.intParentID.GetValueOrDefault(0));
                        if (parent != null)
                        {
                            MenuResponse menuResponse = new MenuResponse(parent);
                            mr.parent = menuResponse;
                        }


                        mModule module = mModuleCustomBL.GetMModule(menu.intModuleID.GetValueOrDefault(0));
                        if (module != null)
                        {
                            mr.module = new ModuleResponse(module);
                        }

                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                    listMenu.Add(mr);
                });
                Pageable<MenuResponse> pageModuleResponse = new Pageable<MenuResponse>();
                pageModuleResponse.size = size;
                pageModuleResponse.page = page;
                pageModuleResponse.content = listMenu;
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

        public static mMenu GetMMenu(int intMenuID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMMenu(intMenuID, dObjContext, dObjTran);
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

        public static mMenu GetMMenu(int intMenuID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mMenus
                          where Item.intMenuID.Equals(intMenuID)
                          select Item).AsNoTracking().FirstOrDefault();

            return retDat;
        }


        public static int SaveMMenu(mMenu dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveMMenu(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
                dObjTran.Commit();
                return dat.intMenuID;
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

        public static int SaveMMenu(mMenu dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);


            // Set User login.
            dat.txtInsertedBy = txtUserID;
            dat.dtmInsertedDate = DateTime.Now;
            dat.txtGUID = txtGUID;
            // Check jika GUID sudah ada.
            if (!IsExistBytxtGUID(dat.txtMenuName, txtGUID, dObjContext, dObjTran))
            {
                dObjContext.mMenus.Add(dat);
                dObjContext.SaveChanges();
            }

            return dat.intMenuID;
        }

        public static bool UpdateMMenu(mMenu dat, string txtUserID, string txtLangId, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                UpdateMMenu(dat, txtUserID, txtLangId, txtGUID, dObjContext, dObjTran);
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

        public static bool UpdateMMenu(mMenu dat, string txtUserID, string txtLangId, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            //Validate dulu
            ValidateInput(dat, txtUserID, txtLangId, dObjContext, dObjTran);

            // Set User login. 
            dat.txtUpdatedBy = txtUserID;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.txtGUID = txtGUID;
            dObjContext.mMenus.Add(dat);
            dObjContext.Entry(dat).State = EntityState.Modified;
            dObjContext.SaveChanges();

            return true;
        }
        public static bool DeleteMMenu(int intMenuID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                DeleteMMenu(intMenuID, dObjContext, dObjTran);
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

        public static bool DeleteMMenu(int intMenuID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mMenu dat = GetMMenu(intMenuID, dObjContext, dObjTran);
            if (dat != null)
            {
                dObjContext.mMenus.Attach(dat);
                dObjContext.mMenus.Remove(dat);
                dObjContext.SaveChanges();
            }
            return true;
        }

        public static List<mMenu> GetAllMMenu()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetAllMMenu(dObjContext, dObjTran);
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

        public static List<mMenu> GetAllMMenu(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mMenus
                    orderby Item.intOrderID ascending
                    select Item).AsNoTracking().ToList();
        }

        public static bool IsExistMMenu(int intMenuID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return IsExistMMenu(intMenuID, dObjContext, dObjTran);
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

        public static bool IsExistMMenu(int intMenuID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mMenu dat = new mMenu();
            dat = GetMMenu(intMenuID, dObjContext, dObjTran);
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

        public static List<mMenu> GetHierarchyOfMenu(List<int> intRoleID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetHierarchyOfMenu(intRoleID, dObjContext, dObjTran);
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

        private static List<mMenu> SelectAllWithParent(int intParentId, List<int> intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            IDictionary<int, mMenu> dicMenu = new Dictionary<int, mMenu>();
            intRoleID.ForEach(roleID =>
            {
                List<mMenu> data = SelectAllWithParentOne(intParentId, roleID, dObjContext, dObjTran);
                if (data != null)
                {
                    data.ForEach(menu =>
                    {
                        if (!dicMenu.ContainsKey(menu.intMenuID))
                        {
                            dicMenu.Add(menu.intMenuID, menu);
                        }
                    });
                }
            });

            return dicMenu.Values.ToList();
        }
        private static List<mMenu> SelectAllWithParentOne(int intParentId, int intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mMenus
                    join roleAccess in dObjContext.mRoleAccesses on Item.intModuleID equals roleAccess.intModuleID
                    where 1 == 1
                    && Item.intParentID == intParentId
                    && (Item.intModuleID == 0 || roleAccess.bitView == true)
                    && roleAccess.intRoleID == intRoleID
                    && Item.bitActive == true
                    orderby Item.intOrderID ascending
                    select Item).OrderBy(x => x.intOrderID).AsNoTracking().ToList();
        }
        //&& roleAccess.intRoleID in intRoleID
        public static List<mMenu> GetHierarchyOfMenu(List<int> intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            List<mMenu> List = new List<mMenu>();
            // Get Parent = 0
            List = SelectAllWithParent(0, intRoleID, dObjContext, dObjTran);
            // Recursive for get Child.
            foreach (mMenu dat in List)
            {
                dat.itemList = p_GetHierarchyOfMenu(dat.intMenuID, intRoleID, dObjContext, dObjTran);
            }
            return List;
        }

        public static List<mMenu> p_GetHierarchyOfMenu(int intParentID, List<int> intRoleID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            List<mMenu> List = new List<mMenu>();
            // Get Parent = 0
            List = SelectAllWithParent(intParentID, intRoleID, dObjContext, dObjTran);
            // Recursive for get Child.
            foreach (mMenu dat in List)
            {
                dat.itemList = p_GetHierarchyOfMenu(dat.intMenuID, intRoleID, dObjContext, dObjTran);
            }
            return List;
        }

        public static mMenu GetMMenuByName(string TxtMenuName)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetMMenuByName(TxtMenuName, dObjContext, dObjTran);
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

        public static mMenu GetMMenuByName(string TxtMenuName, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            return (from Item in dObjContext.mMenus
                    where Item.txtMenuName.Equals(TxtMenuName)
                    select Item).AsNoTracking().FirstOrDefault();
        }


        public static string GenerateMenuHierarchy(List<int> intRoleID, string txtDomain)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GenerateMenuHierarchy(intRoleID, txtDomain, dObjContext, dObjTran);
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

        public static string GenerateMenuHierarchy(List<int> intRoleID, string txtDomain, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            List<mMenu> List = GetHierarchyOfMenu(intRoleID, dObjContext, dObjTran);
            string txtText = string.Empty;


            foreach (mMenu dat in List)
            {
                List<mMenu> itemList = dat.itemList;
                if (itemList.Count == 0)
                {
                    // No Child, so just print parent. 
                    if (!(dat.intModuleID == 0))
                    {
                        txtText += " <li class='nav-item'> <a  class='nav-link' href='";
                        txtText += txtDomain + dat.txtLink != null ? dat.txtLink.ToString().Replace("~", "") : "";
                        txtText += "'> <i class='nav-icon " + dat.txtIcon != null ? dat.txtIcon : "" + "'></i><p> ";
                        txtText += dat.txtMenuName +
                            " <i class='fas fa-angle-right right'></i> </p>  </a> </li> ";
                    }
                }
                else
                {
                    // There childs, so print parent and child.

                    txtText += "<li class='nav-item has-treeview' >";
                    txtText += "<a href ='#' class='nav-link'>";
                    txtText += "<i class='nav-icon fas " + dat.txtIcon + " text-success'></i>";
                    txtText += "<p>" + dat.txtMenuName + "<i class='fas fa-angle-left right'></i></p></a>";
                    txtText += "<ul class='nav nav-treeview'>";
                    p_PrintChild(itemList, ref txtText, txtDomain, dObjContext, dObjTran);
                    txtText += "</ul>";
                    txtText += "</li>";
                }
            }


            return txtText;
        }


        public static string p_PrintChild(List<mMenu> List, ref string txtText, string txtDomain, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            foreach (mMenu dat in List)
            {
                List<mMenu> itemList = dat.itemList;
                if (itemList.Count == 0)
                {
                    // No Child, so just print parent.
                    if (!(dat.intModuleID == 0))
                    {
                        txtText += " <li class='nav-item'> <a  class='nav-link' href='" + txtDomain + dat.txtLink.ToString().Replace("~", "") + "'> <i class='nav-icon " + dat.txtIcon + "'></i><p> " + dat.txtMenuName + " <i class='fas fa-angle-right right'></i> </p>  </a> </li> ";
                    }
                }
                else
                {
                    txtText += "  <li class='nav-item has-treeview' >";
                    txtText += "<a href ='#' class='nav-link'>";
                    txtText += "<i class='nav-icon " + dat.txtIcon + "'></i>";
                    txtText += "<p>" + dat.txtMenuName + "<i class='fas fa-angle-left right'></i></p></a>";
                    txtText += "<ul class='nav nav-treeview'>";
                    p_PrintChild(itemList, ref txtText, txtDomain, dObjContext, dObjTran);
                    txtText += "</ul>";
                    txtText += "</li>";
                }
            }

            return txtText;
        }

        public static bool ValidateInput(mMenu dat, string txtUserID, string txtlangId)
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

        private static bool ValidateInput(mMenu dat, string txtUserID, string txtLangId, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {

            if (dat.txtMenuName.Equals(string.Empty))
            {
                throw new Exception("Kolom Nama menu harus di isi!");// mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMenuConstant.MODULE_NAME, clsMMenuConstant.LANGUAGE.ERR_NAMA_IS_EMPTY, txtLangId, dObjContext, dObjTran));
            }
            if (dat.intModuleID == 0)
            {
                throw new Exception("Kolom Module harus di isi!"); //mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMenuConstant.MODULE_NAME, clsMMenuConstant.LANGUAGE.ERR_MODULE_IS_EMPTY, txtLangId, dObjContext, dObjTran));
            }
            if (dat.txtDescription.Equals(string.Empty))
            {
                throw new Exception("Kolom Deskripsi harus di isi!");// mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMenuConstant.MODULE_NAME, clsMMenuConstant.LANGUAGE.ERR_DESCRIPTION_IS_EMPTY, txtLangId, dObjContext, dObjTran));
            }

            //Check if Name Already Exist. 
            mMenu prevDat = GetMMenuByName(dat.txtMenuName.Trim());
            if ((prevDat != null))
            {
                if (!(prevDat.intMenuID == dat.intMenuID))
                {
                    throw new Exception("Nama Menu sudah ada di database!"); // mSystemLanguageCustomBL.GetmSystemLanguageValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.LANGUAGE.ERR_NAME_ALREADY_EXIST, txtLangId, dObjContext, dObjTran));
                }
            }
            return true;
        }

        public static mMenu CreateBlankmMenu()
        {
            mMenu dat = new mMenu();
            dat.bitActive = false;
            dat.dtmInsertedDate = DateTime.Now;
            dat.dtmUpdatedDate = DateTime.Now;
            dat.intMenuID = 0;
            dat.intModuleID = 0;
            dat.intOrderID = 0;
            dat.intParentID = 0;
            dat.txtInsertedBy = string.Empty;
            dat.txtDescription = string.Empty;
            dat.txtLink = string.Empty;
            dat.txtMenuName = string.Empty;
            dat.txtUpdatedBy = string.Empty;
            dat.txtGUID = string.Empty;

            dat.itemList = new List<mMenu> { };

            return dat;
        }
        public static bool IsExistBytxtGUID(string txtMenuName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mMenu dat = new mMenu();
            dat = GetBytxtGUID(txtMenuName, txtGUID, dObjContext, dObjTran);
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

        public static mMenu GetBytxtGUID(string txtMenuName, string txtGUID)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return GetBytxtGUID(txtMenuName, txtGUID, dObjContext, dObjTran);
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

        public static mMenu GetBytxtGUID(string txtMenuName, string txtGUID, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from item in dObjContext.mMenus
                          where 1 == 1
                          && item.txtGUID.Equals(txtGUID)
                          && item.txtMenuName.Equals(txtMenuName)
                          select item).FirstOrDefault();

            return retDat;
        }

    }
}
