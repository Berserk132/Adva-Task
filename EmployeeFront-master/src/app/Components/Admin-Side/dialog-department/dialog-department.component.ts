import { IEmployee } from 'src/app/Models/iemployee';
import { EmployeeAdminServiceService } from 'src/app/Services/employee-admin-service.service';
import { DepartmentService } from './../../../Services/department-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-department',
  templateUrl: './dialog-department.component.html',
  styleUrls: ['./dialog-department.component.css']
})
export class DialogDepartmentComponent implements OnInit {

  DeptForm !: FormGroup;
  actionBtn: string = "Save";
  managers: IEmployee[] = [];


  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<DialogDepartmentComponent>, @Inject(MAT_DIALOG_DATA) public editeData: any,
    private deptService: DepartmentService, private employeeService: EmployeeAdminServiceService) { }

  ngOnInit(): void {
    this.DeptForm = this.formBuilder.group({
      Name: ['', Validators.required],
      ManagerId: [0, Validators.required],
      Manager: ['', Validators.required],
      /*Manager: this.formBuilder.array([this.formBuilder.control('')])*/
    })
    if (this.editeData) {
      console.log(this.editeData);
      this.actionBtn = "Update";
      this.DeptForm.get('Name')?.setValue(this.editeData.name);
      this.DeptForm.controls['ManagerId'].setValue(this.editeData.managerId);
      this.DeptForm.controls['Manager'].setValue(this.editeData.manager);

    }
    this.getAllManagers();
  }

  SaveChange() {
    this.addDepartment();
  }

  addDepartment() {

    if (!this.editeData) {
      if (this.DeptForm.value) {
        console.log(this.DeptForm.value)
        this.deptService.addDepartment(this.DeptForm.value).subscribe({
          next: (res) => {
            alert("Department added successfully");
            this.DeptForm.reset();
            this.dialogRef.close('Save');

          },
          error: (err) => {
            alert("Added Department Failed ");
            console.log(err);
          }
        })
      }
    }
    else {
      console.log(this.DeptForm.value)
      this.updateDepartment(this.editeData.id);
    }
  }
  updateDepartment(id: number) {
    this.deptService.updateDepartment(id, this.DeptForm.value).subscribe({
      next: (res) => {
        alert("Customer Updated Successfully");
        this.DeptForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert("Error while updating ")
      }
    })
  }

  getAllManagers() {
    this.employeeService.getAllManagers().subscribe(managers => {
      this.managers = managers
      console.log(managers);

    })
  }

}
