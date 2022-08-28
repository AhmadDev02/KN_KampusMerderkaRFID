using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Module;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Systems.RoleAccess
{
    [DataContract]
    public class RoleAccessResponse
    {

        public RoleAccessResponse() { }
        [DataMember]
        public int intRoleAccessID { get; set; } = 0;
        [DataMember]
        public RoleResponse role { get; set; } = new RoleResponse();
        [DataMember]
        public ModuleResponse module { get; set; } = new ModuleResponse();
        [DataMember]
        public bool bitEdit { get; set; } = true;
        [DataMember]
        public bool bitView { get; set; } = true;
        [DataMember]
        public bool bitDelete { get; set; } = true;
        [DataMember]
        public bool bitPrint { get; set; } = true;
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
