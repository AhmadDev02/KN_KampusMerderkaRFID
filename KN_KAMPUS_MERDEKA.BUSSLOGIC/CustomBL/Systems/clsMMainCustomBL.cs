using KN_KAMPUS_MERDEKA.COMMON.Constant;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using KN_KAMPUS_MERDEKA.COMMON.Library;
using KN_KAMPUS_MERDEKA.DAL.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems
{
    public static class clsMMainCustomBL
    {
        public static void CreateError(Exception execpt, string txtUserID, string txtLangId, string txtUrl, mUser userDat)
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                dObjTran = dObjContext.Database.BeginTransaction();
                CreateError(execpt, txtUserID, txtLangId, txtUrl, userDat, dObjContext, dObjTran);
                dObjTran.Commit();
            }
            catch (Exception ex)
            {
                dObjTran.Rollback();
                throw ex;
            }
            finally
            {
                dObjContext.Dispose();
            }
        }

        public static void CreateError(Exception execpt, string txtUserID, string txtLangId, string txtUrl, mUser userDat, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            if (mSystemConfigurationCustomBL.GetmSystemConfigurationBoolean(Configuration.MODULE_NAME, Configuration.Key.SEND_ERROREMAIL, txtLangId, dObjContext, dObjTran) == true)
            {
                SendEmailError(execpt, txtUserID, txtLangId, txtUrl, userDat, dObjContext, dObjTran);
            }

        }

        public static bool SendEmailError(Exception execpt, string txtUserID, string txtLangId, string txtUrl, mUser userDat, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            string txtSmtpClient = mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.SMTP, txtLangId, dObjContext, dObjTran);
            string txtExceptionPublisherEmailSubject = mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.ExceptionPublisherEmailSubject, txtLangId, dObjContext, dObjTran);
            string txtExceptionPublisherEmailSender = mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.ExceptionPublisherEmailSender, txtLangId, dObjContext, dObjTran);
            string txtSenderEmail = mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.SenderEmail, txtLangId, dObjContext, dObjTran);
            char txtJoinString = char.Parse(mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.JoinString, txtLangId, dObjContext, dObjTran).Substring(0, 1));

            if (!execpt.Message.ToString().ToLower().Contains(".js") && !execpt.Message.ToString().ToLower().Contains(".css") && !execpt.Message.ToString().ToLower().Contains("virtualpath"))
            {
                if (!execpt.Message.ToString().Contains("File does not execptist.") & !execpt.Message.ToString().Contains("!"))
                {
                    // Create StringBuilder to maintain publishing information.
                    StringBuilder strInfo = new StringBuilder();
                    // Record General information.
                    strInfo.AppendFormat(" {1}{0}", "<br />", execpt.Message.ToString());
                    strInfo.AppendFormat("{0}General Information{0}", "<br />");
                    strInfo.AppendFormat("{0}Additonal Info:", "<br />");
                    strInfo.AppendFormat("{0}Date Time: {1}", "<br />", DateTime.Now.Date.ToString("dd/MM/yyyy"));
                    strInfo.AppendFormat("{0}Current URL : {1}", "<br />", txtUrl);
                    strInfo.AppendFormat("{0}execptception Source : {1}", "<br />", execpt.Source);
                    // Append the execptception texecptt
                    strInfo.AppendFormat("{0}{0}execptception Information{0}{0}{1}", "<br />", execpt.ToString());

                    // Append User Login information
                    if (userDat != null)
                    {
                        strInfo.AppendFormat("{0}{0}User Login Information{0}{0}{1}{2}", "<br />", "User ID : ", userDat.txtUserName + " - " + userDat.txtEmpID);
                    }

                    string subject = txtExceptionPublisherEmailSubject;
                    string body = strInfo.ToString();

                    System.Net.Mail.MailMessage objMM = new System.Net.Mail.MailMessage(txtExceptionPublisherEmailSender, txtExceptionPublisherEmailSender);
                    objMM.To.Clear();
                    String txtemailTo = txtSenderEmail;
                    if (!String.IsNullOrEmpty(txtemailTo))
                    {
                        String[] EmailTo = txtemailTo.ToString().Split(txtJoinString);
                        int i = 0;
                        foreach (String To in EmailTo)
                        {
                            if (i == 0)
                            {
                                objMM.To.Add(To.Trim());
                            }
                            else
                            {
                                objMM.CC.Add(To.Trim());
                            }
                            i = +1;
                        }
                        objMM.Subject = subject;
                        objMM.Priority = System.Net.Mail.MailPriority.Normal;
                        objMM.IsBodyHtml = true;
                        objMM.Body = body;
                        //Dim client As New System.Net.Mail.SmtpClient()
                        System.Net.Mail.SmtpClient client = new System.Net.Mail.SmtpClient(txtSmtpClient);
                        client.Credentials = System.Net.CredentialCache.DefaultNetworkCredentials;
                        client.Send(objMM);
                        objMM.Dispose();
                        GC.Collect();

                    }
                }
            }
            return true;
        }
        public static string generateParameter()
        {
            KampusMerdekaEntities dObjContext = null;
            DbContextTransaction dObjTran = null;
            try
            {
                dObjContext = new KampusMerdekaEntities(EFClientUtility.GetConnectionString());
                return generateParameter(dObjContext, dObjTran);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dObjContext != null)
                {
                    dObjContext.Dispose();
                }

            }
        }

        public static string generateParameter(KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            return DateTime.Now.ToString("yyyyMMdd") + mSystemConfigurationCustomBL.GetmSystemConfigurationValue(Configuration.MODULE_NAME, Configuration.Key.Generate_Random_Parameter, Configuration.DefaultValue.DefaultLangID, dObjContext, dObjTran);
        }


    }
}
