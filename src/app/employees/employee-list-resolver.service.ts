import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employees.model';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { ResolvedEmployeeList } from '../employees/resolved-employeelist.model';


@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
    errorHandler: any;
    constructor(private employeeService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this.employeeService.getEmployees()
            .pipe(

                // tslint:disable-next-line: deprecation
                catchError((err: string) => Observable.throw(this.errorHandler(err)))
            );
    }
}
