using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Library
{
    public class EFClientUtility
    {
        private const int COMMAND_TIMEOUT = 0;

        public static string GetConnectionString()
        {
            return new clsSystemConfiguration().ConnectionStringSql;
        }
    }
}
