using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using KN_KAMPUS_MERDEKA.COMMON.Constant;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.dashboard.keyindumping
{
    [DataContract]
    public class KeyInDumpingRequest
    {
        [Required]
        [DataMember]
        public int intKeyInDumpingID { get; set; } = 0;
        [Required]
        [DataMember]
        public int intNoBO { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtCharges { get; set; } = "";
        [Required]
        [DataMember]
        public string txtNamaProduk { get; set; } = "";
        [Required]
        [DataMember]
        public string txtPIC { get; set; } = "";
        [Required]
        [DataMember]
        public string txtDumpingLine { get; set; } = ""; 
        [DataMember]
        public string txtStartTime { get; set; } = "";
        [DataMember]
        public string txtEndTime { get; set; } = "";
        [DataMember]
        public string txtStatus { get; set; } = Configuration.STATUS.WAITING;
        [Required]
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
