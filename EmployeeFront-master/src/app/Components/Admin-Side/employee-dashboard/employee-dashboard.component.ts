import { DialogDepartmentComponent } from './../dialog-department/dialog-department.component';
import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { DialogEmployeeComponent } from './../dialog-employee/dialog-employee.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEmployee } from 'src/app/Models/iemployee';
import { EmployeeAdminServiceService } from 'src/app/Services/employee-admin-service.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  dataSource: IEmployee[] = [];
  managers: IEmployee[] = [];


  constructor(public dialog: MatDialog, private cusService: EmployeeAdminServiceService) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllManagers();
  }
  openDialog() {
    this.dialog.open(DialogEmployeeComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val == 'Save') {
        this.getAllEmployees();
      }
    })
  }
  deleteCustomer(cusID: number) {
    this.cusService.deleteEmployee(cusID).subscribe(product => {
      alert("Customer Deleted");
      this.cusService.getAllEmployees().subscribe(customers => {
        this.dataSource = customers

      })
    })

  }

  showDetails(row: any) {
    this.dialog.open(EmployeeDetailsComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      // this.getAllCustomers();
    })
  }

  getAllEmployees() {
    this.cusService.getAllEmployees().subscribe(employees => {
      this.dataSource = employees
      console.log(employees);

    })
  }

  getAllManagers() {
    this.cusService.getAllManagers().subscribe(managers => {
      this.managers = managers
      console.log(managers);

    })
  }

  editCustomer(row: any) {
    this.dialog.open(DialogEmployeeComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'Update') {
        this.getAllEmployees();
      }
    })
  }

}
