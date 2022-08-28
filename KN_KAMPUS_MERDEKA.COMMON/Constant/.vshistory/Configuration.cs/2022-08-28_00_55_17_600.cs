using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Constant
{
    public class Configuration
    {
        public static string CompanyName = "PT Sanghiang Perkasa";
        public static string Delimeter = " :: ";
        public static string Delimeter_Underscore = "_";
        public static string Delimeter_Des = "-";
        public static string Delimeter_Slash = "/";

        public static string txtFormatDate = "yyyy/MM/dd";
        public static string txtFormatDateMMDDYYYY = "MM/dd/yyyy";
        public static string txtMoneyFormatKoma = "##,##.#0";
        public static DateTime DATE_MINVALUE = DateTime.Parse("1/1/2000");

        public static DateTime DATE_MAXVALUE = DateTime.Parse("1/1/4000");

        public static string MODULE_NAME_GLOBAL = "GLOBAL";
        public const string APP_NAME = "KAMPUS_MERDEKA";
        public const string MODULE_NAME = "MAIN";
        public const string Administrator = "Administrator";
        public const string MESSAGE = "MESSAGE";
        public const string TOKEN_API = "Sanghiang";
        public const string FormatDate = "yyyy/MM/dd";
        public const string SESSION_NAME = "usersession";

        public class Key
        {
            public const string SHOW_STACKTRACE = "Show Stack Trace";
            public const string ExceptionPublisherEmailSender = "Exception Sender";
            public const string ExceptionPublisherEmailSubject = "Exception Subjet";
            public const string SenderEmail = "Sender Email";
            public const string JoinString = "JoinString";
            public const string SEND_ERROREMAIL = "Send Email Error";
            public const string DefaultLangID = "DefaultLangID";
            public const string bDebugEmail = "Debug Email";
            public const string SMTP = "SMTP";
            public const string Generate_Random_Parameter = "Generate Random Parameter";
            public const string byPassLogin = "byPassLogin";
            public const string DOMAIN = "DOMAIN";
            public const string DefaultPassword = "Default Password";
        }

        public class Description
        {
            public const string SHOW_STACKTRACE = "Show Stack Trace";
            public const string ExceptionPublisherEmailSender = "Exception Sender";
            public const string ExceptionPublisherEmailSubject = "Exception Subjet";
            public const string SenderEmail = "Sender Email";
            public const string JoinString = "JoinString";
            public const string SEND_ERROREMAIL = "Send Email Error";
            public const string DefaultLangID = "DefaultLangID";
            public const string bDebugEmail = "Debug Email";
            public const string SMTP = "SMTP";
            public const string Generate_Random_Parameter = "Generate Random Parameter";
            public const string byPassLogin = "byPassLogin";
            public const string DOMAIN = "DOMAIN";
            public const string DefaultPassword = "Default Password";
        }

        public class DefaultValue
        {
            public const string SHOW_STACKTRACE = "N";
            public const string ExceptionPublisherEmailSender = "no-reply@kalbenutritionals.com";
            public const string ExceptionPublisherEmailSubject = "TEMPLATE:ERROR";
            public const string SenderEmail = "asep.sopiyan@kalbenutritionals.com";
            public const string JoinString = ";";
            public const string SEND_ERROREMAIL = "Y";
            public const string DefaultLangID = "IN";
            public const string bDebugEmail = "Y";
            public const string SMTP = "172.31.254.246";
            public const string Generate_Random_Parameter = "12345";
            public const string byPassLogin = "N";
            public const string DOMAIN = "ONEKALBE.DOM";
            public const string DefaultPassword = "sanghiang";
        }

        public class LANGUAGE
        {
            public static string BTN_SAVE = "B0001";
            public static string BTN_UPDATE = "B0002";
            public static string BTN_DELETE = "B0003";
            public static string BTN_NEW = "B0004";
            public static string BTN_COPY = "B0005";
            public static string BTN_SUBMIT = "B0006";
            public static string BTN_RESUBMIT = "B0007";
            public static string BTN_PRINT = "B0008";
            public static string BTN_VIEWLOG = "B0009";
            public static string BTN_VIEWOUTPUT = "B0010";

            public static string BTN_CLOSE = "B0011";
            public static string MSG_INSERT_DATA = "M0001";
            public static string MSG_UPDATE_DATA = "M0002";
            public static string MSG_INSERT_TRANSACTION = "M0003";
            public static string MSG_UPDATE_TRANSACTION = "M0004";
            public static string MSG_APPLY_TRANSACTION = "M0005";
            public static string MSG_DELETE_DATA = "M0006";
            public static string MSG_DELETE_TRANSACTION = "M0007";
            public static string MSG_SUCCESS_APPROVE_TRANSACTION = "M0008";

            public static string MSG_SUCCESS_REJECT_TRANSACTION = "M0009";
            public static string ERR_ID_EMPTY = "E0001";
            public static string ERR_EMPLOYEE_NOTFOUND = "E0002";
            public static string ERR_APPLY_TRANSACTION = "E0003";
            public static string ERR_DATA_NOT_FOUND = "E0004";
            public static string ERR_TRANSACTION_NOTFOUND = "E0005";
            public static string ERR_APPROVE_TRANSACTION = "E0006";
            public static string ERR_REJECTED_TRANSACTION = "E0007";
            public static string ERR_CONFIGURATION_NOTFOUND = "E0008";
            public static string ERR_ITEM_ISEMPTY = "E0009";
            public static string ERR_DOC_ID_EMPTY = "E0010";
            public static string ERR_ITEM_DUPLICATE = "E0011";
            public static string ERR_EMPLOYEE_EMPTY = "E0012";
            public static string ERR_DATA_ALREADY_EXIST = "E0013";
            public static string ERR_NAME_ALREADY_EXIST = "E0014";
            public static string ERR_PRINT_ERROR = "E0015";
            public static string ERR_PRINT_INPROSES = "E0016";
            public static string ERR_MODULE_ACCESS_NOT = "E0017";
            public static string ERR_INTERFACE_EXCHANGE_NOTFOUND = "E0018";
            public static string ERR_FILE_NOT_READY = "E0019";
            public static string ERR_MAPPINGDEPARTMENT_NOTFOUND = "E0020";
            public static string ERR_CUTOFFDATE_NOT_FOUND = "E0021";
            public static string ERR_NO_DOCUMENT = "E0022";
            public static string ERR_SUPERVISOR_NOTFOUND = "E0023";
            public static string ERR_EMAIL_EMPTY = "E0024";
            public static string ERR_EMAIL_INVALID = "E0025";
            public static string ERR_NAME_EMPTY = "E0026";
            public static string ERR_REASON_EMPTY = "E0027";
            public static string ERR_NIK_EMPTY = "E0028";
            public static string ERR_FILETYPE_NOTALLOWED = "E0029";
            public static string ERR_FILESIZE_TOLARGE = "E0030";
            public static string ERR_USERNAME_PASSWORD_INVALID = "E0031";
            public static string ERR_ORACLE_GLDATE_NOT_OPENED = "E0032";
            public static string ERR_API_INVALIDTOKEN = "E0033";
            public static string ERR_API_INVALIDREQUEST = "E0034";
            public static string ERR_BRANCH_ACCESSDENIED = "E0035";
            public static string ERR_DATEEND_THAN_DATESTART = "E0036";
            public static string ERR_BRANCH_DUPLICATE = "E0037";

            public static string ERR_EMAIL_DUPLICATE = "E0038";
            public static string LBL_AMOUNT = "L0001";
        }
        public class DAYNAME
        {
            public const string MONDAY = "MONDAY";
            public const string TUESDAY = "TUESDAY";
            public const string WEDNESDAY = "WEDNESDAY";
            public const string THURSDAY = "THURSDAY";
            public const string FRIDAY = "FRIDAY";
            public const string SATURDAY = "SATURDAY";
            public const string SUNDAY = "SUNDAY";
        }

        public class DAYNAME_INDO
        {
            public const string MONDAY = "SENIN";
            public const string TUESDAY = "SELASA";
            public const string WEDNESDAY = "RABU";
            public const string THURSDAY = "KAMIS";
            public const string FRIDAY = "JUMAT";
            public const string SATURDAY = "SABTU";
            public const string SUNDAY = "MINGGU";
        }
        public class MONTH
        {
            public const string JANUARI = "JANUARI";
            public const string FEBRUARI = "FEBRUARI";
            public const string MARET = "MARET";
            public const string APRIL = "APRIL";
            public const string MEI = "MEI";
            public const string JUNI = "JUNI";
            public const string JULI = "JULI";
            public const string AGUSTUS = "AGUSTUS";
            public const string SEPTEMBER = "SEPTEMBER";
            public const string OKTOBER = "OKTOBER";
            public const string NOVEMBER = "NOVEMBER";
            public const string DESEMBER = "DESEMBER";
        }

        public class MONTH_SHORT
        {
            public const string JANUARI = "JAN";
            public const string FEBRUARI = "FEB";
            public const string MARET = "MAR";
            public const string APRIL = "APR";
            public const string MEI = "MEI";
            public const string JUNI = "JUN";
            public const string JULI = "JUL";
            public const string AGUSTUS = "AGU";
            public const string SEPTEMBER = "SEP";
            public const string OKTOBER = "OKT";
            public const string NOVEMBER = "NOV";
            public const string DESEMBER = "DES";
        }
    }
}
