import { Component } from '@angular/core';
import { AuthenticationService, User } from './authentication.service'
import { UsersDatabase } from '../../../../imports/api/users-database.js'

@Component({
	selector: 'register-form',
	providers: [AuthenticationService],
	template: `
		<form (ngSubmit)="addUser(newId, newPassword)">
			<input [(ngModel)]="newId" type="text" name="text" placeholder="Type new Id"/>
			<input [(ngModel)]="newPassword" type="text" name="text" placeholder="Type new PW"/>
			<input type="submit" value="Submit">
		</form>
		<div>
			<ul *ngFor="let user of users">
				<li>{{user.email}}</li>
			</ul>
		</div>
	`
})

export class RegisterComponent {
	newId = '';
	newPassword = '';
	users: User[] = [];

	constructor( private _service:AuthenticationService ) { }

	addUser(newId, newPassword) {
		UsersDatabase.insert({
			email: newId,
			password: newPassword,
			createdAt: new Date
		});
		this.newId = '';
		this.newPassword = '';
	}
	ngOnInit() {
		this.users = this._service.get_users();
		$('body').addClass('is_register_components');
	}
}
