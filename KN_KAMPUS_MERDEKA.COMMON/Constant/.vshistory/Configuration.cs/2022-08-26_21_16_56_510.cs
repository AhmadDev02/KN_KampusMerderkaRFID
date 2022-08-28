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
        public static string AppName = "E-RPS 1.0";
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
    }
}
