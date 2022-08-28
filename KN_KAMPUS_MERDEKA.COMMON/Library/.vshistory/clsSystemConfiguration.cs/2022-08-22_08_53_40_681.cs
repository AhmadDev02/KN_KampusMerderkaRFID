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
        private string _SFERPSEntities = ConfigurationManager.ConnectionStrings["SFERPSEntities"].ToString();
        private string _OracleXXSFA = ConfigurationManager.ConnectionStrings["OracleXXSFA"].ToString();

        public string ConnectionStringSql
        {
            get { return clsRijndael.Decrypt(_SFERPSEntities); }
        }
        public string ConnectionStringOracleXXSFA
        {
            get { return clsRijndael.Decrypt(_OracleXXSFA); }
        }


    }
}
