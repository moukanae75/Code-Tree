using System.ComponentModel.DataAnnotations;

namespace ContentService.Models
{
    public class Course
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required]
        public string Language { get; set; } = string.Empty; // e.g., "Python", "CSharp"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
    }
}
