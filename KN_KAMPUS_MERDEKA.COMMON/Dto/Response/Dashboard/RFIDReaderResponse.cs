using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using KN_KAMPUS_MERDEKA.COMMON.Entity.Masters;

namespace KN_KAMPUS_MERDEKA.COMMON.Dto.Response.Dashboard
{
    [DataContract]
    public class RFIDReaderResponse
    {
        public RFIDReaderResponse() { }
        public RFIDReaderResponse(mRFID_Reader rfidReader)
        {
            this.intReader_id = rfidReader.intReader_id;
            this.txtIP_addreess = rfidReader.txtIP_addreess;
            this.intLokasiID = rfidReader.intLokasiID.HasValue ? rfidReader.intLokasiID.Value : 0;
            this.intPowerJarak = rfidReader.intPowerJarak.HasValue ? rfidReader.intPowerJarak.Value : 0;
            this.txtCategory = rfidReader.txtCategory;
            this.intPort = rfidReader.intPort.HasValue ? rfidReader.intPort.Value : 0;
            this.txtInsertedBy = rfidReader.txtInsertedBy;
            this.dtmInsertedBy = this.dtmInsertedBy = rfidReader.dtmInsertedBy.HasValue ? rfidReader.dtmInsertedBy.Value : DateTime.Now;
            this.txtUpdatedBy = rfidReader.txtUpdatedBy;
            this.dtmUpdatedBy = rfidReader.dtmUpdatedBy.HasValue ? rfidReader.dtmUpdatedBy.Value : DateTime.Now; ;
            this.txtGUID = rfidReader.txtGUID;

        }
        [DataMember]
        public int intReader_id { get; set; } = 0;
        [DataMember]
        public string txtIP_addreess { get; set; } = "";
        [DataMember]
        public int intLokasiID { get; set; } = 0;
        [DataMember]
        public int intPowerJarak { get; set; } = 0;
        [DataMember]
        public string txtCategory { get; set; } = "";
        [DataMember]
        public int intPort { get; set; } = 0;
        [DataMember]
        public string txtGUID { get; set; } = Guid.NewGuid().ToString();
        [DataMember]
        public string txtInsertedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmInsertedBy { get; set; } = DateTime.Now;
        [DataMember]
        public string txtUpdatedBy { get; set; } = "";
        [DataMember]
        public DateTime dtmUpdatedBy { get; set; } = DateTime.Now;
    }
}
