import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  title = 'employee-frontend';

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

}
