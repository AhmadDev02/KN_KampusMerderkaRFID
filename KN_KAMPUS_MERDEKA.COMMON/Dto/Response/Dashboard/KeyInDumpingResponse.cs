using System;
using System.Runtime.Serialization;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Dashboard
{
    [DataContract]
   public class KeyInDumpingResponse
    {
        public KeyInDumpingResponse() { }
        public KeyInDumpingResponse(mKeyInDumping keyindumping)
        {
            this.intKeyInDumpingID = keyindumping.intKeyInDumpingID;
            this.intNoBO = keyindumping.intNoBO.HasValue?keyindumping.intNoBO.Value : 0;
            this.txtNamaProduk = keyindumping.txtNamaProduk;
            this.txtCharges = keyindumping.txtCharges;
            this.txtDumpingLine = keyindumping.txtDumpingLine;
            this.txtPIC = keyindumping.txtPIC;
            this.txtStartTime = keyindumping.txtStartTime;
            this.txtEndTime = keyindumping.txtEndTime;
            this.txtStatus = keyindumping.txtStatus;
            this.bitStatus = keyindumping.bitStatus.HasValue ? keyindumping.bitStatus.Value : true;
            this.txtInsertedBy = keyindumping.txtInsertedBy;
            this.dtmInsertedDate = keyindumping.dtmInsertedDate.HasValue ? keyindumping.dtmInsertedDate.Value : DateTime.Now;
            this.txtUpdatedBy = keyindumping.txtUpdatedBy;
            this.dtmUpdatedDate = keyindumping.dtmUpdatedDate.HasValue ? keyindumping.dtmUpdatedDate.Value : DateTime.Now;
            this.txtGUID = keyindumping.txtGUID;


        }
        [DataMember]
        public int intKeyInDumpingID { get; set; } = 0;
        [DataMember]
        public int intNoBO { get; set; } = 0;
        [DataMember]
        public string txtNamaProduk { get; set; } = "";
        [DataMember]
        public string txtStatus { get; set; } = "";
        [DataMember]
        public string txtCharges { get; set; } = "";
        [DataMember]
        public string txtDumpingLine { get; set; } = "";
        [DataMember]
        public string txtPIC { get; set; } = "";
        [DataMember]
        public bool bitStatus { get; set; } = true;
        [DataMember]
        public string txtStartTime { get; set; } = ""; 
        [DataMember]
        public string txtEndTime { get; set; } = "";
        [DataMember]
        public string txtInsertedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmInsertedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtUpdatedBy { get; set; }
        [DataMember]
        public DateTime dtmUpdatedDate { get; set; } = DateTime.Now;
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
    }
}
