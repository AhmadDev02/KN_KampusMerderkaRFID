using KN_KAMPUS_MERDEKA.COMMON.Entity.Systems;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KN_KAMPUS_MERDEKA.DAL.Context
{
    public partial class KampusMerdekaEntities: DbContext
    {
        public KampusMerdekaEntities(string connectionString)
            : base(connectionString)
        {
            //((IObjectContextAdapter)this).ObjectContext.CommandTimeout = 99999999;
            this.Database.CommandTimeout = 0;
            this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }

        public virtual DbSet<mMenu> mMenus { get; set; }
        public virtual DbSet<mModule> mModules { get; set; }
        public virtual DbSet<mParameter_Detail> mParameter_Detail { get; set; }
        public virtual DbSet<mParameter_Header> mParameter_Header { get; set; }
        public virtual DbSet<mRole> mRoles { get; set; }
        public virtual DbSet<mRoleAccess> mRoleAccesses { get; set; }
        public virtual DbSet<mSystemConfiguration> mSystemConfigurations { get; set; }
        public virtual DbSet<mSystemLanguage> mSystemLanguages { get; set; }
        public virtual DbSet<mUser> mUsers { get; set; }
        public virtual DbSet<mUserRole> mUserRoles { get; set; }
        public virtual DbSet<TrDebugEmail> TrDebugEmails { get; set; }
    }
}
