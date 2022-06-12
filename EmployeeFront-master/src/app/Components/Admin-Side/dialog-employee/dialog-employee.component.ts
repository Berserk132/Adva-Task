import { IDepartment } from '../../../Models/IDepartment';
import { DepartmentService } from '../../../Services/department-service.service';
import { IEmployee } from 'src/app/Models/iemployee';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeAdminServiceService } from 'src/app/Services/employee-admin-service.service';

@Component({
  selector: 'app-dialog-customer',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.css']
})
export class DialogEmployeeComponent implements OnInit {
  EmployeeForm !: FormGroup;
  actionBtn: string = "Save";
  managers: IEmployee[] = [];
  departments: IDepartment[] = [];

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DialogEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public editeData: any,
    private cusService: EmployeeAdminServiceService, private deptService: DepartmentService) { }

  ngOnInit(): void {
    this.EmployeeForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Salary: [0, Validators.required],
      DepartmentId: [0, Validators.required],
      Department: [''],
      ManagerId: [0, Validators.required],
      Manager: [''],
      /*Manager: this.formBuilder.array([this.formBuilder.control('')])*/
    })
    if (this.editeData) {
      console.log(this.editeData);
      this.actionBtn = "Update";
      this.EmployeeForm.get('Name')?.setValue(this.editeData.name);
      this.EmployeeForm.controls['Salary'].setValue(this.editeData.salary);
      this.EmployeeForm.controls['DepartmentId'].setValue(this.editeData.departmentId);
      this.EmployeeForm.controls['Department'].setValue(this.editeData.department);
      this.EmployeeForm.controls['ManagerId'].setValue(this.editeData.managerId);
      this.EmployeeForm.controls['Manager'].setValue(this.editeData.manager);

    }

    this.getAllManagers()
    this.getAllDepartments()
  }
  // get customerAddresses() {
  //   return this.EmployeeForm.get('addresses') as FormArray;
  // }
  // addAdressNo(event: any) {
  //   this.customerAddresses.push(this.formBuilder.control(''));
  //   // event.target?.classList.add('d-none');
  // }
  SaveChange() {
    this.addPCustomer();
  }

  addPCustomer() {

    if (!this.editeData) {
      if (this.EmployeeForm.value) {
        this.cusService.addEmployee(this.EmployeeForm.value).subscribe({
          next: (res) => {
            alert("Customer added successfully");
            this.EmployeeForm.reset();
            this.dialogRef.close('Save');

          },
          error: (err) => {
            alert("Added Customer Failed ");
            console.log(err);
          }
        })
      }
    }
    else {
      this.updateCustomer(this.editeData.id);
      this.EmployeeForm.controls['ManagerId'].setValue(parseInt(this.EmployeeForm.get('ManagerId')?.value))
      this.EmployeeForm.controls['DepartmentId'].setValue(parseInt(this.EmployeeForm.get('DepartmentId')?.value))
      console.log(this.EmployeeForm.value)
    }
  }
  updateCustomer(id: number) {

    this.cusService.updateEmployee(id, this.EmployeeForm.value).subscribe({
      next: (res) => {
        alert("Customer Updated Successfully");
        this.EmployeeForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert("Error while updating ")
      }
    })
  }

  getAllManagers() {
    this.cusService.getAllManagers().subscribe(managers => {
      this.managers = managers
      console.log(managers);

    })
  }

  getAllDepartments() {
    this.deptService.getAllDepartments().subscribe(depts => {
      this.departments = depts
      console.log(depts);

    })
  }

}
