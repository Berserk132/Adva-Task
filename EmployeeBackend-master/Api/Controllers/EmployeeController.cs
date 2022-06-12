using Api.DTO;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IManagerRepository ManagerRepo;
        private readonly IMapper mapper;
        public EmployeeController(IUnitOfWork _unitOfWork,IMapper mapper, IManagerRepository _managerRepo)
        {
            this.unitOfWork = _unitOfWork;
            this.mapper = mapper;
            ManagerRepo = _managerRepo;
        }
        [HttpGet]
        public async Task<ActionResult<Employee>> GetCustomers()
        {
            var customerSpecs = new EmployeeWithDepartmentSpecs();
            var result = await unitOfWork.Repository<Employee>().GetAllAsync(customerSpecs);
            if(result is null)
            {
                return BadRequest();
            }
            var customers = result.Select(e => mapper.Map<EmployeeDTO>(e)).ToList();
            return Ok(customers);
        }

        [HttpGet ("{id:int}", Name = "getOneRoute")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var customerSpecs = new EmployeeWithDepartmentSpecs();
            var result = await unitOfWork.Repository<Employee>().GetByIdAsync(id, customerSpecs);
            var customer =   mapper.Map<EmployeeDTO>(result);
            if (customer is null)
            {
                return NotFound();
            }

            return Ok(customer);
        }
        
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(EmployeeDTO employeeDTO)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //var dept = await unitOfWork.Repository<Department>().GetByIdAsync(employeeDTO.DepartmentId);
                    //var Manager = await unitOfWork.Repository<Employee>().GetByIdAsync(employeeDTO.ManagerId);
                    var employee = new Employee()
                    {
                        Name = employeeDTO.Name,
                        Salary = employeeDTO.Salary,
                    };
                    if (employeeDTO.ManagerId != 0) employee.ManagerId = employeeDTO.ManagerId;
                    if (employeeDTO.DepartmentId != 0) employee.DepartmentId = employeeDTO.DepartmentId;


                    await unitOfWork.Repository<Employee>().AddAsync(employee);
                    await unitOfWork.Commit();
                    string url = Url.Link("getOneRoute", new { id = employee.Id });
                    return Created(url, employee);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
      
            }
            StringBuilder errors = new StringBuilder();
            foreach (var state in ModelState)
            {
                foreach (var error in state.Value.Errors)
                {
                    errors.Append(error.ErrorMessage);
                }
            }
            return BadRequest(errors);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int id, EmployeeDTO employeeDTO)
        {
            if (ModelState.IsValid)
            {
                var customerSpecs = new EmployeeWithDepartmentSpecs();
                var checkCustomer = await unitOfWork.Repository<Employee>().GetByIdAsync(id, customerSpecs);

                if (checkCustomer is null)
                {
                    return NotFound();
                }
                else
                {
                    employeeDTO.Id = id;
                    //var customerUpdated = mapper.Map<EmployeeDTO, Employee>(customerDTO);
                    var employee = new Employee()
                    {
                        Id = id,
                        Name = employeeDTO.Name,
                        Salary = employeeDTO.Salary,
                        ManagerId = employeeDTO.ManagerId == 0 ? null : employeeDTO.ManagerId,
                        DepartmentId = employeeDTO.DepartmentId == 0 ? null : employeeDTO.DepartmentId
                    };

                    await unitOfWork.Repository<Employee>().UpdateAsync(id, employee);
                    await unitOfWork.Commit();
                    return NoContent();
                }
            }
            StringBuilder errors = new StringBuilder();
            foreach (var state in ModelState)
            {
                foreach (var error in state.Value.Errors)
                {
                    errors.Append(error.ErrorMessage);
                }
            }
            return BadRequest(errors);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var checkCustomer = await unitOfWork.Repository<Employee>().DeleteAsync(id);

            if (checkCustomer is null)
            {
                return NotFound();
            }
            await unitOfWork.Commit();

            return Ok();
        }

        [HttpGet("getmanagers")]
        public async Task<ActionResult<Employee>> getManagers()
        {
            var managers = await ManagerRepo.GetAllAsync();
            return Ok(managers);
        }
    }
}
