using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Menu;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Transactions
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

        public static mMenu GetMMenu(int intMenuID, SFERPSEntities dObjContext, DbContextTransaction dObjTran)
        {
            dObjContext.Configuration.ProxyCreationEnabled = false;
            var retDat = (from Item in dObjContext.mMenus
                          where Item.intMenuID.Equals(intMenuID)
                          select Item).AsNoTracking().FirstOrDefault();

            return retDat;
        }

    }
}
