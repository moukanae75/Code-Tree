using Microsoft.AspNetCore.Identity;

namespace IdentityService.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FirstName {get;set;}
        public string? LastName {get;set;}
        public int TotalXP {get;set;} = 0;
        public DateTime CreatedAt {get;set;} = DateTime.UtcNow;
        
    }
}

