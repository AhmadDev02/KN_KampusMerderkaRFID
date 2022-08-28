using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mUserRole
    {
        public int intUserRoleID { get; set; }
        public int intRoleID { get; set; }
        public int intUserID { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; }
    }
}
