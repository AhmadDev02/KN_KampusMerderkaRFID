using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Helper
{
    [DataContractAttribute()]
    public sealed class ErrorResponse<T>
    {
        [DataMember()]
        private bool bitSuccess = false;
        [DataMember()]
        private T objData;
        [DataMember()]
        private string txtMessage = "Error";
        [DataMember()]
        private string txtGUID =  Guid.NewGuid().ToString();
        [DataMember()]
        private string txtStackTrace;

        private ErrorResponse()
        {

        }
        public ErrorResponse(Type T ,  Exception e){
            ErrorResponse<T> error = new ErrorResponse<T>();
            error.txtMessage = e.InnerException != null ? e.InnerException.InnerException != null ? e.InnerException.InnerException.Message.ToString() : e.InnerException.Message.ToString() : e.Message.ToString();
            error.txtStackTrace = e.StackTrace.ToString();

        }

    }
}
