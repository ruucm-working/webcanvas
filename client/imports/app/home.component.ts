import template from './home.component.html';
import homecss from './css/home.css';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from './router.animations';

// import { User } from './_models/index';
// import { UserService } from './_services/index';

@Component({
	selector: 'my-home',
	template: template,
	homecss,
	animations: [routerTransition('left')],
	host: {'[@routerTransition]': ''},
})
export class HomeComponent implements OnInit {
    // currentUser: User;
    // users: User[] = [];
 
    // constructor(private userService: UserService) {
    //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // }
 
    // ngOnInit() {
    //     this.loadAllUsers();
    // }
 
    // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    // }
 
    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }
}