using KN_KAMPUS_MERDEKA.COMMON.Constant;
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

        public static decimal ParseToDecimal(object obj, int intCount, string txtCurrencyRounding, string txtCurrencyID)
        {
            if (obj == null)
            {
                return 0;
            }
            else
            {
                try
                {
                    if (txtCurrencyID.Equals(string.Empty) | txtCurrencyRounding.Equals(string.Empty))
                    {
                        //Jika salah satu parameternya adalah kosong.
                        return decimal.Parse(obj.ToString().Trim());
                    }

                    if (txtCurrencyID.ToLower().Equals(txtCurrencyRounding.ToLower()))
                    {
                        //Jika matauang yang dipilih adalah matauang yang dibulatkan. 
                        return decimal.Parse(obj.ToString().Trim());
                    }
                    else
                    {
                        return decimal.Parse(obj.ToString());//  String.FormatNumber(obj.ToString().Trim(), intCount);
                    }
                }
                catch (Exception ex)
                {
                    return 0;
                }
            }
        }
        public static decimal ParseToDecimal(object obj)
        {
            return ParseToDecimal(obj, 0, string.Empty, string.Empty);
        }
        public static short ParseToShort(object obj)
        {
            if (obj == null)
            {
                return 0;
            }
            else
            {
                try
                {
                    return Int16.Parse(obj.ToString());
                }
                catch (Exception ex)
                {
                    return 0;
                }
            }
        }

        public static byte[] DataReaderGetByteOfArray(object obj)
        {
            if (obj == null)
            {
                return new byte[1];
            }
            else if (obj.Equals(DBNull.Value))
            {
                return new byte[1];
            }
            else
            {
                return (byte[])obj;
            }
        }

        public static bool DataReaderGetBoolean(object obj)
        {
            if (obj == null)
            {
                return false;
            }
            else if (obj.Equals(DBNull.Value))
            {
                return false;
            }
            else
            {
                if ((int)obj == 1 | (bool)obj == true)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public static DateTime DataReaderGetDateTime(object obj)
        {
            if (obj == null)
            {
                return Configuration.DATE_MINVALUE;
            }
            else if (obj.Equals(DBNull.Value))
            {
                return Configuration.DATE_MINVALUE;
            }
            else
            {
                return DateTime.Parse(obj.ToString());
            }
        }



    }

}
