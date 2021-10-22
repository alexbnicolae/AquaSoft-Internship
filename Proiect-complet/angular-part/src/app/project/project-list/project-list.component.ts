import { Component, OnDestroy, OnInit } from "@angular/core";
import { Project }  from "../proj.model";
import { ProjService } from "../proj.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector: 'app-proj-list',
    templateUrl: './project-list.component.html',
})
export class ProjListComponent implements OnInit, OnDestroy {
    projs: Project[] = [];
    private projsSub!: Subscription;
    private authStatusSub: Subscription;
    userIsAuthtenticated = false;
    constructor(public projService: ProjService, private authService: AuthService){}

    ngOnInit() {
        this.projService.getProjs(); 
        this.projsSub = this.projService.getProjUpdatedListener().subscribe((projs: Project[]) => {
            this.projs = projs
        });
        this.userIsAuthtenticated = this.authService.getIsAuth()
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthtenticated => {
            this.userIsAuthtenticated = isAuthtenticated
        })
    }

    onDelete(projId: string) {
        this.projService.deletePost(projId);
    }

    ngOnDestroy() {
        this.projsSub.unsubscribe();
        this.authStatusSub.unsubscribe()
    }
}