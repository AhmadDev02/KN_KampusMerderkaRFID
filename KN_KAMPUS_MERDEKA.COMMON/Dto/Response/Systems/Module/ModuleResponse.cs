using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Module
{
    [DataContract]
    public class ModuleResponse
    {
        public ModuleResponse() { }
        public ModuleResponse(mModule module)
        {
            this.intModuleID = module.intModuleID;
            this.txtModuleName = module.txtModuleName;
            this.txtDescription = module.txtDescription;
            this.txtInsertedBy = module.txtInsertedBy;
            this.dtmInsertedDate = module.dtmInsertedDate.HasValue ? module.dtmInsertedDate.Value : DateTime.Now;
            this.txtUpdatedBy = module.txtUpdatedBy;
            this.dtmUpdatedDate = module.dtmUpdatedDate.HasValue ? module.dtmUpdatedDate.Value : DateTime.Now;
            this.txtGUID = module.txtGUID;
        }
        [DataMember]
        public int intModuleID { get; set; } = 0;
        [DataMember]
        public string txtModuleName { get; set; } = "";
        [DataMember]
        public string txtDescription { get; set; } = "";
        [DataMember]
        public string txtInsertedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmInsertedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtUpdatedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmUpdatedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
