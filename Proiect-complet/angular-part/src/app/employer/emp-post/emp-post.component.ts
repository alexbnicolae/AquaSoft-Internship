import { Component } from "@angular/core";
import { NgForm  } from "@angular/forms";
import { EmpService } from "../emp.service";

@Component({
    selector: 'app-emp-post',
    templateUrl: './emp-post.component.html',
    exportAs: 'ngForm',
})

export class EmpPostComponent {

    constructor (public empsService: EmpService) {}

    onAddEmp(form: NgForm) {
        if(form.invalid) {
            return
        }
        this.empsService.addEmp(form.value.id, form.value.name, form.value.address, form.value.email, form.value.date, form.value.salary, form.value.job_title, form.value.project_id)
        form.resetForm()

    }
}