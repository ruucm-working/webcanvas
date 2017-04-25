import { Component, ElementRef } from '@angular/core';
import { AuthenticationService, User } from './authentication.service'

@Component({
	selector: 'login-form',
	providers: [ AuthenticationService ],
	template: `
		<div class="container" >
			<div class="panel-body">
				<div class="row">
					<div class="title">Welcome</div>
				</div>
				<div class="row">
					<div class="input-field">
						<input [(ngModel)]="user.email" id="email" 
							type="email" class="validate">
						<label for="email">Email</label>
					</div>
				</div>

				<div class="row">
					<div class="input-field">
						<input [(ngModel)]="user.password" id="password" 
							type="password" class="validate">
						<label for="password">Password</label>
					</div>
				</div>

				<div class="row">
					<span>{{errorMsg}}</span>
					<button (click)="login()" 
						class="btn waves-effect waves-light" 
						type="submit" name="action">Login</button>
				</div>
			</div>
		</div>
		`
})
export class LoginComponent {
	public user = new User('','');
	public errorMsg = '';

	constructor(
		private _service:AuthenticationService) {}
	ngOnInit() {
		Meteor.subscribe("usersdatabase", {
			onReady: function () {
				console.log('onReady');
			},
			onError: function () { console.log("onError", arguments); }
		});
		$('body').addClass('is_login_components');
	}
	login() {
		if(!this._service.login(this.user)){
			this.errorMsg = 'Failed to login';
		}
	}
}
