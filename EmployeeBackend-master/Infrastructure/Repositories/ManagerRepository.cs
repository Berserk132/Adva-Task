using Core.Entities;
using Core.Specifications;
using Infrastructure.DB;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ManagerRepository : IManagerRepository
    {
        private readonly StoreContext _context;
        public ManagerRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            var managersIds = _context.Employees.Select(x => x).Where(x => x.ManagerId != null);
            Console.WriteLine(managersIds);

            var query = await (from e1 in _context.Employees
                               from e2 in _context.Employees
                               where e2.Id == e1.ManagerId
                               select e2).Distinct().ToListAsync();
 
            return query;
        }
    }
}
