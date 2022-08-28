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
        private string txtMessage;
        [DataMember()]
        private string txtGUID;
        [DataMember()]
        private string txtStackTrace;

    }
}
