import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';
import { Qualification } from '../../models/qualification.model';
import { Working } from '../../models/working.model';

import { Employee } from '../../models/employees.model';

import { EmployeeService } from '../employee.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { canComponentLeave } from '../create-employee-can-deactivate-gaurd.service';




@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;

  employee: Employee;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];
  data: Working[] = [
    { id: 1, name: 'DXC' },
    { id: 2, name: 'HP' },
    { id: 3, name: 'TechMahindra' },
    { id: 4, name: 'Infosys' },
    { id: 5, name: 'TCS' },
    { id: 6, name: 'Oracle' },
    { id: 7, name: 'Wipro' },
    { id: 8, name: 'SAP' },
    { id: 9, name: 'HCL' },
    { id: 10, name: 'Google' },
    { id: 11, name: 'CTS' }
  ];

  education: Qualification[] = [
    { id: 1, education: 'Tenth' },
    { id: 2, education: 'Intermediate' },
    { id: 3, education: 'B.Tech' },
    { id: 4, education: 'M.Tech' },
    { id: 5, education: 'BSC' },
    { id: 6, education: 'MSC' },
    { id: 7, education: 'M.COM' },
    { id: 8, education: 'MBA' }
  ];
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        martialStatus: null,
        department: 'select',
        address: null,
        working: 'select',
        qualification: 'select',
        isActive: null,
        photoPath: null,
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this.employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  saveEmployee(): void {
    if (this.employee.id == null) {
      this.employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this.router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
