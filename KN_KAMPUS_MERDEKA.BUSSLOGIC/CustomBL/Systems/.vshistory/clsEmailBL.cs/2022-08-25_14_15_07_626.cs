
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.BUSSLOGIC.CustomBL.Systems
{
    public static class clsEmailBL
    {
        public static bool SendEmail(string txtBody, string txtEmailSender, string txtEmailSubject, string txtEmailTo, string txtJoinString, KampusMerdekaEntities dObjContext, DbContextTransaction dObjTran)
        {
            try
            {
                if (txtEmailSender.Equals(string.Empty) | txtEmailTo.Equals(string.Empty))
                {
                    return false;
                }

                //Debug Email.
                TrDebugEmail DebugDat = new TrDebugEmail();

                MailMessage objMM = new MailMessage(txtEmailSender, txtEmailSender);
                objMM.To.Clear();


                if (!String.IsNullOrEmpty(txtEmailTo))
                {
                    String[] EmailTo = txtEmailTo.ToString().Split(char.Parse(txtJoinString));
                    int i = 0;
                    foreach (String To in EmailTo)
                    {
                        if (i == 0)
                        {
                            objMM.To.Add(To.Trim());
                            DebugDat.txtTo = To.Trim();
                        }
                        else
                        {
                            objMM.CC.Add(To.Trim());
                            DebugDat.txtCC = To.Trim() + txtJoinString;
                        }
                        i = +1;
                    }

                    objMM.Subject = txtEmailSubject;
                    objMM.Priority = MailPriority.Normal;
                    objMM.IsBodyHtml = true;
                    objMM.Body = txtBody;
                    //Dim client As New System.Net.Mail.SmtpClient(New Common.clsSystemConfiguration().SmtpClient)
                    SmtpClient client = new SmtpClient(mSystemConfigurationCustomBL.GetmSystemConfigurationValue(clsMMainConstant.MODULE_NAME, clsMMainConstant.CONFIGURATION.Key.SMTP, clsMMainConstant.CONFIGURATION.DefaultValue.DefaultLangID, dObjContext, dObjTran));

                    client.Credentials = CredentialCache.DefaultNetworkCredentials;
                    client.Send(objMM);
                    objMM.Dispose();

                    GC.Collect();

                    //Debug Email
                    DebugDat.txtSubject = txtEmailSubject;
                    DebugDat.txtPriority = MailPriority.Normal.ToString();
                    DebugDat.bitIsBodyHTML = 1;
                    DebugDat.txtBody = txtBody;

                    //Setelah berhasil ngirim email.
                    //Masukin ke TrDebugEmail.
                    if (mSystemConfigurationCustomBL.GetmSystemConfigurationBoolean(clsMMainConstant.MODULE_NAME, clsMMainConstant.CONFIGURATION.Key.bDebugEmail, clsMMainConstant.CONFIGURATION.DefaultValue.DefaultLangID, dObjContext, dObjTran))
                    {
                        clsTrDebugEmailBL.SaveTrDebugEmail(DebugDat, string.Empty, clsMMainConstant.CONFIGURATION.DefaultValue.DefaultLangID, Guid.NewGuid().ToString(), dObjContext, dObjTran);
                    }
                }
            }
            catch (Exception exx)
            {
                clsMMainCustomBL.SendEmailError(exx, "", clsMMainConstant.CONFIGURATION.DefaultValue.DefaultLangID, "", mUserCustomBL.CreateBlankmUser(), dObjContext, dObjTran);
                //Throw exx
                return false;
            }

            return true;
        }
    }
}
