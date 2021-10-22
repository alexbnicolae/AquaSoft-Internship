import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component ({
    templateUrl: './login.component.html'
})

export class LoginComponent implements  OnInit, OnDestroy {
    private authStatusSub: Subscription
    constructor(public authService: AuthService) {}

    ngOnInit () {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                
            }
        )
    }
    onLogin(form: NgForm){
        if (form.invalid) {
            return
        }
        this.authService.login(form.value.email, form.value.password)
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe()
    }
}