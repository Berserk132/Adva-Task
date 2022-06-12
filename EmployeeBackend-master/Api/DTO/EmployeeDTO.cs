using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
    public class EmployeeDTO
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public double Salary { get; set; }

        public int DepartmentId { get; set; }

        public int ManagerId { get; set; }

        public string Department { get; set; }

        public string Manager { get; set; }
    }
}
