import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, NgForm, Validators  } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Project } from "src/app/project/proj.model";
import { ProjService } from "src/app/project/proj.service";
import { Employer } from "../emp.model";
import { EmpService } from "../emp.service";

@Component({
    selector: 'app-emp-post2',
    templateUrl: './emp-post2.component.html',
    exportAs: 'ngForm',
})

export class EmpPost2Component implements OnInit, OnDestroy{
    mode = 'create';
    empId: string = null;
    emp: Employer;
    projs: Project[] = [];
    proje: Project;
    private projsSub!: Subscription;

    @ViewChild("empForm", { static: false }) empForm:NgForm;
    
    constructor (public empsService2: EmpService, public route: ActivatedRoute, public projService: ProjService) {}

    
    onProjectChanged(e) {
        return this.empForm.form.get("projectName").setValue(e)
    }
    
    ngOnInit() {
        this.projService.getProjs(); 
        this.projsSub = this.projService.getProjUpdatedListener().subscribe((projs: Project[]) => {
            this.projs = projs
        });
        
        this.route.paramMap.subscribe((paramMap) => {
            if (paramMap.has('empId')) {
                this.mode = 'edit'
                this.empId = paramMap.get('empId')
                this.empsService2.getEmp(this.empId).subscribe(empData => {
                    this.emp = {id: empData._id, Name: empData.Name, Adress: empData.Adress, Email: empData.Email, Hire_date: empData.Hire_date, Salary: empData.Salary, Job_title: empData.Job_title, project_id: empData.project_id}
                })
                
            } else {
                this.mode = 'create'
                this.empId = null;
            }
        });
    }

    onAddEmp(form: NgForm) {
        if(form.invalid) {
            return
        }
        if (this.mode === 'create') {
            this.empsService2.addEmp(form.value.id, form.value.name, form.value.address, form.value.email, form.value.date, form.value.salary, form.value.job_title, form.value.project_id)
        } else {
            this.empsService2.updateEmp(this.empId, form.value.name, form.value.address, form.value.email, form.value.date, form.value.salary, form.value.job_title, form.value.project_id)
        }
        form.resetForm()

    }

    ngOnDestroy() {
        this.projsSub.unsubscribe();
    }
}