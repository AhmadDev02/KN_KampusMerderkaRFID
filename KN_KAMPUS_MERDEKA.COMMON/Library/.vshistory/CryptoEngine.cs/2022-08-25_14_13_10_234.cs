using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Library
{
    public class CryptoEngine
    {
        public static string DeCryptTripleDES(string value)
        {
            byte[] Key = new byte[] {
            0x1,
            0x2,
            0x3,
            0x4,
            0x5,
            0x6,
            0x7,
            0x8,
            0x9,
            0x10,
            0x11,
            0x12,
            0x13,
            0x14,
            0x15,
            0x16
        };
            byte[] IV = new byte[] {
            0x1,
            0x2,
            0x3,
            0x4,
            0x5,
            0x6,
            0x7,
            0x8,
            0x9,
            0x10,
            0x11,
            0x12,
            0x13,
            0x14,
            0x15,
            0x16
        };

            //dim key as byte() = new byte()  { _
            //            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,   0x10 , 0x11, 0x12, 0x13, 20, 0x15, 0x16, 0x17, 0x18 _
            //         } 
            //Dim iv As Byte() = New Byte() {8, 7, 6, 5, 4, 3, 2, 1}
            cTripleDES edes = new cTripleDES(Key, IV);
            return edes.Decrypt(value);
        }

        public static string EnCryptTripleDES(string value)
        {
            byte[] Key = {
            0x1,
            0x2,
            0x3,
            0x4,
            0x5,
            0x6,
            0x7,
            0x8,
            0x9,
            0x10,
            0x11,
            0x12,
            0x13,
            0x14,
            0x15,
            0x16
        };
            byte[] IV = {
            0x1,
            0x2,
            0x3,
            0x4,
            0x5,
            0x6,
            0x7,
            0x8,
            0x9,
            0x10,
            0x11,
            0x12,
            0x13,
            0x14,
            0x15,
            0x16
        };

            //  Dim  key  As byte()= new byte() {  _
            //            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0x10, 0x11, 0x12, 0x13, 20, 0x15, 0x16, 0x17, 0x18 _
            //         } 
            //Dim iv As Byte() = New Byte() {8, 7, 6, 5, 4, 3, 2, 1}
            cTripleDES edes = new cTripleDES(Key, IV);
            return edes.Encrypt(value);
        }


        public static string MD5Encrypt(string p_s_PlainText)
        {
            MD5CryptoServiceProvider provider = new MD5CryptoServiceProvider();
            UTF8Encoding encoding = new UTF8Encoding();
            return Convert.ToBase64String(provider.ComputeHash(encoding.GetBytes(p_s_PlainText)));
        }
    }

}
