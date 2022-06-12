using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class EmployeeWithDepartmentSpecs : BaseSpecification<Employee>
    {
        public EmployeeWithDepartmentSpecs()
        {
            AddInclude(c => c.Department);
            AddInclude(c => c.Manager);
        }

        public EmployeeWithDepartmentSpecs(Expression<Func<Employee, bool>> criteria) : base(criteria)
        {
            AddInclude(c => c.Manager);
            AddInclude(c => c.Department);
        }
    }
}
