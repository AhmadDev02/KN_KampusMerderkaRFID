using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.dashboard.RFIDReader
{
    [DataContract]
    public class RFIDReaderRequest
    {
        [Required]
        [DataMember]
        public int intReader_id { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtIP_addreess { get; set; } = "";
        [Required]
        [DataMember]
        public int intLokasiID { get; set; } = 0;
        [Required]
        [DataMember]
        public int intPowerJarak { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtCategory { get; set; } = "";
        [Required]
        [DataMember]
        public int intPort { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
