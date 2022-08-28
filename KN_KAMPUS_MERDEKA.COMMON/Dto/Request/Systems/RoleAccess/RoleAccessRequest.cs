using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.RoleAccess
{
    [DataContract]
    public class RoleAccessRequest
    {
        [Required]
        [DataMember]
        public int intRoleAccessID { get; set; } = 0;
        [Required]
        [DataMember]
        public int intRoleID { get; set; } = 0;
        [Required]
        [DataMember]
        public int intModuleID { get; set; } = 0;
        [Required]
        [DataMember]
        public bool bitEdit { get; set; } = true;
        [Required]
        [DataMember]
        public bool bitView { get; set; } = true;
        [Required]
        [DataMember]
        public bool bitDelete { get; set; } = true;
        [Required]
        [DataMember]
        public bool bitPrint { get; set; } = true;
        [Required]
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
