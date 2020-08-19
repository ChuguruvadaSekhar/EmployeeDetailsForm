import { Employee } from '../models/employees.model';

export class ResolvedEmployeeList {
    constructor(public employeeList: Employee[], public error: any = null) { }
}
