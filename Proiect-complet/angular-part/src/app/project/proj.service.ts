import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './proj.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class ProjService {
    private projs: Project[] = [];
    private projUpdated = new Subject<Project[]>();
   
    constructor(private http: HttpClient, private router: Router) {}

    getProjs(){
        this.http.get<{projects: any}>('http://localhost:3000/projects')
        .pipe(map((projData) => {
            return projData.projects.map(proj => {
                return {
                    id: proj._id,
                    project_name: proj.project_name,
                    start_date: proj.start_date,
                    planned_end_datetime: proj.planned_end_datetime,
                    description: proj.description,
                    project_code: proj.project_code,
                }
            })
        }))
        .subscribe((transformedProjData) => {
            this.projs = transformedProjData;
            this.projUpdated.next(this.projs)
            
        });
    }

    getProjUpdatedListener() {
        return this.projUpdated.asObservable();
    }

    getProj(id: string) {
        return this.http.get<{_id: string, project_name: string,  start_date: Date, planned_end_datetime: Date, description: string, project_code: string}>("http://localhost:3000/projects/" + id);
    }

    addProj(id: string, project_name: string,  start_date: Date, planned_end_datetime: Date, description: string, project_code: string) {
        const proj: Project = {id: id, project_name: project_name, start_date: start_date, planned_end_datetime: planned_end_datetime, description: description, project_code: project_code};
        this.http
            .post("http://localhost:3000/projects", proj)
            .subscribe(() => {
                this.projs.push(proj)
                this.projUpdated.next([...this.projs])
            })
    }

    updateProj(id: string, project_name: string,  start_date: Date, planned_end_datetime: Date, description: string, project_code: string) {
        const proj: Project = {id: id, project_name: project_name, start_date: start_date, planned_end_datetime: planned_end_datetime, description: description, project_code: project_code};
        this.http.patch("http://localhost:3000/projects/" + id, proj)
        .subscribe(response => {
            const updatedEmps = [...this.projs]
            const oldEmpIndex = updatedEmps.findIndex(p => p.id === proj.id)
            updatedEmps[oldEmpIndex] = proj
            this.projs = updatedEmps
            this.projUpdated.next([...this.projs])
            this.router.navigate["/"]
        })

    }

    deletePost(projId: string) {
        this.http.delete("http://localhost:3000/projects/" + projId)
        .subscribe(() => {
            const updatedProjs = this.projs.filter(proj => proj.id !== projId)
            this.projs = updatedProjs
            this.projUpdated.next(this.projs)
        })
    }

}