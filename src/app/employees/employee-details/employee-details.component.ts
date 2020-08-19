import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employees.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  private id: number;
  employee: Employee;
  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.employeeService.getEmployee(this.id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    });
  }

  viewNextEmployee() {
    if (this.id < 3) {
      this.id = this.id + 1;
    } else {
      this.id = 1;
    }

    this.router.navigate(['/employees', this.id], {
      queryParamsHandling: 'preserve'
    });
  }
}


