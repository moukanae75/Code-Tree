using IdentityService.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IdentityService.Data
{
    // نرث من IdentityDbContext لكي نحصل على جداول المستخدمين والأدوار جاهزة
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            // هنا يمكننا إضافة أي تعديلات على الجداول إذا احتجنا مستقبلاً
            // builder.Entity<ApplicationUser>().ToTable("Users");
        }
    }
}