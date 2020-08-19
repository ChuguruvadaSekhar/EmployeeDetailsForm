import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from '../employees/create-employee/create-employee.component';


// tslint:disable-next-line:class-name
export interface canComponentLeave {
    canLeave: () => boolean;
}

@Injectable()
export class CreateEmployeeCanDeactivateGuardService
    implements CanDeactivate<canComponentLeave> {

    constructor() { }

    canDeactivate(component: canComponentLeave): boolean {
        if (component.canLeave) {
            return component.canLeave();
        }

        return true;
    }
}
