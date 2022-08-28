using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Helper
{
    [DataContract()]
    public sealed class ErrorResponse<T>
    {
        [DataMember()]
        public bool bitSuccess = false;
        [DataMember()]
        public T objData;
        [DataMember()]
        public string txtMessage = "Error";
        [DataMember()]
        public string txtGUID =  Guid.NewGuid().ToString();
        [DataMember()]
        public string txtStackTrace;

        public ErrorResponse(Exception e){
            //ErrorResponse<Exception> error = new ErrorResponse<Exception>();
            this.txtMessage = e.InnerException != null ? e.InnerException.InnerException != null ? e.InnerException.InnerException.Message.ToString() : e.InnerException.Message.ToString() : e.Message.ToString();
            this.txtStackTrace = e.StackTrace.ToString();

        }

    }
}
