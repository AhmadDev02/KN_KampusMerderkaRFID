using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mUser
    {
        public int intUserID { get; set; }
        public string txtUserName { get; set; }
        public string txtFullName { get; set; }
        public string txtNick { get; set; }
        public string txtEmpID { get; set; }
        public string txtEmail { get; set; }
        public Nullable<bool> bitActive { get; set; }
        public Nullable<bool> bitUseActiveDirectory { get; set; }
        public string txtPassword { get; set; }
        public Nullable<System.DateTime> dtmLastLogin { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; }
    }
}
