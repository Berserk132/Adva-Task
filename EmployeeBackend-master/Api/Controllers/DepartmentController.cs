using Api.DTO;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public DepartmentController(IUnitOfWork _unitOfWork, IMapper mapper)
        {
            this.unitOfWork = _unitOfWork;
            this.mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<Department>> GetDepartments()
        {
            var DeptSpecs = new DepartmentWithManagerSpecs();
            var result = await unitOfWork.Repository<Department>().GetAllAsync(DeptSpecs);
            if (result is null)
            {
                return BadRequest();
            }
            var customers = result.Select(d => mapper.Map<DepartmentDto>(d)).ToList();
            return Ok(customers);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var DeptSpecs = new DepartmentWithManagerSpecs();
            var result = await unitOfWork.Repository<Department>().GetByIdAsync(id, DeptSpecs);
            var customer = mapper.Map<DepartmentDto>(result);
            if (customer is null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(DepartmentDto departmentDto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var Manager = await unitOfWork.Repository<Employee>().GetByIdAsync(departmentDto.ManagerId);
                    var newDepartment = new Department()
                    {
                        Name = departmentDto.Name,
                    };
                    if (departmentDto.ManagerId != 0) newDepartment.ManagerId = departmentDto.ManagerId;


                    await unitOfWork.Repository<Department>().AddAsync(newDepartment);
                    await unitOfWork.Commit();
                    string url = Url.Link("getOneRoute", new { id = newDepartment.Id });
                    return Created(url, newDepartment);
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
        public async Task<ActionResult<Department>> UpdateDepartment(int id, DepartmentDto departmentDto)
        {
            if (ModelState.IsValid)
            {
                var checkDept = await unitOfWork.Repository<Department>().GetByIdAsync(id);

                if (checkDept is null)
                {
                    return NotFound();
                }
                else
                {
                    departmentDto.Id = id;
                    //var customerUpdated = mapper.Map<EmployeeDTO, Employee>(customerDTO);
                    var dept = new Department()
                    {
                        Id = id,
                        Name = departmentDto.Name,
                        ManagerId = departmentDto.ManagerId == 0 ? null : departmentDto.ManagerId,
                    };

                    await unitOfWork.Repository<Department>().UpdateAsync(id, dept);
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
        public async Task<ActionResult<Department>> DeleteDepartment(int id)
        {
            var checkDept = await unitOfWork.Repository<Department>().DeleteAsync(id);
            try
            {
                if (checkDept is null)
                {
                    return NotFound();
                }
                await unitOfWork.Commit();

                return Ok();

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
