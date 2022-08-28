using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.UserRole
{
    [DataContract]
    public class UserRoleRequest
    {
        [Required]
        [DataMember]
        public int intUserRoleID { get; set; } = 0;
        [Required]
        [DataMember]
        public int intRoleID { get; set; } = 0;
        [Required]
        [DataMember]
        public int intUserID { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
