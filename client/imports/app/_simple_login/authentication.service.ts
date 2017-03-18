import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersDatabase } from '../../../../imports/api/users-database.js';
 
export class User {
  constructor(
    public email: string,
    public password: string) { }
}

@Injectable()
export class AuthenticationService {
  constructor(
    private _router: Router){}
 
  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
  }

  login(user){
		this.users = this.get_users();
    var authenticatedUser = this.users.find(u => u.email === user.email);
    if (authenticatedUser && authenticatedUser.password === user.password){
      localStorage.setItem("user", authenticatedUser);
      this._router.navigate(['home']);      
      return true;
    }
    return false;
 
  }

   checkCredentials(){
    if (localStorage.getItem("user") === null){
        this._router.navigate(['login']);
    }
  }

	get_users(): User[] {
		console.log('get_users()');
		return UsersDatabase.find().map((messages: User[]) => { return messages; });
	}

	ngOnInit() {
	}
}
