using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.DAL.Context;

namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Masters
{
    public static class mRFIDReaderCustomBL
    {
        //For Get IP
        public static string SaveRFIDReader(string txtIP_addreess)
        {

            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;

            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                SaveRFIDReader(txtIP_addreess, dObjContext, dObjTran);
                dObjTran.Commit();
                return txtIP_addreess;
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
        public static string SaveRFIDReader(string txtIP_addreess, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            mRFID_Reader reader = new mRFID_Reader();
            reader.txtIP_addreess = txtIP_addreess;

            dObjContext.mRFID_Reader.Add(reader);
            dObjContext.SaveChanges();
            //}
            return reader.txtIP_addreess;
        }
    }
}
