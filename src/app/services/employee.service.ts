import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';


  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
