import { DepartmentService } from './../../../Services/department-service.service';
import { IDepartment } from './../../../Models/IDepartment';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  // Customer? : ICustomer
  dept = {} as IDepartment;
  constructor(private deptService: DepartmentService, private dialogRef: MatDialogRef<DepartmentDetailsComponent>, @Inject(MAT_DIALOG_DATA) public editeData: any) { }

  ngOnInit(): void {
    this.deptService.getDepartmentID(this.editeData.id).subscribe({
      next: (res) => {
        this.dept = res;
      },
      error: () => {
        alert("Error while View ")
      }
    })
  }

}
