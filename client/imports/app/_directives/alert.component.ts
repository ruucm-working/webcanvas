import template from './alert.component.html'
import { Component, OnInit } from '@angular/core';
 
import { AlertService } from '../_services/index';
 
@Component({
    selector: 'alert',
    template: template
})
 
export class AlertComponent {
    message: any;
 
    constructor(private alertService: AlertService) { }
 
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
