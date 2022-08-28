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
        private bool m_bitSuccess = true;
        [DataMember()]
        private object m_objData;
        [DataMember()]
        private string m_txtMessage;
        [DataMember()]
        private string m_txtGUID;
        [DataMember()]
        private string m_txtStackTrace;

    }
}
