import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project, ProjectData, Mode, TranslationFile } from '../Project';
import { SettingStorageHandlerService } from './setting-storage-handler.service';
import { TranslationFileHandlerService } from './translation-file-handler.service';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
	freshlyImportedProject:Project;
	private _currentProject:Project;
	currentProject:BehaviorSubject<Project> = new BehaviorSubject(undefined);
	private _allProjects:Project[];
	allProjects:BehaviorSubject<Project[]> = new BehaviorSubject([]);

  constructor(private settingStorageHandlerService:SettingStorageHandlerService, private translationFileHandlerService:TranslationFileHandlerService) {
	  this._allProjects = this.settingStorageHandlerService.getProjects()?.map(p => this.loadProjectFormSettingsData(p));
	  this.allProjects.next(this._allProjects);
  }

  loadProjectFormSettingsData(p:ProjectData):Project{
	const project:Project = this.translationFileHandlerService.openProjectFromDirectory(p.storageDirectory, p.name);
	if(project !== undefined){
		project.name = p.name;
		project.storageDirectory = p.storageDirectory;
	}
	return project;
  }

  getOriginalTranslationFor(filePath:string, key:string, mode:Mode):string | undefined{
	const translationFile:TranslationFile = this.getTranslationFileForPath(filePath);
	if(this._currentProject === undefined || this._currentProject.files === undefined ||
		translationFile === undefined || translationFile.data === undefined || 
		translationFile.data.translations === undefined ||
	  	translationFile.data.translations[''][key] === undefined){
		return undefined;
	}

	return translationFile.originalData.translations[''][key].msgstr[mode];
  }

  getTranslationFileForPath(path:string):TranslationFile | undefined{
	if(this._currentProject !== undefined && this._currentProject.files !== undefined &&
	  path !== undefined){
		const files:TranslationFile[] = this._currentProject.files.filter(f => f.path === path);
		if(files.length === 1){
			return files[0];
		}
	}

	return undefined;
  }

  getProjects():Project[]{
	return this._allProjects;
  }

  isProjectnameUnique(name:string):boolean{
	if(name == null || name == undefined) {
		return false;
	}

	return this._allProjects == undefined || this._allProjects == null || this._allProjects.filter(p => p.name == name).length == 0; 
  }

  addProject(project:Project):Project[] | undefined{
	if(!this.isProjectnameUnique(project.name)){
	      return undefined;
	}

	if(this._allProjects == null || this._allProjects == undefined){
	      this._allProjects = [];	
	}
	this._allProjects.push(project);
	this.allProjects.next(this._allProjects);
	const projectData:ProjectData = new ProjectData()
	projectData.name = project.name;
	projectData.storageDirectory = path.dirname(project.getPotFile().path);
	this.settingStorageHandlerService.addProject(projectData);
	return this._allProjects;
  }

  setCurrentProject(project:Project):void{
	this._currentProject = project;
	this.freshlyImportedProject = undefined;
	this.currentProject.next(this._currentProject);
  }

}
