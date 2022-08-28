using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Menu;
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
        public Nullable<System.DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();



        public mMenu()
        {

        }
        public mMenu(MenuRequest menu)
        {
            this.bitActive = menu.bitActive;
            this.dtmInsertedDate = DateTime.Now;
            this.dtmUpdatedDate = DateTime.Now;
            this.intMenuID = menu.intMenuID;
            this.intModuleID = menu.intModuleID;
            this.intOrderID = menu.intOrderID;
            this.intParentID = menu.intParentID;
            this.txtDescription = menu.txtDescription.ToUpper();
            this.txtLink = menu.txtLink;
            this.txtMenuName = menu.txtMenuName.ToUpper();
            this.txtGUID = menu.txtGUID;
        }

        //For FORM needed Only.
        public List<mMenu> itemList { get; set; }

    }
}
