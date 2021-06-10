import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SettingStorageHandlerService } from './services/setting-storage-handler.service';
import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';
import { Translation } from './Translation';
import { Project, ProjectData } from './Project';
import { log, ReadCommitResult } from 'isomorphic-git';
import { StartNewProjectComponent } from './components/start-new-project/start-new-project.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Translator';
  translations:Translation[] = [];
  selected:Translation;
  projects:Project[];
  notValidProject:boolean;
  currentProject:Project;

  constructor(	
	     	private settingStorageHandlerService:SettingStorageHandlerService,
		private projectService:ProjectService,
	     	private userService:UserService,
	     	private router: Router) { }

  ngOnInit(){
	this.projectService.currentProject.subscribe((value:Project) => this.currentProject = value );
	if(this.userService.getCurrentUser() === undefined){
		this.router.navigate(['AddUser']);
	} else{
		this.router.navigate(['WelcomeUser']);
	}

  }

  onChange(value:String):void{
	  this.selected = this.translations.find(translation => translation.key === value);
  }


}

