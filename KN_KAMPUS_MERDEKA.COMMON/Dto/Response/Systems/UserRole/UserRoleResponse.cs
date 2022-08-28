using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Role;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.User;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.UserRole
{
    [DataContract]
    public class UserRoleResponse
    {

        public UserRoleResponse() { }
        public UserRoleResponse(mUserRole userRole)
        {
            this.intUserRoleID = userRole.intUserRoleID;
            this.txtInsertedBy = userRole.txtInsertedBy;
            this.dtmInsertedDate = userRole.dtmInsertedDate.HasValue ? userRole.dtmInsertedDate.Value : DateTime.Now;
            this.dtmUpdatedDate = userRole.dtmUpdatedDate.HasValue ? userRole.dtmUpdatedDate.Value : DateTime.Now;
            this.txtGUID = userRole.txtGUID;
        }

        [DataMember]
        public int intUserRoleID { get; set; } = 0;
        [DataMember]
        public RoleResponse role { get; set; } = new RoleResponse();
        [DataMember]
        public UserResponse user { get; set; } = new UserResponse();
        [DataMember]
        public string txtInsertedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmInsertedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtUpdatedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmUpdatedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
