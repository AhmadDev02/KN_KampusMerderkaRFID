using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Role
{
    [DataContract]
    public class RoleResponse
    {
        public int intRoleID { get; set; }
        public string txtRoleName { get; set; }
        public Nullable<bool> bitSuperuser { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; }
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; }
        public string txtGUID { get; set; }
    }
}
