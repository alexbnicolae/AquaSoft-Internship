import { Component, OnInit } from "@angular/core";
import { NgForm  } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../proj.model";
import { ProjService } from "../proj.service";

@Component({
    selector: 'app-proj-post',
    templateUrl: './project-post.component.html',
    exportAs: 'ngForm',
})

export class ProjPostComponent implements OnInit {
    mode = 'create';
    projId: string = null;
    proj: Project;

    constructor (public projsService: ProjService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (paramMap.has('projId')) {
                this.mode = 'edit'
                this.projId = paramMap.get('projId')
                this.projsService.getProj(this.projId).subscribe(empData => {
                    this.proj = {id: empData._id, project_name: empData.project_name, start_date: empData.start_date, planned_end_datetime: empData.planned_end_datetime, description: empData.description, project_code: empData.project_code}
                })
                
            } else {
                this.mode = 'create'
                this.projId = null;
            }
        });
    }

    onAddProj(form: NgForm) {
        if(form.invalid) {
            return
        }
        if (this.mode === 'create') {
            console.log("True")
            this.projsService.addProj(form.value.id, form.value.project_name, form.value.start_date, form.value.planned_end_datetime, form.value.description, form.value.project_code)
        }
        else {
            console.log("True")
            this.projsService.updateProj(this.projId, form.value.project_name, form.value.start_date, form.value.planned_end_datetime, form.value.description, form.value.project_code)
        }
        form.resetForm()

    }
}