using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
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
            catch (DbEntityValidationException er)
            {
                foreach (var eve in er.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
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

        private static  void SendEmailOnError()
        {
            //mSystemConfiguration? syconfig = mSystemConfigurationCustomBL.GetmSystemConfigurationBySysConfigAndKey(Configuration.MODULE_NAME, Configuration.Key.bDebugEmail);
            //if (syconfig is not null )
            //{
                
            //}
        }
    }
}
