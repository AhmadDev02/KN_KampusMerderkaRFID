using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Helper
{
    [DataContract()]
    public class SuccessResponse<T>
    {
        [DataMember()]
        public bool bitSuccess = true;
        [DataMember()]
        public T objData;
        [DataMember()]
        public string txtMessage = "Success";
        [DataMember()]
        public string txtGUID = Guid.NewGuid().ToString();
        [DataMember()]
        public string txtStackTrace;

        public SuccessResponse(T e) {
            this.objData = e;
        }

        public SuccessResponse()
        {

        }
    }
}
