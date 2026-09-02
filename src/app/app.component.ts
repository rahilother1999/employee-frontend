import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employees: any[] = [];

  newEmployee = {
    name: '',
    email: ''
  };

  editingEmployeeId: number | null = null;

  constructor(private employeeService: EmployeeService) { }

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

  addEmployee() {

    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: (employee) => {

        console.log('Employee created successfully', employee);

        this.employees.push(employee);

        this.newEmployee = {
          name: '',
          email: ''
        };
      },

      error: (error) => {
        console.error('Error creating employee', error);
      }
    });
  }

  editEmployee(employee: any) {

    this.editingEmployeeId = employee.id;

    this.newEmployee = {
      name: employee.name,
      email: employee.email
    };
  }

  updateEmployee() {

    if (this.editingEmployeeId === null) {
      return;
    }

    this.employeeService
      .updateEmployee(this.editingEmployeeId, this.newEmployee)
      .subscribe({
        next: (updatedEmployee) => {

          console.log('Employee updated successfully', updatedEmployee);

          const index = this.employees.findIndex(
            employee => employee.id === updatedEmployee.id
          );

          if (index !== -1) {
            this.employees[index] = updatedEmployee;
          }

          this.cancelEdit();
        },

        error: (error) => {
          console.error('Error updating employee', error);
        }
      });
  }

  cancelEdit() {

    this.editingEmployeeId = null;

    this.newEmployee = {
      name: '',
      email: ''
    };
  }

  deleteEmployee(id: number) {

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {

        console.log('Employee deleted successfully');

        this.employees = this.employees.filter(
          employee => employee.id !== id
        );
      },

      error: (error) => {
        console.error('Error deleting employee', error);
      }
    });
  }

}
