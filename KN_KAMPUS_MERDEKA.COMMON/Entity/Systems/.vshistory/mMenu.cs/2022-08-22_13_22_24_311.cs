using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mMenu
    {
        public int intMenuID { get; set; }
        public Nullable<int> intParentID { get; set; }
        public string txtMenuName { get; set; }
        public string txtDescription { get; set; }
        public Nullable<int> intModuleID { get; set; }
        public string txtLink { get; set; }
        public Nullable<int> intOrderID { get; set; }
        public Nullable<bool> bitActive { get; set; }
        public string txtIcon { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; }
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; }
        public string txtGUID { get; set; }


        //For FORM needed Only.
        public List<mMenu> itemList { get; set; }

    }
}
