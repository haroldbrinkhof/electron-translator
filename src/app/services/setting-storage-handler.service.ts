import { Injectable, OnInit } from '@angular/core';
import * as path from 'path';
const { app } = (<any>window).require('electron');
const  electron  = (<any>window).require('electron');
const storage = (<any>window).require('electron-json-storage');
import { Settings } from "../Settings";
import { ProjectData } from "../Project";
import * as tree from 'tree-kit';
import { User } from '../User';


@Injectable({
  providedIn: 'root'
})
export class SettingStorageHandlerService implements OnInit {
	private path:string;
	private data:Settings;

  constructor() {
	console.log(storage.getDefaultDataPath());
	console.log(storage.getDataPath());
	this.path = path.join(storage.getDataPath(), 'translator_config.json');
	this.data = this.load(); 	
	if(this.data === undefined){
		console.log('no settings found, installing new file');
		const settings = new Settings();
		settings.storagePath = '';
		settings.lastLoaded = '';
		this.data = settings;
		this.save();

	} else {
		console.log('settings file loaded: ' + this.data);
	}
  }

  ngOnInit(){

  }

  getSettingsFilePath():string{
	return this.path;
  }

  getCurrentUser():number{
	  return this.data.currentUser;
  }
  getKnownUsers():User[]{
	  return this.data.knownUsers;
  }

  setCurrentUser(index:number){
	  this.data.currentUser = index;
	  this.save();
  }
  setKnownUsers(knownUsers:User[]){
	this.data.knownUsers = knownUsers;
	this.save();
  }

  getProjects():ProjectData[]{
	return this.data.projects;
  }

  addProject(project:ProjectData){
	if(this.data.projects == undefined){
		this.data.projects = [];
	}
	this.data.projects.push(project);
	this.save();
  }

  get(key:string):string{
	  if(this.data !== null && this.data !== undefined){
		return this.data[key];
	  } else {
		  return null;
	  }
  }

  set(key:string, val:string){
	  this.data[key] = val;
	  this.save();
  }

  private save():void{
	  storage.set('translator_config', JSON.stringify(this.data));
  }

  private load():Settings | undefined{
	try{
		const data:Settings = JSON.parse(storage.getSync('translator_config'));
		return data;
	} catch(err){
		return undefined;
	}
  }
}
