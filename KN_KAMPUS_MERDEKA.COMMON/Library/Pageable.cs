using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Library
{
    public class Pageable<T>
    {
        public int page { get; set; }
        public int size { get; set; }
        public int total { get; set; }
        public List<T> content { get; set; } = new List<T>();
        public Boolean hasNext { get; set; }
        public Boolean hasPrevious { get; set; }
        public Boolean hasContent { get; set; } = false;
    }
}
