import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../Project';

@Component({
  selector: 'app-name-project',
  templateUrl: './name-project.component.html',
  styleUrls: ['./name-project.component.css']
})
export class NameProjectComponent implements OnInit {
	project:Project;
	nameForm:FormControl = new FormControl('', Validators.required);

  constructor(private projectService:ProjectService, private router:Router) { }

  ngOnInit(): void {
	  this.project = this.projectService.freshlyImportedProject;
  }

  isValidProjectName():boolean{
	return this.nameForm.value.trim().length > 0 && this.projectService.isProjectnameUnique(this.nameForm.value.trim());
  }

  finalizeProjectImport():void{
	this.project.name = this.nameForm.value;
	this.projectService.setCurrentProject(this.project);
	this.projectService.addProject(this.project);
	this.router.navigate(['EditTranslations']);

  }

}
