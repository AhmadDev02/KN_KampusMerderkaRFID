using System;
using System.Collections.Generic;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.dashboard.RFIDReader;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Masters
{
    public partial class mRFID_Reader
    {
        public int intReader_id { get; set; }
        public string txtIP_addreess { get; set; }
        public Nullable<int> intLokasiID { get; set; }
        public Nullable<int> intPowerJarak { get; set; }
        public string txtCategory { get; set; }
        public Nullable<int> intPort { get; set; }
        public string txtGUID { get; set; }
        public string txtInsertedBy { get; set; }
        public Nullable<System.DateTime> dtmInsertedBy { get; set; }
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedBy { get; set; }

        public mRFID_Reader()
        {

        }

        public mRFID_Reader(RFIDReaderRequest rfidReader)
        {
            this.intReader_id = rfidReader.intReader_id;
            this.txtIP_addreess = rfidReader.txtIP_addreess;
            this.intLokasiID = rfidReader.intLokasiID;
            this.intPowerJarak = rfidReader.intPowerJarak;
            this.txtCategory = rfidReader.txtCategory;
            this.intPort = rfidReader.intPort;
            this.dtmInsertedBy = DateTime.Now;
            this.dtmUpdatedBy = DateTime.Now;
            this.txtGUID = rfidReader.txtGUID;
        }
        public List<mRFID_Reader> itemList { get; set; }
    }
}

