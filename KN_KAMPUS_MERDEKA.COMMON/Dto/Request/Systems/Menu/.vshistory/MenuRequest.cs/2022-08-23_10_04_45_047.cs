using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Request.Systems.Menu
{
    [DataContract]
    public class MenuRequest
    {
        [Required]
        [DataMember]
        public int intMenuID { get; set; } = 0;
        [Required]
        [DataMember]
        public int intParentID { get; set; } = 0;
        [Required]
        [DataMember]
        public string txtMenuName { get; set; } = "";
        [Required]
        [DataMember]
        public string txtDescription { get; set; }
        [Range(1, int.MaxValue)]
        [Required]
        [DataMember]
        public int intModuleID { get; set; } = 0;
        public string txtLink { get; set; } = "";
        [Required]
        [Range(0, int.MaxValue)]
        [DataMember]
        public int intOrderID { get; set; } = 0;
        [Required]
        [DataMember]
        public bool bitActive { get; set; } = true;
        [DataMember]
        public string txtIcon { get; set; } = "";
        [Required]
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
