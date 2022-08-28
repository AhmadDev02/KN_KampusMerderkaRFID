using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Model
{
    [DataContract]
    public  class Principal
    {
        public mUser user;
        public List<int> roles = new List<int>();
        public string txtLangID;

        public void New()
        {
            user = new mUser();
        }
    }
}
