using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class trDebugError
    {
        public string txtId { get; set; }
        public string txtDebugName { get; set; }
        public string txtErrorInfo { get; set; }
        public DateTime dtmErrorDate { get; set; }
        public string txtStackTrace { get; set; }
    }
}
