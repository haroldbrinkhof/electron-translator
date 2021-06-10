import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SettingStorageHandlerService } from '../../services/setting-storage-handler.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../Project';

@Component({
  selector: 'app-open-project',
  templateUrl: './open-project.component.html',
  styleUrls: ['./open-project.component.css']
})
export class OpenProjectComponent implements OnInit {
  private projects:Project[];
  private currentProjectIndex:number = -1;

  constructor(private projectService:ProjectService,
	      private router: Router) { }
	     

  ngOnInit(): void {
	this.projectService.allProjects.subscribe((value:Project[]) => this.projects = value);
	this.projectService.currentProjectIndex.subscribe((value:number) => this.currentProjectIndex = (value !== undefined) ? value : -1 );

	this.projects = this.projectService.getProjects();
  }

  getNotSelectedProjects():Project[]{
	const withoutCurrent:Project[] = [];
	for(let x:number = 0; x < this.projects.length; x++){
	        if(x !== this.currentProjectIndex){
			withoutCurrent.push(this.projects[x]);
		}
	}
	return withoutCurrent;
  }

  loadProjectFilesAndNavigate(target:string){
	if(this.projectService.loadProjectFromDirectoryAndSetAsCurrent(target)){
		this.router.navigate(['EditTranslations']);
	}
	else {
		alert('could not load the project at ' + target);
	}
  }
}
