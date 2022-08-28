using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Library
{
    public class clsActiveDirectory
    {
        public string gstrUserDC;
        public string gstrPasswordDC;
        public string GetUserName(string strLoginName = "", string strDomainName = "")
        {

            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            //
            //    The GetUserName function returns the users Full Name from the active directory
            //
            //    If optional parameters are left blank this function will use 
            //    the current users login in name and domain name
            //    
            //    Pass parameter information when retrieving someone elses name or using a different domain
            //
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            DirectoryEntry dsDirectoryEntry = default(DirectoryEntry);
            string strPath = null;
            string strDomain = null;
            string strLogin = null;
            string strFullName = null;

            //Get domain name

            if (string.IsNullOrEmpty(strDomainName))
            {
                //Parameter left blank
                strDomain = "";// GetDomainName();
            }
            else
            {
                //Domain name passed as parameter
                strDomain = strDomainName;
            }

            //Get user's login name

            if (string.IsNullOrEmpty(strLoginName))
            {
                //Parameter left blank
                strLogin = GetLoginName();
            }
            else
            {
                //Login passed as parameter
                strLogin = strLoginName;
            }

            //Concatenate string
            //Unknown error when trying to use LADP instead of WinNT
            strPath = "WinNT://" + strDomain + "/" + strLogin;

            try
            {
                dsDirectoryEntry = new DirectoryEntry(strPath);
                strFullName = Convert.ToString(dsDirectoryEntry.Invoke("Get", "FullName"));

            }
            catch (Exception ex)
            {
                strFullName = "";

            }
            finally
            {
                dsDirectoryEntry.Close();
                dsDirectoryEntry.Dispose();

            }

            return strFullName;

        }

        public string GetUserFirstName(string strFullName = "")
        {

            //Takes the user's full name and splits it to return
            //just the first name

            //Its faster if you already stored the users full name
            //to just pass it as a parameter instead of running
            //the GetUserName function again.

            //But if you haven't already checked the full name
            //leave the parameter blank and this sub will check it

            if (strFullName.Equals(string.Empty))
                strFullName = GetUserName();

            //Check for a blank space splitting the names
            if (strFullName.IndexOf(" ") >= 0)
            {
                //Return first name
                return strFullName.Substring(0, strFullName.IndexOf(" ")).Trim();
            }
            else
            {
                //No space, return strFullName
                return strFullName;
            }

        }

        public string GetUserLastName(string strFullName = "")
        {

            //Takes the user's full name and splits it to return
            //just the users last name

            //Its faster if you already stored the users full name
            //to just pass it as a parameter instead of running
            //the GetUserName function again.

            //But if you haven't already checked the full name
            //leave the parameter blank and this sub will get it

            if (string.IsNullOrEmpty(strFullName))
                strFullName = GetUserName();

            //Check for a blank space splitting the names
            if (strFullName.IndexOf(" ") >= 0)
            {
                //Return first name
                return strFullName.Substring(strFullName.IndexOf(" ") + 1);
            }
            else
            {
                //No space, return strFullName
                return strFullName;
            }

        }

        public string GetLoginName()
        {

            //Returns the users Login name
            return System.Environment.UserName;

        }

        //public string GetDomainName()
        //{

        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //    //
        //    //    Returns the users domain name
        //    //
        //    //    System functions that return the domain name:
        //    //
        //    //    01.   Environment.UserDomainName
        //    //                -   Return System.Environment.UserDomainName
        //    //
        //    //    02.   SystemInformation.UserDomainName 
        //    //                -   Return SystemInformation.UserDomainName
        //    //
        //    //    Reported Bug while using the above functions:
        //    //
        //    //    If the UserName exists in the local SAM
        //    //    then the UserDomain will return the ComputerName instead of the DomainName
        //    //    even while the user is logged into a domain account
        //    //
        //    //    Example:
        //    //
        //    //    DomainName\UserName logged on LocalComputer 
        //    //    will return LocalComputerName for a DomainName
        //    //    if the username exists both in the domain and locally on the computer
        //    //
        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //    string strDomain = null;

        //    //Returns domain name and username
        //    strDomain = System.Security.Principal.WindowsIdentity.GetCurrent.Name;

        //    //Extract domain name from full login
        //    strDomain = Strings.Mid(strDomain, 1, Strings.InStr(strDomain, "\\") - 1);

        //    return strDomain;

        //}

        public string GetComputerName()
        {

            //Returns the name of the computer 
            return System.Environment.MachineName;

        }

        public bool AuthenticateUser(string strDomain, string strLoginName, string strPassword)
        {

            //Authenticates user name and password on the network
            //Returns true if authenticated, false if not authenticated

            bool blnAuthenticated = false;

            try
            {
                DirectoryEntry dsDirectoryEntry = new DirectoryEntry("LDAP://" + strDomain, strLoginName, strPassword);
                DirectorySearcher dsSearch = new DirectorySearcher(dsDirectoryEntry);
                SearchResult dsResults = default(SearchResult);

                //Tambahan dari Nosa. 28-05-2013
                dsSearch.Filter = string.Format("(sAMAccountName={0})", strLoginName);

                dsResults = dsSearch.FindOne();
                if ((dsResults != null))
                {
                    //User ditemukan.
                    blnAuthenticated = true;
                }
                else
                {
                    blnAuthenticated = false;
                }

            }
            catch (Exception ex)
            {
                //Exception is thrown if user login or password is invalid

                //MessageBox.Show(ex.Message)
                blnAuthenticated = false;

            }

            return blnAuthenticated;

        }

        //public string GetUserGroups(string strDomain, string strLoginName)
        //{

        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //    //
        //    //    Returns all the groups that a specific user belongs too
        //    //    Each group is on a seperate line in the string
        //    //
        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //    DirectoryEntry dsDirectoryEntry = new DirectoryEntry("LDAP://" + strDomain);
        //    DirectorySearcher dsSearcher = new DirectorySearcher(dsDirectoryEntry);

        //    byte bytCounter = 0;
        //    string strGroups = null;
        //    short shtEqualsIndex = 0;
        //    short shtCommaIndex = 0;
        //    StringBuilder sbUserGroups = new StringBuilder();

        //    dsSearcher.Filter = "saMAccountName=" + strLoginName;
        //    dsSearcher.PropertiesToLoad.Add("memberOf");

        //    try
        //    {
        //        SearchResult dsResult = dsSearcher.FindOne();

        //        if (dsResult == null)
        //        {
        //            //No results returned
        //            return null;
        //        }

        //        //Loop thru each of the groups returned
        //        for (bytCounter = 0; bytCounter <= (dsResult.Properties("memberOf").Count - 1); bytCounter++)
        //        {
        //            strGroups = Convert.ToString(dsResult.Properties("memberOf")(bytCounter));

        //            //Parse string and append the groups names into string builder

        //            //Get index of equals and comma
        //            shtEqualsIndex = (short) strGroups.IndexOf("=", 1);
        //            shtCommaIndex = (short) strGroups.IndexOf(",", 1);

        //            if (shtEqualsIndex == -1)
        //            {
        //                return null;
        //            }

        //            sbUserGroups.Append(strGroups.Substring((shtEqualsIndex + 1), (shtCommaIndex - shtEqualsIndex) - 1));
        //            sbUserGroups.Append(ControlChars.CrLf);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return "Error in GetUserGroups Function";
        //    }

        //    return sbUserGroups.ToString.Trim;

        //}

        //public object GetGroupUsers(string strGroupName)
        //{

        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //    //
        //    //    Returns all the users of a specific group
        //    //    Each user on seperate line in the string
        //    //    The group name being passed is not case sensitive
        //    //
        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //    DirectorySearcher dsDirectorySearcher = new DirectorySearcher();
        //    string strUsers = null;
        //    short shtEqualsIndex = 0;
        //    short shtCommaIndex = 0;
        //    StringBuilder sbGroupUsers = new StringBuilder();

        //    //Filter by group name
        //    var _with1 = dsDirectorySearcher;
        //    _with1.Filter = "sAMAccountName=" + strGroupName;
        //    _with1.PropertiesToLoad.Add("member");

        //    try
        //    {
        //        //Retrieve results
        //        SearchResult dsResult = _with1.FindOne;
        //        short shtCounter = 0;

        //        if (dsResult == null)
        //        {
        //            //No results returned
        //            return null;
        //        }

        //        for (shtCounter = 0; shtCounter <= dsResult.Properties("member").Count - 1; shtCounter++)
        //        {
        //            strUsers = dsResult.Properties("member")(shtCounter);

        //            //Get index of equals and comma
        //            shtEqualsIndex = strUsers.IndexOf("=", 1);
        //            shtCommaIndex = strUsers.IndexOf(",", 1);

        //            if (shtEqualsIndex == -1)
        //            {
        //                return null;
        //            }

        //            //Extract name from string and append to string builder
        //            sbGroupUsers.Append(strUsers.Substring((shtEqualsIndex + 1), (shtCommaIndex - shtEqualsIndex) - 1));
        //            sbGroupUsers.Append(ControlChars.CrLf);

        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return "Error in GetGroupUsers Function";

        //    }


        //    return sbGroupUsers.ToString;

        //}

        //public bool ValidateGroupUser(string strLoginName, string strGroupName)
        //{

        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //    //
        //    //    Checks to see if a specific user belongs to a specific group
        //    //    Returns True if user belongs to the group
        //    //    Returns False if user does not belong to the group
        //    //
        //    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //    string strUserName = null;
        //    string strGroupUsers = null;
        //    bool blnUserValidated = false;
        //    short shtResult = 0;

        //    //Group users will be listed by there full name
        //    //Convert login name to get users full name
        //    strUserName = GetUserName(strLoginName);

        //    //Return false if the login name is invalid
        //    if (string.IsNullOrEmpty(strUserName.Trim))
        //    {
        //        return blnUserValidated;
        //    }

        //    //Retrieve the list of users to the specified group
        //    strGroupUsers = GetGroupUsers(strGroupName);

        //    if (strGroupUsers == null)
        //    {
        //        return blnUserValidated;
        //    }

        //    //Search returned Group Users List to see if user is in it
        //    shtResult = strGroupUsers.IndexOf(strUserName);

        //    if (shtResult > -1)
        //    {
        //        //User found in group
        //        blnUserValidated = true;
        //    }
        //    else
        //    {
        //        //User not found in group
        //        blnUserValidated = false;
        //    }

        //    return blnUserValidated;

        //}
        //public string SetUserPassword(string Domain, string User, string NewPassword)
        //{

        //    DirectoryEntry oEntry = new DirectoryEntry("LDAP://" + Domain);
        //    DirectorySearcher oSearcher = new DirectorySearcher(oEntry);

        //    SearchResult oResult = default(SearchResult);
        //    DirectoryEntry oUser = default(DirectoryEntry);
        //    try
        //    {
        //        oSearcher.Filter = "(&(objectClass=users)(sAMAccountName=" + User + "))";
        //        oResult = oSearcher.FindOne;
        //        oUser = oResult.GetDirectoryEntry;

        //        if ((oUser != null))
        //        {
        //            oUser.Invoke("SetPassword", new object[] { NewPassword });
        //            return "Ganti password sukses";

        //        }
        //    }
        //    catch (Exception Ex)
        //    {
        //        return Ex.ToString;

        //    }
        //}
        public string ChangePassword(string pstrDomainName, string pstrUserID, string pStrOldPassword, string pStrNewPassword)
        {
            string functionReturnValue = null;
            // Dim Usr As DirectoryEntry
            //Try
            //    'Usr = New DirectoryEntry("LDAP://" & pstrDomainName, pstrUserID, pStrOldPassword)
            //    Usr = New DirectoryEntry("LDAP://" & pstrDomainName, "roby", "r0bysuhendr4")
            //    'Usr = New DirectoryEntry("LDAP://CN=" & pstrUserID & ", DC=" & pstrDomainName & ",DC=local")
            //    Usr.UsePropertyCache = True
            //    Usr.Invoke("ChangePassword", New Object() {pStrOldPassword, pStrNewPassword})
            //    ChangePassword = "Password telah diganti"
            //    Usr.CommitChanges()
            //Catch ex As Exception
            //    ChangePassword = ex.ToString
            //End Try
            SearchResult match = default(SearchResult);


            DirectoryEntry Usr = new DirectoryEntry("LDAP://" + pstrDomainName, gstrUserDC, gstrPasswordDC);
            //Dim Usr As New DirectoryEntry("LDAP://" & pstrDomainName, pstrUserID, pStrOldPassword)

            DirectorySearcher search = new DirectorySearcher(Usr, "(sAMAccountName=" + pstrUserID + ")");



            try
            {

                //find the user object


                match = search.FindOne();



                if ((match != null))
                {

                    // get the matched directory entry


                    DirectoryEntry entry = match.GetDirectoryEntry();



                    try
                    {

                        // change the password


                        entry.UsePropertyCache = true;


                        //entry.Invoke("ChangePassword", New Object() {pStrOldPassword, pStrNewPassword})
                        //entry.Invoke("ChangePassword", New Object() {pStrNewPassword, pStrNewPassword})
                        entry.Invoke("SetPassword", pStrNewPassword);


                        entry.CommitChanges();

                        functionReturnValue = "Password telah diganti";
                    }
                    catch (Exception ex)
                    {
                        functionReturnValue = ex.ToString();
                        // ensure the entry is disposed
                    }
                    finally
                    {


                        if ((entry != null))
                            entry.Dispose();


                    }


                }


                // ensure the searcher is disposed
            }
            finally
            {


                if ((search != null))
                    search.Dispose();


            }

            return pStrNewPassword;

        }
        //ChangePassword    

        //Public Sub GetDCPassword()
        //    Dim strADC() As String = New clsSystemConfiguration().ADC.Split("|")
        //    gstrUserDC = strADC(0)
        //    gstrPasswordDC = strADC(1)
        //End Sub

    }

}
