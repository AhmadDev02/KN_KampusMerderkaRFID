using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Model
{
    [DataContract]
    public class LoginModel: LoginContext
    {
        [Required()]
        [Display(Name = "User Name")]
        public string txtUserName { get; set; }

        [Required()]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string txtPassword { get; set; }

        //[Required()]
        [DataType(DataType.Text)]
        [Display(Name = "Role")]
        public string txtRole { get; set; }

        //[Required()]
        [Display(Name = "Captcha")]
        public string txtCaptcha { get; set; }
    }
}
