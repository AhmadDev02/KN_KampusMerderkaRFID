using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Helper
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
                    return Convert.ToInt32(obj.ToString());
                }
                catch (Exception ex)
                {
                    return 0;
                }
            }
        }
        public static bool ParseToBoolean(object obj)
        {
            try
            {
                if (obj == null)
                {
                    return false;
                }
                else
                {
                    try
                    {
                        if (obj.Equals(DBNull.Value))
                        {
                            return false;
                        }

                        return bool.Parse(obj.ToString());
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }

}
