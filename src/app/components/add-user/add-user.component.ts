import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../User';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	name = new FormControl('',[Validators.required, Validators.pattern(/[^ ]{2,}[ ]+[^ ]{2,}.*/)]);
	email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService:UserService,
	      private router: Router) { }

  ngOnInit(): void {
  }

  reset():void{
	this.name.setValue('');
	this.email.setValue('');
  }

  addUserAndGoToWelcome(){
	alert(this.name.value + ' ' + this.email.value);
	const user:User = { name:this.name.value, email:this.email.value }; 
	this.userService.addUserAndMakeCurrent(user);
	this.router.navigate(['WelcomeUser']);

  }

  nameChange(name:string){
	  this.name.setValue(name);
  }
  emailChange(email:string){
	  this.email.setValue(email);
  }

  emptyOrNotUnique():boolean{
	return  this.name.value === '' || 
		this.email.value === '' ||
		!this.userService.isNameUnique(this.name.value) ||
		!this.userService.isEmailUnique(this.email.value);
  }


}
