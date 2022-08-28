using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Helper
{
    [DataContractAttribute()]
    public class SuccessResponse<T>
    {
        [DataMember()]
        private bool bitSuccess = true;
        [DataMember()]
        private T objData;
        [DataMember()]
        private string txtMessage = "Success";
        [DataMember()]
        private string txtGUID = Guid.NewGuid().ToString();
        [DataMember()]
        private string txtStackTrace;

        public SuccessResponse(T e) {
            this.objData = e;
        }


    }
}
