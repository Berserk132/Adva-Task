import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from 'src/app/Models/iemployee';
import { EmployeeAdminServiceService } from 'src/app/Services/employee-admin-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  // Customer? : ICustomer
  Employee = {} as IEmployee;
  constructor(private cusService: EmployeeAdminServiceService, private dialogRef: MatDialogRef<EmployeeDetailsComponent>, @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {
    this.cusService.getEmployeeByID(this.editeData.id).subscribe({
      next: (res) => {
        console.log(res)
        this.Employee = res;
      },
      error: () => {
        alert("Error while View ")
      }
    })
  }
}


