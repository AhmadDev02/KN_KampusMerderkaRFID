using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.User
{
    [DataContract()]
    public class UserRegister
    {
        [Required()]
        [DataMember]
        public int intUserID { get; set; } = 0;
        [Required()]
        [RegularExpression(@"^[\S.]*$", ErrorMessage = "Username tidak boleh pake spasi")]
        [DataMember()]
        public string txtUserName { get; set; } = "";
        [Required()]
        [DataMember()]
        public string txtFullName { get; set; } = "";
        [Required()]
        [DataMember()]
        public string txtNick { get; set; } = "";
        [Required()]
        [DataMember()]
        public string txtEmpID { get; set; } = "";
        [EmailAddress(ErrorMessage = "Email tidak valid")]
        [Required()]
        [DataMember()]
        public string txtEmail { get; set; } = "";
        [Required()]
        [DataMember()]
        public string txtPassword { get; set; } = "";
        [Required()]
        [DataMember()]
        public bool bitActive { get; set; } = true;
        [Required()]
        [DataMember()]
        public bool bitUseActiveDirectory { get; set; } = false;
        [Required()]
        [DataMember()]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
