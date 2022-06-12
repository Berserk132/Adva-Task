using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
    public class DepartmentDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public int ManagerId { get; set; }

        public string Manager { get; set; }
    }
}
