using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.UserRole;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mUserRole
    {
        public mUserRole() { }
        public mUserRole(UserRoleRequest userRoleRequest)
        {
            this.intRoleID = userRoleRequest.intRoleID;
            this.intUserID = userRoleRequest.intUserID;
            this.txtGUID = userRoleRequest.txtGUID;
        }
        public int intUserRoleID { get; set; } = 0;
        public int intRoleID { get; set; } = 0;
        public int intUserID { get; set; } = 0;
        public string txtInsertedBy { get; set; } = "";
        public Nullable<DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; } = "";
        public Nullable<DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
