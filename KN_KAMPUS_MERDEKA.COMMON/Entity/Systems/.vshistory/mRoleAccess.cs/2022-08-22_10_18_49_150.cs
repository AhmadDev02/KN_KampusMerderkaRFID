using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mRoleAccess
    {
        public int intRoleAccessID { get; set; }
        public Nullable<int> intRoleID { get; set; }
        public Nullable<int> intModuleID { get; set; }
        public Nullable<bool> bitEdit { get; set; }
        public Nullable<bool> bitView { get; set; }
        public Nullable<bool> bitDelete { get; set; }
        public Nullable<bool> bitPrint { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; }
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; }
        public string txtGUID { get; set; }
    }
}
