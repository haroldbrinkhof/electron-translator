import { Injectable } from '@angular/core';
import { SettingStorageHandlerService } from './setting-storage-handler.service';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private currentUser:number;
	private knownUsers:User[];

  constructor(private settingStorageHandlerService:SettingStorageHandlerService) { 
  	this.currentUser = settingStorageHandlerService.getCurrentUser();
  	this.knownUsers = settingStorageHandlerService.getKnownUsers();
	console.log('knownUsers: ' + this.knownUsers + ' index: ' + this.currentUser);
  }

  getCurrentUser():User | undefined{
	return this.knownUsers !== undefined ? this.knownUsers[this.currentUser] : undefined;
  }

  isNameUnique(name:string):boolean{
	return this.knownUsers.filter(u => u.name == name).length === 0;
  }
  isEmailUnique(email:string):boolean{
	return this.knownUsers.filter(u => u.email == email).length === 0;
  }
  addUser(user:User){
	this.knownUsers.push(user);
  }
  addUserAndMakeCurrent(user:User):boolean{
	if(this.isEmailUnique(user.email) && this.isNameUnique(user.name)){  
		this.addUser(user);
		this.currentUser =  this.knownUsers.length - 1;
		this.settingStorageHandlerService.setKnownUsers(this.knownUsers);
		this.settingStorageHandlerService.setCurrentUser(this.currentUser);
		return true;
	}
	return false;
  }
}
