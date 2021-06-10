import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StartNewProjectComponent } from '../start-new-project/start-new-project.component';
import { OpenProjectComponent } from '../open-project/open-project.component';
import { User } from '../../User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
	currentUser:User;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
	  this.currentUser = this.userService.getCurrentUser();
  }

}
