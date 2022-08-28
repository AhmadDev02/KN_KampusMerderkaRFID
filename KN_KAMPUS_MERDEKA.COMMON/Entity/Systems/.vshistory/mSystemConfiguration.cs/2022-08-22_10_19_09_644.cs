using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mSystemConfiguration
    {
        public string txtSystemConfigurationID { get; set; }
        public string txtKeyID { get; set; }
        public Nullable<int> intModuleID { get; set; }
        public string txtDescription { get; set; }
        public string txtDefaultValue { get; set; }
        public string txtValue { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; }
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; }
        public string txtGUID { get; set; }
    }
}
