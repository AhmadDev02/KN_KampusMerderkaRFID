using KN_KAMPUS_MERDEKA.COMMON.Constant;
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
    public static class trDebugErrorCustomBL
    {
        public static void  Debug(Exception e)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                trDebugError error = new trDebugError
                {
                    txtDebugName= Configuration.APP_NAME,
                    txtErrorInfo=e.Message,
                    txtStackTrace=e.StackTrace,
                    dtmErrorDate = DateTime.Now
                };
                dObjContext.trDebugErrors.Add(error);
                dObjContext.SaveChanges();
                dObjTran.Commit();
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

        private void SendEmailOnError()
        {
            //mSystemConfiguration? syconfig = mSystemConfigurationCustomBL.GetmSystemConfigurationBySysConfigAndKey(Configuration.MODULE_NAME, Configuration.Key.bDebugEmail);
            //if (syconfig is not null )
            //{
                
            //}
        }
    }
}
