using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.COMMON.Library
{
    public class cTripleDES
    {
        private TripleDESCryptoServiceProvider m_des = new TripleDESCryptoServiceProvider();
        private byte[] m_iv;
        private byte[] m_key;

        private UTF8Encoding m_utf8 = new UTF8Encoding();
        public cTripleDES(byte[] key, byte[] iv)
        {
            m_key = key;
            m_iv = iv;
        }

        public byte[] Decrypt(byte[] input)
        {
            return this.Transform(input, this.m_des.CreateDecryptor(this.m_key, this.m_iv));
        }

        public string Decrypt(string text)
        {
            byte[] input = Convert.FromBase64String(text);
            byte[] bytes = this.Transform(input, this.m_des.CreateDecryptor(this.m_key, this.m_iv));
            return this.m_utf8.GetString(bytes);
        }

        public byte[] Encrypt(byte[] input)
        {
            return this.Transform(input, this.m_des.CreateEncryptor(this.m_key, this.m_iv));
        }

        public string Encrypt(string text)
        {
            byte[] bytes = this.m_utf8.GetBytes(text);
            return Convert.ToBase64String(this.Transform(bytes, this.m_des.CreateEncryptor(this.m_key, this.m_iv)));
        }

        private byte[] Transform(byte[] input, ICryptoTransform CryptoTransform)
        {
            MemoryStream stream = new MemoryStream();
            CryptoStream stream2 = new CryptoStream(stream, CryptoTransform, CryptoStreamMode.Write);
            stream2.Write(input, 0, input.Length);
            stream2.FlushFinalBlock();
            stream.Position = 0L;
            byte[] buffer = stream.ToArray();
            stream.Close();
            stream2.Close();
            return buffer;
        }

    }

}
