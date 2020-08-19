import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';


@Injectable()

export class EmployeeDetailsGuardService implements CanActivate {
    // Make the class implements CanActivate guard service
    // we are implementing CanActivate guard service

    constructor(private employeeService: EmployeeService,
        private router: Router) { }

    // provide implementation for canActivate() method of CanActivate interface
    // Return true if navigation is allowed, otherwise false

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const employeeExists = !!this.employeeService.getEmployee(+route.paramMap.get('id'));

        if (employeeExists) {
            return true;
        } else {
            this.router.navigate(['/notfound']);
            return false;
        }
    }
}
