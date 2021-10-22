import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employer } from './emp.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class EmpService {
    private emps: Employer[] = [];
    private empUpdated = new Subject<Employer[]>();
   
    constructor(private http: HttpClient, private router: Router) {}

    getEmps(){
        this.http.get<{employees: any}>('http://localhost:3000/employees')
        .pipe(map((empData) => {
            return empData.employees.map(emp => {
                return {
                    id: emp._id,
                    Name: emp.Name,
                    Adress: emp.Adress,
                    Email: emp.Email,
                    Hire_date: new Date(emp.Hire_date).toDateString(),
                    Salary: emp.Salary,
                    Job_title: emp.Job_title,
                    project_id: emp.project_id
                }
            })
        }))
        .subscribe((transformedEmpData) => {
            this.emps = transformedEmpData;
            this.empUpdated.next(this.emps)
            
        });
    }

    getEmpUpdatedListener() {
        return this.empUpdated.asObservable();
    }

    getEmp(id: string) {
        return this.http.get<{_id: string, Name: string, Adress: string, Email: string, Hire_date: Date, Salary: number, Job_title: string, project_id: string}>("http://localhost:3000/employees/" + id);
    }

    addEmp(id: string, Name: string, Adress: string, Email: string, Hire_date: Date, Salary: number, Job_title: string, project_id: string) {
        const emp: Employer = {id: id, Name: Name, Adress: Adress, Email: Email, Hire_date: Hire_date, Salary: Salary, Job_title: Job_title, project_id: project_id};
        this.http
            .post("http://localhost:3000/employees", emp)
            .subscribe(() => {
                this.emps.push(emp)
                this.empUpdated.next([...this.emps])
                this.router.navigate["/employees"]
            })
    }

    updateEmp(id: string, Name: string, Adress: string, Email: string, Hire_date: Date, Salary: number, Job_title: string, project_id: string) {
        const emp: Employer = {id: id, Name: Name, Adress: Adress, Email: Email, Hire_date: Hire_date, Salary: Salary, Job_title: Job_title, project_id: project_id};
        this.http.patch("http://localhost:3000/employees/" + id, emp)
        .subscribe(response => {
            const updatedEmps = [...this.emps]
            const oldEmpIndex = updatedEmps.findIndex(p => p.id === emp.id)
            updatedEmps[oldEmpIndex] = emp
            this.emps = updatedEmps
            this.router.navigate["/employees"]
            this.empUpdated.next([...this.emps])
            
            
        })

    }

    deleteEmp(empId: string) {
        this.http.delete("http://localhost:3000/employees/" + empId)
        .subscribe(() => {
            const updatedProjs = this.emps.filter(proj => proj.id !== empId)
            this.emps = updatedProjs
            this.empUpdated.next(this.emps)
        })
    }
}