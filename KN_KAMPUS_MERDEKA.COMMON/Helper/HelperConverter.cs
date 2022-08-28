using KN_KAMPUS_MERDEKA.COMMON.Constant;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
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
        public static string GetDayName(bool bitIndo, System.DateTime dt)
        {
            switch (dt.DayOfWeek)
            {
                case System.DayOfWeek.Sunday:
                    if (bitIndo)
                    {
                        return Configuration.DAYNAME_INDO.SUNDAY;
                    }
                    else
                    {
                        return Configuration.DAYNAME.SUNDAY;
                    }
                case System.DayOfWeek.Monday:
                    if (bitIndo)
                    {
                        return Configuration.DAYNAME_INDO.MONDAY;
                    }
                    else
                    {
                        return Configuration.DAYNAME.MONDAY;
                    }
                case System.DayOfWeek.Tuesday:
                    if (bitIndo)
                    {
                        return Configuration.DAYNAME_INDO.TUESDAY;
                    }
                    else
                    {
                        return Configuration.DAYNAME.TUESDAY;
                    }
                case System.DayOfWeek.Wednesday:
                    if (bitIndo)
                    {
                        return Configuration.DAYNAME_INDO.WEDNESDAY;
                    }
                    else
                    {
                        return Configuration.DAYNAME.WEDNESDAY;
                    }
                case System.DayOfWeek.Thursday:
                    if (bitIndo)
                    {
                        return Configuration.DAYNAME_INDO.THURSDAY;
                    }
                    else
                    {
                        return Configuration.DAYNAME.THURSDAY;
                    }
                case System.DayOfWeek.Friday:
                    if (bitIndo)
                    {
                        return Configuration.DAYNAME_INDO.FRIDAY;
                    }
                    else
                    {
                        return Configuration.DAYNAME.FRIDAY;
                    }
                case System.DayOfWeek.Saturday:
                    if (bitIndo)
                    {
                        return Configuration.DAYNAME_INDO.SATURDAY;
                    }
                    else
                    {
                        return Configuration.DAYNAME.SATURDAY;
                    }
                default:
                    throw new Exception("DEV: Invalid Day parameter in GetDayName");
            }
        }

        public static string GetThisMonth(bool bShort)
        {
            if (DateTime.Now.Month == 1)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.JANUARI;
                }
                else
                {
                    return Configuration.MONTH.JANUARI;
                }
            }
            else if (DateTime.Now.Month == 2)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.FEBRUARI;
                }
                else
                {
                    return Configuration.MONTH.FEBRUARI;
                }
            }
            else if (DateTime.Now.Month == 3)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.MARET;
                }
                else
                {
                    return Configuration.MONTH.MARET;
                }
            }
            else if (DateTime.Now.Month == 4)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.APRIL;
                }
                else
                {
                    return Configuration.MONTH.APRIL;
                }
            }
            else if (DateTime.Now.Month == 5)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.MEI;
                }
                else
                {
                    return Configuration.MONTH.MEI;
                }
            }
            else if (DateTime.Now.Month == 6)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.JUNI;
                }
                else
                {
                    return Configuration.MONTH.JUNI;
                }
            }
            else if (DateTime.Now.Month == 7)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.JULI;
                }
                else
                {
                    return Configuration.MONTH.JULI;
                }
            }
            else if (DateTime.Now.Month == 8)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.AGUSTUS;
                }
                else
                {
                    return Configuration.MONTH.AGUSTUS;
                }
            }
            else if (DateTime.Now.Month == 9)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.SEPTEMBER;
                }
                else
                {
                    return Configuration.MONTH.SEPTEMBER;
                }
            }
            else if (DateTime.Now.Month == 10)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.OKTOBER;
                }
                else
                {
                    return Configuration.MONTH.OKTOBER;
                }
            }
            else if (DateTime.Now.Month == 11)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.NOVEMBER;
                }
                else
                {
                    return Configuration.MONTH.NOVEMBER;
                }
            }
            else if (DateTime.Now.Month == 12)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.DESEMBER;
                }
                else
                {
                    return Configuration.MONTH.DESEMBER;
                }
            }
            else
            {
                throw new Exception("DEV: ERROR in GetThisMonth()");

            }
        }

        public static string GetMonthName(int intMonth, bool bShort)
        {
            if (intMonth == 1)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.JANUARI;
                }
                else
                {
                    return Configuration.MONTH.JANUARI;
                }
            }
            else if (intMonth == 2)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.FEBRUARI;
                }
                else
                {
                    return Configuration.MONTH.FEBRUARI;
                }
            }
            else if (intMonth == 3)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.MARET;
                }
                else
                {
                    return Configuration.MONTH.MARET;
                }
            }
            else if (intMonth == 4)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.APRIL;
                }
                else
                {
                    return Configuration.MONTH.APRIL;
                }
            }
            else if (intMonth == 5)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.MEI;
                }
                else
                {
                    return Configuration.MONTH.MEI;
                }
            }
            else if (intMonth == 6)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.JUNI;
                }
                else
                {
                    return Configuration.MONTH.JUNI;
                }
            }
            else if (intMonth == 7)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.JULI;
                }
                else
                {
                    return Configuration.MONTH.JULI;
                }
            }
            else if (intMonth == 8)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.AGUSTUS;
                }
                else
                {
                    return Configuration.MONTH.AGUSTUS;
                }
            }
            else if (intMonth == 9)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.SEPTEMBER;
                }
                else
                {
                    return Configuration.MONTH.SEPTEMBER;
                }
            }
            else if (intMonth == 10)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.OKTOBER;
                }
                else
                {
                    return Configuration.MONTH.OKTOBER;
                }
            }
            else if (intMonth == 11)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.NOVEMBER;
                }
                else
                {
                    return Configuration.MONTH.NOVEMBER;
                }
            }
            else if (intMonth == 12)
            {
                if (bShort)
                {
                    return Configuration.MONTH_SHORT.DESEMBER;
                }
                else
                {
                    return Configuration.MONTH.DESEMBER;
                }
            }
            else
            {
                throw new Exception("DEV: ERROR in GetThisMonth()");

            }
        }

        public static int GetMonth(string txtPeriod, bool bShort)
        {
            if (bShort)
            {
                switch (txtPeriod)
                {
                    case Configuration.MONTH_SHORT.JANUARI:
                        return 1;
                    case Configuration.MONTH_SHORT.FEBRUARI:
                        return 2;
                    case Configuration.MONTH_SHORT.MARET:
                        return 3;
                    case Configuration.MONTH_SHORT.APRIL:
                        return 4;
                    case Configuration.MONTH_SHORT.MEI:
                        return 5;
                    case Configuration.MONTH_SHORT.JUNI:
                        return 6;
                    case Configuration.MONTH_SHORT.JULI:
                        return 7;
                    case Configuration.MONTH_SHORT.AGUSTUS:
                        return 8;
                    case Configuration.MONTH_SHORT.SEPTEMBER:
                        return 9;
                    case Configuration.MONTH_SHORT.OKTOBER:
                        return 10;
                    case Configuration.MONTH_SHORT.NOVEMBER:
                        return 11;
                    case Configuration.MONTH_SHORT.DESEMBER:
                        return 12;
                    default:
                        throw new Exception("DEV: ERROR in GetMonth(Jan-Des)");
                }
            }
            else
            {
                switch (txtPeriod)
                {
                    case Configuration.MONTH.JANUARI:
                        return 1;
                    case Configuration.MONTH.FEBRUARI:
                        return 2;
                    case Configuration.MONTH.MARET:
                        return 3;
                    case Configuration.MONTH.APRIL:
                        return 4;
                    case Configuration.MONTH.MEI:
                        return 5;
                    case Configuration.MONTH.JUNI:
                        return 6;
                    case Configuration.MONTH.JULI:
                        return 7;
                    case Configuration.MONTH.AGUSTUS:
                        return 8;
                    case Configuration.MONTH.SEPTEMBER:
                        return 9;
                    case Configuration.MONTH.OKTOBER:
                        return 10;
                    case Configuration.MONTH.NOVEMBER:
                        return 11;
                    case Configuration.MONTH.DESEMBER:
                        return 12;
                    default:
                        throw new Exception("DEV: ERROR in GetMonth(Januari-Desember)");
                }
            }
        }

        public static int GetYear(string txtPeriod)
        {
            // From OCT/2013 => 2013
            return ParseToInteger(txtPeriod.Substring(txtPeriod.IndexOf("/") + 1));

        }

        public static ArrayList GetPeriod(int intCOunt)
        {
            ArrayList retList = new ArrayList();

            int intMonth = DateTime.Now.Month;
            int intYear = DateTime.Now.Year;

            for (int i = 0; i <= intCOunt; i++)
            {
                if (intMonth == 0)
                {
                    // Jika Mundur sampai tahun lalu
                    // Jika intmonth sampai 0, maka intmonth tambah 12, supaya kembali ke desember lagi, dan intyear dikuraing 1 (tahun).
                    intMonth = intMonth + 12;
                    intYear = intYear - 1;
                }
                string szString = GetMonthName(intMonth, true).ToString().Trim() + "/" + intYear.ToString().Trim();
                retList.Add(szString);

                intMonth -= 1;
            }

            return retList;
        }

        //Get the first day of the month
        public static DateTime FirstDayOfMonth(DateTime sourceDate)
        {
            return new DateTime(sourceDate.Year, sourceDate.Month, 1);
        }

        //Get the last day of the month
        public static DateTime LastDayOfMonth(DateTime sourceDate)
        {
            DateTime lastDay = new DateTime(sourceDate.Year, sourceDate.Month, 1);
            return lastDay.AddMonths(1).AddDays(-1);
        }

        //Menghitung hari diantara 2 tanggal.
        public static int CalculateDaysBetweenDate(DateTime endTime, DateTime startTime)
        {
            TimeSpan span = endTime.Subtract(startTime);

            return span.Days;
        }

        //Rubah ke Format Oracle dd-MMM-yyyy
        public static string DateOracleFormat(DateTime pDate)
        {
            string strTgl = null;
            string strBulan = "";
            string strTahun = null;
            strTgl = String.Format(pDate.ToString(), "dd");
            strTahun = String.Format(pDate.ToString(), "yyyy");
            switch (String.Format(pDate.ToString(), "MM"))
            {
                case "01":
                    strBulan = "JAN";
                    break;
                case "02":
                    strBulan = "FEB";
                    break;
                case "03":
                    strBulan = "MAR";
                    break;
                case "04":
                    strBulan = "APR";
                    break;
                case "05":
                    strBulan = "MAY";
                    break;
                case "06":
                    strBulan = "JUN";
                    break;
                case "07":
                    strBulan = "JUL";
                    break;
                case "08":
                    strBulan = "AUG";
                    break;
                case "09":
                    strBulan = "SEP";
                    break;
                case "10":
                    strBulan = "OCT";
                    break;
                case "11":
                    strBulan = "NOV";
                    break;
                case "12":
                    strBulan = "DEC";
                    break;
            }
            return strTgl + "-" + strBulan + "-" + strTahun;
        }

        // Get Date and minutes
        public static string GetFormatHour(DateTime pDate, bool bitWithSecond)
        {

            string strHour = null;
            string strMinutes = null;
            string strSecond = null;

            strHour = String.Format(pDate.ToString(), "hh");
            strMinutes = String.Format(pDate.ToString(), "mm");
            strSecond = String.Format(pDate.ToString(), "ss");

            if (bitWithSecond)
            {
                return strHour + ":" + strMinutes + ":" + strSecond;
            }
            else
            {
                return strHour + ":" + strMinutes;
            }
        }

        //Rubah ke Format Oracle dd-MMM-yyyy hh:mm
        public static string DateOracleFormatWithHour(DateTime pDate)
        {
            string strTgl = null;
            string strBulan = "";
            string strTahun = null;
            string strHour = null;
            string strMinutes = null;
            string strAMPM = null;

            strHour = String.Format(pDate.ToString(), "hh");
            strMinutes = String.Format(pDate.ToString(), "mm");
            strTgl = String.Format(pDate.ToString(), "dd");
            strTahun = String.Format(pDate.ToString(), "yyyy");
            strAMPM = String.Format(pDate.ToString(), "tt");
            switch (String.Format(pDate.ToString(), "MM"))
            {
                case "01":
                    strBulan = "JAN";
                    break;
                case "02":
                    strBulan = "FEB";
                    break;
                case "03":
                    strBulan = "MAR";
                    break;
                case "04":
                    strBulan = "APR";
                    break;
                case "05":
                    strBulan = "MAY";
                    break;
                case "06":
                    strBulan = "JUN";
                    break;
                case "07":
                    strBulan = "JUL";
                    break;
                case "08":
                    strBulan = "AUG";
                    break;
                case "09":
                    strBulan = "SEP";
                    break;
                case "10":
                    strBulan = "OCT";
                    break;
                case "11":
                    strBulan = "NOV";
                    break;
                case "12":
                    strBulan = "DEC";
                    break;
            }
            return strTgl + "-" + strBulan + "-" + strTahun + " " + strHour + ":" + strMinutes + " " + strAMPM;
        }

        //Rubah ke Format Oracle dd/MMM/yyyy hh:mm:ss AM
        public static string DateOracleFormatWithHourSecond(DateTime pDate)
        {
            string strTgl = null;
            string strBulan = "";
            string strTahun = null;
            string strHour = null;
            string strMinutes = null;
            string strAMPM = null;
            string strSecond = null;

            strHour = String.Format(pDate.ToString(), "hh");
            strMinutes = String.Format(pDate.ToString(), "mm");
            strTgl = String.Format(pDate.ToString(), "dd");
            strTahun = String.Format(pDate.ToString(), "yyyy");
            strAMPM = String.Format(pDate.ToString(), "tt");
            strSecond = String.Format(pDate.ToString(), "ss");
            switch (String.Format(pDate.ToString(), "MM"))
            {
                case "01":
                    strBulan = "JAN";
                    break;
                case "02":
                    strBulan = "FEB";
                    break;
                case "03":
                    strBulan = "MAR";
                    break;
                case "04":
                    strBulan = "APR";
                    break;
                case "05":
                    strBulan = "MAY";
                    break;
                case "06":
                    strBulan = "JUN";
                    break;
                case "07":
                    strBulan = "JUL";
                    break;
                case "08":
                    strBulan = "AUG";
                    break;
                case "09":
                    strBulan = "SEP";
                    break;
                case "10":
                    strBulan = "OCT";
                    break;
                case "11":
                    strBulan = "NOV";
                    break;
                case "12":
                    strBulan = "DEC";
                    break;
            }
            return strTgl + "/" + strBulan + "/" + strTahun + " " + strHour + ":" + strMinutes + ":" + strSecond + " " + strAMPM;
        }

        //Rubah ke Format Oracle DD-MON-RR
        public static string DateOracleFormat2(DateTime pDate)
        {
            string strTgl = null;
            string strBulan = "";
            string strTahun = null;
            strTgl = String.Format(pDate.ToString(), "dd");
            strTahun = String.Format(pDate.ToString(), "yy");
            switch (String.Format(pDate.ToString(), "MM"))
            {
                case "01":
                    strBulan = "JAN";
                    break;
                case "02":
                    strBulan = "FEB";
                    break;
                case "03":
                    strBulan = "MAR";
                    break;
                case "04":
                    strBulan = "APR";
                    break;
                case "05":
                    strBulan = "MAY";
                    break;
                case "06":
                    strBulan = "JUN";
                    break;
                case "07":
                    strBulan = "JUL";
                    break;
                case "08":
                    strBulan = "AUG";
                    break;
                case "09":
                    strBulan = "SEP";
                    break;
                case "10":
                    strBulan = "OCT";
                    break;
                case "11":
                    strBulan = "NOV";
                    break;
                case "12":
                    strBulan = "DEC";
                    break;
            }
            return strTgl + "-" + strBulan + "-" + strTahun;
        }

        //Rubah ke Format Oracle yyyy/MM/dd hh:mm:ss 
        public static string DateOracleFormat_FND_STANDART_DATE(DateTime pDate)
        {
            string strTgl = null;
            string strBulan = "";
            string strTahun = null;
            string strHour = null;
            string strMinutes = null;
            string strAMPM = null;
            string strSecond = null;

            strHour = String.Format(pDate.ToString(), "hh");
            strMinutes = String.Format(pDate.ToString(), "mm");
            strTgl = String.Format(pDate.ToString(), "dd");
            strTahun = String.Format(pDate.ToString(), "yyyy");
            strAMPM = String.Format(pDate.ToString(), "tt");
            strSecond = String.Format(pDate.ToString(), "ss");
            strBulan = String.Format(pDate.ToString(), "MM");

            return strTahun + "/" + strBulan + "/" + strTgl + " " + strHour + ":" + strMinutes + ":" + strSecond;
        }

        //Check If [Date From] is bigger than [Date To]
        public static bool CheckIfDateFromBiggerThanTo(DateTime fromDate, DateTime toDate)
        {
            if (fromDate > toDate)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //Get Oracle Period
        public static string GetOracleGLPeriod(System.DateTime dtDate)
        {
            switch (dtDate.Month)
            {
                case 1:
                    return "JAN-" + String.Format(dtDate.ToString(), "yy");
                case 2:
                    return "FEB-" + String.Format(dtDate.ToString(), "yy");
                case 3:
                    return "MAR-" + String.Format(dtDate.ToString(), "yy");
                case 4:
                    return "APR-" + String.Format(dtDate.ToString(), "yy");
                case 5:
                    return "MAY-" + String.Format(dtDate.ToString(), "yy");
                case 6:
                    return "JUN-" + String.Format(dtDate.ToString(), "yy");
                case 7:
                    return "JUL-" + String.Format(dtDate.ToString(), "yy");
                case 8:
                    return "AUG-" + String.Format(dtDate.ToString(), "yy");
                case 9:
                    return "SEP-" + String.Format(dtDate.ToString(), "yy");
                case 10:
                    return "OCT-" + String.Format(dtDate.ToString(), "yy");
                case 11:
                    return "NOV-" + String.Format(dtDate.ToString(), "yy");
                case 12:
                    return "DEC-" + String.Format(dtDate.ToString(), "yy");
                default:
                    throw new Exception("DEV: Out of range Month Oracle Period.");
            }
        }


        #region "Data Reader"

        public static string DataReaderGetString(object obj)
        {
            if (obj == null)
            {
                return string.Empty;
            }
            else if (obj.Equals(DBNull.Value))
            {
                return string.Empty;
            }
            else
            {
                return obj.ToString();
            }
        }

        public static string DataReaderGetStringTryCatch(object obj)
        {
            try
            {
                if (obj == null)
                {
                    return string.Empty;
                }
                else if (obj.Equals(DBNull.Value))
                {
                    return string.Empty;
                }
                else
                {
                    return obj.ToString();
                }
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }

        public static decimal DataReaderGetDecimal(object obj)
        {
            if (obj == null)
            {
                return decimal.Zero;
            }
            else if (obj.Equals(DBNull.Value))
            {
                return decimal.Zero;
            }
            else
            {
                try { return decimal.Parse(obj.ToString()); } catch { return decimal.Zero; }

            }
        }

        public static int DataReaderGetInteger(object obj)
        {
            if (obj == null)
            {
                return 0;
            }
            else if (obj.Equals(DBNull.Value))
            {
                return 0;
            }
            else
            {
                return int.Parse(obj.ToString());
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

        #endregion

        #region "Math"

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


        public static decimal ParseToDecimal(object obj)
        {
            return ParseToDecimal(obj, 0, string.Empty, string.Empty);
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

        public static DateTime ParseToDateTime(object obj)
        {
            try
            {
                if (obj == null)
                {
                    return Configuration.DATE_MINVALUE;
                }
                else
                {
                    return DateTime.Parse(obj.ToString());

                }
            }
            catch (Exception ex)
            {
                return Configuration.DATE_MINVALUE;
            }
        }

        public static DateTime ParseToDateTimeTo(object obj)
        {
            try
            {
                if (obj == null)
                {
                    return Configuration.DATE_MAXVALUE;
                }
                else
                {
                    return DateTime.Parse(obj.ToString());

                }
            }
            catch (Exception ex)
            {
                return Configuration.DATE_MAXVALUE;
            }
        }

        public static string ParseToFormatNumber(object obj, int intCount)
        {
            return ParseToFormatNumber(obj, intCount, "1", "2");
        }

        public static string ParseToFormatNumber(object obj, int intCount, string txtCurrencyRounding, string txtCurrencyID)
        {
            if (obj == null)
            {
                return decimal.Zero.ToString();
            }
            else
            {
                try
                {
                    if (txtCurrencyID.Equals(string.Empty) | txtCurrencyRounding.Equals(string.Empty))
                    {
                        //Jika salah satu parameternya adalah kosong.
                        return obj.ToString(); // String.FormatNumber(obj, 0);
                    }

                    if (txtCurrencyID.ToLower().Equals(txtCurrencyRounding.ToLower()))
                    {
                        //Jika matauang yang dipilih adalah matauang yang dibulatkan. 
                        return obj.ToString(); //String.FormatNumber(obj, 0);
                    }
                    else
                    {
                        return obj.ToString(); //String.FormatNumber(obj, intCount);
                    }

                }
                catch (Exception ex)
                {
                    return decimal.Zero.ToString();
                }
            }
        }

        public static string ParseToString(object obj)
        {
            if (obj == null)
            {
                return string.Empty;
            }
            else
            {
                try
                {
                    return obj.ToString().Trim();
                }
                catch (Exception ex)
                {
                    return string.Empty;
                }
            }
        }
        #endregion
        public static bool CheckFileType(string txtFileName, string txtExtAllowed)
        {
            if (txtExtAllowed.Equals(string.Empty))
            {
                // By Default, jika kosong.boleh semua.
                return true;
            }

            string ext = Path.GetExtension(txtFileName);
            // Check jika ext (.jpg) ada dalam format (jpg,gif,mp3,doc,docx)
            if (txtExtAllowed.ToLower().Contains(ext.ToLower().Replace(".", "")))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool CheckFileSize(int intFileSize, int intMaxFileSizeAllowed)
        {
            if (intMaxFileSizeAllowed == 0)
            {
                // By default. jika kosong. boleh.
                return true;
            }
            //checking file size    
            //  intFileSize in byte, so parse to kb
            decimal fileinKB = intFileSize / 1024;
            if (fileinKB > intMaxFileSizeAllowed)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        public static bool CheckFileSizeSmall(int intFileSize, int intMinFileSizeAllowed)
        {
            if (intMinFileSizeAllowed == 0)
            {
                // By default. jika kosong. boleh.
                return true;
            }
            //checking file size    
            //  intFileSize in byte, so parse to kb
            decimal fileinKB = intFileSize / 1024;
            if (fileinKB < intMinFileSizeAllowed)
            {
                return false;
            }
            else
            {
                return true;
            }
        }


        #region "Print HTML"
        public static object PrintWarningItem(string warn)
        {
            return "<li>" + warn + "</li>";
        }
        public static object PrintWarningError(string message)
        {
            return "<ul class='textred'>" + message + "</ul>";
        }
        public static object PrintWarningSuccess(string message)
        {
            return "<ul class='textblue'>" + message + "</ul>";
        }
        public static object PrintDivWarning(string message)
        {
            return "<div class='contentsectionbig warning'>" + message + "</div>";
        }
        public static object PrintWarning(string message)
        {
            return "<span class='warning'>" + message + "</span>";
        }
        #endregion

    }

}
