using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Library
{
    public static class HelperConverter
    {
        public static int ParseToInteger(object obj)
        {
            if (obj == null)
            {
                return 0;
            }
            else
            {
                try
                {
                    return int.Parse(obj.ToString());
                }
                catch (Exception ex)
                {
                    return 0;
                }
            }
        }
    }
}
