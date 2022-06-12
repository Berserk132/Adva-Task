using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class DepartmentWithManagerSpecs : BaseSpecification<Department>
    {
        public DepartmentWithManagerSpecs()
        {
            AddInclude(s => s.Manager);
        }
    }
}
