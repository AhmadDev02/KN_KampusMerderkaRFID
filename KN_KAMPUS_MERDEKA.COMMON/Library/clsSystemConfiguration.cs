using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Library
{
    public class clsSystemConfiguration
    {
        private string _Entities = ConfigurationManager.ConnectionStrings["KampusMerdekaEntities"].ToString();

        public string ConnectionStringSql
        {
            get { return clsRijndael.Decrypt(_Entities); }
        }


    }
}
