import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../Models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAdminServiceService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<IEmployee[]> {

    return this.httpClient.get<IEmployee[]>(`${environment.APIURL}/Employee`)

  }

  getAllManagers(): Observable<IEmployee[]> {

    return this.httpClient.get<IEmployee[]>(`${environment.APIURL}/Employee/getmanagers`)

  }

  getEmployeeByID(EmployeeID: number): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(`${environment.APIURL}/Employee/${EmployeeID}`)

  }

  addEmployee(newEmployee: any) {
    return this.httpClient.post<any>(`${environment.APIURL}/Employee`, newEmployee)
  }
  updateEmployee(EmployeeID: number, UpdatedEmployee: any) {
    return this.httpClient.put<any>(`${environment.APIURL}/Employee/${EmployeeID}`, UpdatedEmployee)

  }

  deleteEmployee(EmployeeID: number): Observable<IEmployee> {
    return this.httpClient.delete<IEmployee>(`${environment.APIURL}/Employee/${EmployeeID}`)

  }
}
