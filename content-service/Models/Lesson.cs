using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContentService.Models
{
    public class Lesson
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public int Order { get; set; }

        // Foreign Key
        public int CourseId { get; set; }

        [JsonIgnore]
        public Course? Course { get; set; }
    }
}
