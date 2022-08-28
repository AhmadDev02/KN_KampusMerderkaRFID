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


        public ErrorResponse(Exception e){
            //ErrorResponse<Exception> error = new ErrorResponse<Exception>();
            this.txtMessage = e.InnerException != null ? e.InnerException.InnerException != null ? e.InnerException.InnerException.Message.ToString() : e.InnerException.Message.ToString() : e.Message.ToString();
            this.txtStackTrace = e.StackTrace.ToString();

        }

    }
}
