using ContentService.Data;
using ContentService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContentService.Controllers
{
    [Route("api/content/[controller]")]
    [ApiController]
    public class LessonsController : ControllerBase
    {
        private readonly ContentDbContext _context;

        public LessonsController(ContentDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Lesson>> PostLesson(Lesson lesson)
        {
            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return Ok(lesson);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            var lesson = await _context.Lessons.FindAsync(id);
            if (lesson == null) return NotFound();

            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
