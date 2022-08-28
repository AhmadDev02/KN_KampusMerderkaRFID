using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Module;
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
    }
}
