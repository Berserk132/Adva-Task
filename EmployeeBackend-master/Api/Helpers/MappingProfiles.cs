using Api.DTO;
using AutoMapper;
using Core.Entities;
using Infrastructure.DB;

namespace Api.Helpers
{
    public class MappingProfiles:Profile
    {
        private StoreContext _context;

        public MappingProfiles()
        {

            //_context = context;

            CreateMap<Employee, EmployeeDTO>()

              .ForMember(d => d.Department, o => o.MapFrom(s => s.Department.Name))
              .ForMember(d => d.Manager, o => o.MapFrom(s => s.Manager.Name));


            CreateMap<Department, DepartmentDto>()

              .ForMember(d => d.Manager, o => o.MapFrom(s => s.Manager.Name));
        }
    }
}
