import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { TranslationFileHandlerService } from '../../services/translation-file-handler.service';
import { Project } from '../../Project';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-start-new-project',
  templateUrl: './start-new-project.component.html',
  styleUrls: ['./start-new-project.component.css']
})
export class StartNewProjectComponent implements OnInit {
	private freshlyImportedProject:Project;
	pathUsed:string = '';
	nameForm:FormControl = new FormControl('', [Validators.required]);
	project:Project;

  constructor(private translationFileHandlerService:TranslationFileHandlerService,
	      private projectService:ProjectService, 
	      private router:Router
	     ) { }

  ngOnInit(): void {
  }

  selectProjectDirectory():void{
	const  electron  = (<any>window).require('electron');
	var dialog = electron.remote.require('electron').dialog;

	const path:string = dialog.showOpenDialogSync({
		title: "Select project directory",
    		properties: ['openDirectory']
		});
	this.pathUsed = path[0];	

	if(this.pathUsed !== undefined && this.pathUsed.length >= 1){
		const project:Project = this.translationFileHandlerService.openProjectFromDirectory(this.pathUsed);
		if(project){
			this.project = project;
			this.freshlyImportedProject = project;
			this.projectService.freshlyImportedProject = project;
			//this.router.navigate(['NameProject']);
		}
	}
  }

  isValidProjectName():boolean{
	return this.nameForm.value.trim().length > 0 && 
		this.projectService.isProjectnameUnique(this.nameForm.value.trim());
  }

  finalizeProjectImport():void{
	  if(this.project !== undefined && this.pathUsed !== undefined && 
	     this.pathUsed.length > 0 && 
	     this.projectService.isProjectnameUnique(this.nameForm.value)){
			this.project.name = this.nameForm.value;
			this.projectService.addProjectAndSetAsCurrent(this.project);
			this.router.navigate(['EditTranslations']);
	  }

  }
}
