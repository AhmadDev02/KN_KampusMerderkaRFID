using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Menu
{
    [DataContract]
    public class MenuResponse
    {
        public MenuResponse() { }
        public MenuResponse(mMenu menu)
        {
            this.intMenuID = menu.intMenuID;
            this.txtMenuName = menu.txtMenuName;
            this.txtDescription = menu.txtDescription;
            this.txtLink = menu.txtLink;
            this.intOrderID = menu.intOrderID.HasValue ? menu.intOrderID.Value : 0;
            this.bitActive = menu.bitActive.HasValue ? menu.bitActive.Value : true;
            this.txtIcon = menu.txtIcon;
            this.txtInsertedBy = menu.txtInsertedBy;
            this.dtmInsertedDate = menu.dtmInsertedDate.HasValue ? menu.dtmInsertedDate.Value : DateTime.Now;
            this.txtUpdatedBy = menu.txtUpdatedBy;
            this.dtmUpdatedDate = menu.dtmUpdatedDate.HasValue ? menu.dtmUpdatedDate.Value : DateTime.Now;
            this.txtGUID = menu.txtGUID;
        }
        [DataMember]
        public int intMenuID { get; set; } = 0;
        [DataMember]
        public MenuResponse parent { get; set; } = null;
        [DataMember]
        public string txtMenuName { get; set; } = "";
        [DataMember]
        public string txtDescription { get; set; }
        [DataMember]
        public ModuleResponse module { get; set; } = new ModuleResponse();
        public string txtLink { get; set; } = "";
        [DataMember]
        public int intOrderID { get; set; } = 0;
        [DataMember]
        public bool bitActive { get; set; } = true;
        [DataMember]
        public string txtIcon { get; set; } = "";
        [DataMember]
        public string txtInsertedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmInsertedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtUpdatedBy { get; set; }
        [DataMember]
        public DateTime dtmUpdatedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
