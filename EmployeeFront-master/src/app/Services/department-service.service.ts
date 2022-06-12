import { IDepartment } from '../Models/IDepartment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../Models/iemployee';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  getAllDepartments(): Observable<IDepartment[]> {

    return this.httpClient.get<IDepartment[]>(`${environment.APIURL}/Department`)

  }
  getDepartmentID(DepartmentId: number): Observable<IDepartment> {
    return this.httpClient.get<IDepartment>(`${environment.APIURL}/Department/${DepartmentId}`)

  }

  addDepartment(newDept: any) {
    return this.httpClient.post<any>(`${environment.APIURL}/Department`, newDept)
  }
  updateDepartment(deptID: number, updatedDepartment: any) {
    return this.httpClient.put<any>(`${environment.APIURL}/Department/${deptID}`, updatedDepartment)

  }

  deleteDepartment(departmentId: number): Observable<IDepartment> {
    return this.httpClient.delete<IDepartment>(`${environment.APIURL}/Department/${departmentId}`)
  }
}
