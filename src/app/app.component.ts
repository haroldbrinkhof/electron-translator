import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationFileHandlerService } from './services/translation-file-handler.service';
import { SettingStorageHandlerService } from './services/setting-storage-handler.service';
import { ProjectService } from './services/project.service';
import { Translation } from './Translation';
import { Project, ProjectData } from './Project';
const  electron  = (<any>window).require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'electron-app';
  translations:Translation[] = [];
  selected:Translation;
  projects:Project[];
  notValidProject:boolean;
  pathUsed:string;
  currentProject:Project;

  constructor(private translationFileHandlerService:TranslationFileHandlerService, 
	     private settingStorageHandlerService:SettingStorageHandlerService,
	     private projectService:ProjectService,
	     private router: Router) {

        this.notValidProject = false;
	this.pathUsed = '';
	this.projects = this.projectService.getProjects();
  }

  ngOnInit(){
	  this.projectService.allProjects.subscribe((value:Project[]) => this.projects = value);
	  this.projectService.currentProject.subscribe((value:Project) =>{
		  if(value !== undefined ){ 
			  this.currentProject = value; 
		  }
	  }
						      );
	this.projects = this.projectService.getProjects();
  }

  onChange(value:String):void{
	  this.selected = this.translations.find(translation => translation.key === value);
  }

  selectProjectDirectory():void{
	var remote = electron.remote;
	var dialog = remote.require('electron').dialog;

	const path:string = dialog.showOpenDialogSync({
		title: "Select project directory",
    		properties: ['openDirectory']
		});
	this.pathUsed = path;	

	if(path !== undefined && path.length >= 1){
		const project:Project = this.translationFileHandlerService.openProjectFromDirectory(path[0]);
		if(project){
			this.notValidProject = false;
			this.projectService.freshlyImportedProject = project;
			this.router.navigate(['NameProject']);
		}
	 	else {
			this.notValidProject = true;

		}
	}
  }

  loadProjectFilesAndNavigate(target:string){
	const selectedProject:Project = this.projects.filter(p => p.storageDirectory === target)[0];
	if(selectedProject !== undefined){
		const project:Project = this.translationFileHandlerService.openProjectFromDirectory(selectedProject.storageDirectory, selectedProject.name);
		if(project){
			this.notValidProject = false;
			this.projectService.setCurrentProject(project);
			this.projectService.currentProject.next(project);
			this.router.navigate(['EditTranslations']);
		}
	 	else {
			this.notValidProject = true;
		}
	}
  }
}

