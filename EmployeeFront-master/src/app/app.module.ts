import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './Components/Admin-Side/admin-header/admin-header.component';
import { AdminLayoutComponent } from './Components/Admin-Side/admin-layout/admin-layout.component';
import { AdminSidenavComponent } from './Components/Admin-Side/admin-sidenav/admin-sidenav.component';
import { HomeAdminComponent } from './Components/Admin-Side/home-admin/home-admin.component';
import { EmployeeDashboardComponent } from './Components/Admin-Side/employee-dashboard/employee-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { DialogEmployeeComponent } from './Components/Admin-Side/dialog-employee/dialog-employee.component';
import { EmployeeDetailsComponent } from './Components/Admin-Side/employee-details/employee-details.component';
import { DepartmentDashboardComponent } from './Components/Admin-Side/department-dashboard/department-dashboard.component';
import { DepartmentDetailsComponent } from './Components/Admin-Side/department-details/department-details.component';
import { DialogDepartmentComponent } from './Components/Admin-Side/dialog-department/dialog-department.component';
import { CommonModule } from '@angular/common';
import { AdminModule } from './Components/Admin-Side/admin.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
