import { Component, OnDestroy, OnInit } from "@angular/core";
import { Employer } from "../emp.model";
import { EmpService } from "../emp.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Project } from "src/app/project/proj.model";
import { ProjService } from "src/app/project/proj.service";

@Component({
    selector: 'app-emp-list',
    templateUrl: './emp-list.component.html',
})
export class EmpListComponent implements OnInit, OnDestroy {
    emps: Employer[] = [];
    projs: Project[] = [];
    private empsSub!: Subscription;
    private projsSub!: Subscription;
    private authStatusSub: Subscription;
    userIsAuthtenticated = false;
    constructor(public empService: EmpService, private authService: AuthService, public projService: ProjService){}

    ngOnInit() {
        this.empService.getEmps(); 
        this.projService.getProjs(); 
        this.projsSub = this.projService.getProjUpdatedListener().subscribe((projs: Project[]) => {
            this.projs = projs
        });
        this.empsSub = this.empService.getEmpUpdatedListener()
        .subscribe((emps: Employer[]) => {
            this.emps = emps
            
        });
        this.userIsAuthtenticated = this.authService.getIsAuth()
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthtenticated => {
            this.userIsAuthtenticated = isAuthtenticated
        })
    }

    onDelete(empId: string) {
        this.empService.deleteEmp(empId);
    }

    ngOnDestroy() {
        this.empsSub.unsubscribe();
        this.projsSub.unsubscribe();
        this.authStatusSub.unsubscribe()
    }
}