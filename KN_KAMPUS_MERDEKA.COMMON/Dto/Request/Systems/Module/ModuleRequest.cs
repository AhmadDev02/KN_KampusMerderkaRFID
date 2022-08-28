using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Module
{
    [DataContract]
    public class ModuleRequest
    {
        [Required]
        [DataMember]
        public int intModuleID { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtModuleName { get; set; } = "";
        [Required]
        [DataMember]
        public string txtDescription { get; set; } = "";
        [Required]
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
