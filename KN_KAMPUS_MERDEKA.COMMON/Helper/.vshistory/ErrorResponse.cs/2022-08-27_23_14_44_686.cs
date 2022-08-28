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

        public ErrorResponse()
        {

        }
        public ErrorResponse(Type T ,  Exception e){
            ErrorResponse<T> error = new ErrorResponse<T>();
            retDat.txtMessage = ex.InnerException != null ? ex.InnerException.InnerException != null ? ex.InnerException.InnerException.Message.ToString() : ex.InnerException.Message.ToString() : ex.Message.ToString();
            retDat.txtStackTrace = ex.StackTrace.ToString();
        }

    }
}
