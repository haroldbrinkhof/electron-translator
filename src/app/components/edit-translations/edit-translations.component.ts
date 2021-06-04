import { Component, OnInit } from '@angular/core';
import { Project, TranslationFile } from '../../Project';
import { ProjectService } from '../../services/project.service'
import { TranslationFileHandlerService } from '../../services/translation-file-handler.service'
import { BehaviorSubject } from 'rxjs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule, MatSelectionListChange } from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-edit-translations',
  templateUrl: './edit-translations.component.html',
  styleUrls: ['./edit-translations.component.css']
})
export class EditTranslationsComponent implements OnInit {
  keys:string[] = [];
  projectName:string;
  currentKey:BehaviorSubject<string> = new BehaviorSubject('');
  currentProject:Project;
  private filterForDirty = false;
  private filterForMissing = false;
  dirtyCount:number = 0;
  missingCount:number = 0;

  constructor(private projectService:ProjectService, private translationFileHandlerService:TranslationFileHandlerService) { }

  ngOnInit(): void {
	  //this.keys = this.getKeys();
	  console.log(this.keys);
	  this.projectService.currentProject.subscribe((value:Project) => {
		  this.currentProject = value;
		  this.keys = this.getKeys(this.currentProject);
		  this.dirtyCount = this.currentProject.numberOfTranslationKeys(true, false);
		  this.missingCount = this.currentProject.numberOfTranslationKeys(false, true);
		  console.log('setting project to ' + JSON.stringify(value) + ' using subscribe' );
		  console.log('setting project ' + value.name + ' using subscribe' );
	  }
						      );
  }

  private getKeys(project:Project):string[]{
	  return project.getTranslationKeys(this.filterForDirty, this.filterForMissing);
  }

  selectedTranslationKey(key:MatSelectionListChange):void{
	console.log('selected translation key: ' + key.options[0].value);
	this.currentKey.next(key.options[0].value);
  }

  textChanged(event:string){
	  if(event !== undefined){
		  this.keys = this.getKeys(this.currentProject);
		  this.dirtyCount = this.currentProject.numberOfTranslationKeys(true, false);
		  this.missingCount = this.currentProject.numberOfTranslationKeys(false, true);
	  }
	console.log('parent: text changed ' + event);
  }

  saveAction():void{
	this.translationFileHandlerService.saveProject(this.currentProject);
  }

  addNewTranslationAction(key:string):void{
	if(key !== undefined && key.trim().length > 0){
		this.currentProject.files.forEach(f => f.addNewTranslationKey(key));  
		this.keys = this.getKeys(this.currentProject);
	}
  }

  addNewLanguageAction(language:string):void{
	this.translationFileHandlerService.createNewLanguage(this.currentProject, language)
  }

  dirtyFilterChange(state:boolean){
	this.filterForDirty = state;
	this.keys = this.getKeys(this.currentProject);
  }

  onlyMissingFilterChange(state:boolean){
	this.filterForMissing = state;
	this.keys = this.getKeys(this.currentProject);
  }

}
