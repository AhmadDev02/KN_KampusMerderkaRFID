using System;
using System.Collections.Generic;
using KN_KAMPUS_MERDEKA.COMMON.Dto.Request.dashboard.keyindumping;

namespace KN_KAMPUS_MERDEKA.COMMON.Entity.Masters
{
    public partial class mKeyInDumping
    {
        public int intKeyInDumpingID { get; set; }
        public Nullable<int> intNoBO { get; set; }
        public string txtCharges { get; set; }
        public string txtNamaProduk { get; set; }
        public string txtPIC { get; set; }
        public string txtDumpingLine { get; set; }
        public string txtStartTime { get; set; }
        public string txtEndTime { get; set; }
        public string txtInsertedBy { get; set; }

        public string txtStatus { get; set; }
        public Nullable<System.DateTime> dtmInsertedDate { get; set; }
        public string txtUpdatedBy { get; set; }
        public Nullable<System.DateTime> dtmUpdatedDate { get; set; }
        public string txtGUID { get; set; }
        public Nullable<bool> bitStatus { get; set; }




        public mKeyInDumping()
        {

        }
        public mKeyInDumping(KeyInDumpingRequest keyindumping)
        {

            //this.bitStatus= keyindumping.bitStatus;
            this.intKeyInDumpingID = keyindumping.intKeyInDumpingID;
            this.intNoBO = keyindumping.intNoBO;
            this.txtNamaProduk = keyindumping.txtNamaProduk;
            this.txtCharges = keyindumping.txtCharges;
            this.txtDumpingLine = keyindumping.txtDumpingLine;
            this.txtStartTime = keyindumping.txtStartTime;
            this.txtEndTime = keyindumping.txtEndTime;
            this.txtPIC = keyindumping.txtPIC;
            this.txtStatus = keyindumping.txtStatus;
            this.dtmInsertedDate = DateTime.Now;
            this.dtmUpdatedDate = DateTime.Now;
            this.txtGUID = keyindumping.txtGUID;
        }

       // For FORM needed Only.
       public List<mKeyInDumping> itemList { get; set; }
    }


}
