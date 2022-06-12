using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class Employee:BaseEntity
    {
        public string? Name { get; set; }
        public double Salary { get; set; }

        // Relations
        [ForeignKey("Manager")]
        public int? ManagerId { get; set; }

        public Employee? Manager { get; set; }

        [ForeignKey("Department")]
        public int? DepartmentId { get; set; }

        public Department? Department { get; set; }
    }
}
