import { DepartmentDetailsComponent } from './../department-details/department-details.component';
import { DialogDepartmentComponent } from './../dialog-department/dialog-department.component';
import { DepartmentService } from './../../../Services/department-service.service';
import { IDepartment } from './../../../Models/IDepartment';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css']
})
export class DepartmentDashboardComponent implements OnInit {

  dataSource: IDepartment[] = [];


  constructor(public dialog: MatDialog, private deptService: DepartmentService) { }

  ngOnInit(): void {
    this.getAllDepartment();
  }
  openDialog() {
    this.dialog.open(DialogDepartmentComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.getAllDepartment();
      }
    })
  }
  deleteDepartment(deptId: number) {
    this.deptService.deleteDepartment(deptId).subscribe(dept => {
      alert("Department Deleted");
      this.deptService.getAllDepartments().subscribe(customers => {
        this.dataSource = customers

      })
    })

  }

  showDetails(row: any) {
    this.dialog.open(DepartmentDetailsComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      // this.getAllCustomers();
    })
  }

  getAllDepartment() {
    this.deptService.getAllDepartments().subscribe(depts => {
      this.dataSource = depts
      console.log(depts);

    })
  }


  editDepartment(row: any) {
    this.dialog.open(DialogDepartmentComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.getAllDepartment();
      }
    })
  }

}
