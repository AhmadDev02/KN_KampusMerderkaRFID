using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.RoleAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mRoleAccess
    {
        public mRoleAccess() { }
        public mRoleAccess(RoleAccessRequest roleAccessRequest)
        {
            this.txtGUID = roleAccessRequest.txtGUID;
            this.intModuleID = roleAccessRequest.intModuleID;
            this.intRoleID = roleAccessRequest.intRoleID;
        }

        public int intRoleAccessID { get; set; } = 0;
        public Nullable<int> intRoleID { get; set; } = 0;
        public Nullable<int> intModuleID { get; set; } = 0;
        public Nullable<bool> bitEdit { get; set; } = true;
        public Nullable<bool> bitView { get; set; } = true;
        public Nullable<bool> bitDelete { get; set; } = true;
        public Nullable<bool> bitPrint { get; set; } = true;
        public string txtInsertedBy { get; set; } = "";
        public Nullable<DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; } = "";
        public Nullable<DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
