using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Constant
{
    public static class Configuration
    {
        public const string MODULE_NAME = "MAIN";
        public const string Administrator = "Administrator";
        public const string MESSAGE = "MESSAGE";
        public const string TOKEN_API = "Sanghiang";
        public const string FormatDate = "yyyy/MM/dd";

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
