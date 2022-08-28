using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mParameter_Header
    {
       
        public mParameter_Header()
        {
            this.mParameter_Detail = new HashSet<mParameter_Detail>();
        }

        public int intParameter_HeaderID { get; set; }
        public string txtType { get; set; }
        public string txtDescription { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; }
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; }
        public string txtGUID { get; set; }

        
        public virtual ICollection<mParameter_Detail> mParameter_Detail { get; set; }
    }
}
