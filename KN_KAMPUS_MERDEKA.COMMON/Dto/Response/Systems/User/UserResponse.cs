using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.User
{
    [DataContract]
    public class UserResponse
    {
        public UserResponse() { }
        public UserResponse(mUser user)
        {
            this.intUserID = user.intUserID;
            this.txtUserName = user.txtUserName;
            this.txtFullName = user.txtFullName;
            this.txtNick = user.txtNick;
            this.txtEmpID = user.txtEmpID;
            this.txtEmail = user.txtEmail;
            this.bitActive = user.bitActive.HasValue ? user.bitActive.Value : false;
            this.bitUseActiveDirectory = user.bitUseActiveDirectory.HasValue ? user.bitUseActiveDirectory.Value : false;
            this.dtmLastLogin = user.dtmLastLogin.HasValue ? user.dtmLastLogin.Value : DateTime.Now;
            this.txtInsertedBy = user.txtInsertedBy;
            this.dtmInsertedDate = user.dtmInsertedDate.HasValue ? user.dtmInsertedDate.Value : DateTime.Now;
            this.txtUpdatedBy = user.txtUpdatedBy;
            this.dtmUpdatedDate = user.dtmUpdatedDate.HasValue ? user.dtmUpdatedDate.Value : DateTime.Now;
            this.txtGUID = user.txtGUID;
        }
        [DataMember]
        public int intUserID { get; set; } = 0;
        [DataMember]
        public string txtUserName { get; set; } = "";
        [DataMember]
        public string txtFullName { get; set; } = "";
        [DataMember]
        public string txtNick { get; set; } = "";
        [DataMember]
        public string txtEmpID { get; set; } = "";
        [DataMember]
        public string txtEmail { get; set; } = "";
        [DataMember]
        public bool bitActive { get; set; } = false;
        [DataMember]
        public bool bitUseActiveDirectory { get; set; } = false;
        public string txtPassword { get; set; } = "[Protected]";
        [DataMember]
        public DateTime dtmLastLogin { get; set; } = DateTime.Now;
        [DataMember]
        public string txtInsertedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; }
        [DataMember]
        public DateTime dtmUpdatedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
