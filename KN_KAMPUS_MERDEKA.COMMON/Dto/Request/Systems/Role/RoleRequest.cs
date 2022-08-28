using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Role
{
    [DataContract]
    public class RoleRequest
    {
        [Required]
        [DataMember]
        public int intRoleID { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtRoleName { get; set; } = "";
        [Required]
        [DataMember]
        public bool bitSuperuser { get; set; } = true;
        [Required]
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
