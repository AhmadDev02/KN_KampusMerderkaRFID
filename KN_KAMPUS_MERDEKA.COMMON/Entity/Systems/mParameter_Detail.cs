using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mParameter_Detail
    {
        public int intParameter_DetailID { get; set; }
        public Nullable<int> intParameter_HeaderID { get; set; }
        public string txtCode { get; set; }
        public string txtDesc { get; set; }
        public Nullable<bool> bitActive { get; set; }
        public string txtGUID { get; set; }

        public virtual mParameter_Header mParameter_Header { get; set; }
    }
}
