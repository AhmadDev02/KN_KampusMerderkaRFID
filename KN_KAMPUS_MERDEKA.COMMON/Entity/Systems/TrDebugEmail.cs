using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class TrDebugEmail
    {
        public int intDebugEmailID { get; set; }
        public string txtFrom { get; set; }
        public string txtTo { get; set; }
        public string txtCC { get; set; }
        public string txtBCC { get; set; }
        public string txtSubject { get; set; }
        public string txtPriority { get; set; }
        public Nullable<short> bitIsBodyHTML { get; set; }
        public string txtBody { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; } 
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; }
    }
}
