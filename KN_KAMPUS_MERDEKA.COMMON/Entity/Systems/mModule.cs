using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Module;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Systems
{
    public partial class mModule
    {
        public mModule() { }
        public mModule(ModuleRequest module)
        {
            this.intModuleID = module.intModuleID;
            this.txtModuleName = module.txtModuleName.ToUpper();
            this.txtDescription = module.txtDescription.ToUpper();
            this.dtmInsertedDate = DateTime.Now;
            this.dtmUpdatedDate = DateTime.Now;
            this.txtGUID = module.txtGUID;
        }
        public int intModuleID { get; set; }
        public string txtModuleName { get; set; }
        public string txtDescription { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; } = DateTime.Now;
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; } = DateTime.Now;
        public string txtGUID { get; set; }
    }
}
