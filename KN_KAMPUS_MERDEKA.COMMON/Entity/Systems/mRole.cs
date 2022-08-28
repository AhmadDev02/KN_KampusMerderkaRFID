using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mRole
    {
        public mRole() { }
        public mRole(RoleRequest roleRequest)
        {
            this.intRoleID = roleRequest.intRoleID;
            this.txtRoleName = roleRequest.txtRoleName.ToUpper();
            this.bitSuperuser = roleRequest.bitSuperuser;
            this.dtmInsertedDate = DateTime.Now;
            this.dtmUpdatedDate = DateTime.Now;
            this.txtGUID = roleRequest.txtGUID;
        }
        public int intRoleID { get; set; }
        public string txtRoleName { get; set; }
        public Nullable<bool> bitSuperuser { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
