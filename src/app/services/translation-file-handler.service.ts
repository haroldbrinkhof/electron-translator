import { Injectable } from '@angular/core';
import { Translation } from '../Translation';
import { Project, TranslationFile } from '../Project';
import * as path from 'path';
import { Dirent } from '../Dirent';
import * as parser from 'gettext-parser';
import { PoContent } from '../PoContent';
import * as tree from 'tree-kit';
import { pull } from 'isomorphic-git';
import http from 'isomorphic-git/http/web'


@Injectable({
  providedIn: 'root'
})
export class TranslationFileHandlerService {

  constructor() { }

  private async pullFromRepository(dir:string){
	  try{
		const fs = (<any>window).require('fs');
		await pull( {fs, http ,dir: dir, ref: 'master', 
			   singleBranch: true, author: { name:'dummy',email:'dummy@example.com'} });
		console.log('pull done for ' + dir);
	  } catch(err){
		console.log('error pulling git for ' + dir + ': ' + err);
	  }

  }

  openProjectFromDirectory(dir:string, projectName:string = ''):Project | undefined{
	  console.log('opening project from ' + dir);
	const project:Project = new Project();
//	this.pullFromRepository(dir);
	const files:Dirent[] = this.readFilesFromDirectory(dir);

	console.log(files.length + ' files read from ' + dir);
	if(files == undefined || files.length == 0) {
		return undefined;
	}

	files.filter(e => e.isFile() && this.isPotOrPo(e.name))
		.forEach(e => {
			const filename = path.join(dir, e.name);
			const file:TranslationFile = this.mapToTranslationFile(filename);
			file.data = this.parsePoFile(filename);
			file.originalData = (file.data !== undefined) ? tree.clone(file.data) : undefined;
			project.files.push(file);
		});
	project.storageDirectory = dir;
	project.name = projectName;

	if(project.files.filter(e => e.pot).length != 1){
		return undefined;
	}

	return project;

  }

  private parsePoFile(filename:string):PoContent | undefined{
	try{
		const fs = (<any>window).require('fs');
		const content:string = fs.readFileSync(filename)
		return parser.po.parse(content);
		
	} catch(err){
		console.log('error parsing PO file ' + filename + ': ' + err);
	}

	return undefined;  

  }
  private readFilesFromDirectory(dir:string):Dirent[] | undefined{
	let files:Dirent[];
	try{
		const fs = (<any>window).require('fs');
		files = fs.readdirSync(dir, {"withFileTypes": true});	
	} catch(err){ 
		console.log('error reading files from directory ' + dir + ': ' + err);       
	}
	return files;
  }

  isPotOrPo(filename:string):boolean{
	return this.isPo(filename) || this.isPot(filename);
  }

  isPot(filename:string):boolean{
	return filename.length > 4 && filename.endsWith(".pot");
  }

  isPo(filename:string):boolean{
	return filename.length > 3 && filename.endsWith(".po");
  }

  mapToTranslationFile(filename:string):TranslationFile {
	const translationFile:TranslationFile = new TranslationFile;
	translationFile.pot = this.isPot(filename); 
	translationFile.language = this.extractLanguage(filename); 
	translationFile.path = filename;
	translationFile.data = undefined;
	translationFile.originalData = undefined;
	return translationFile;
  }

  extractLanguage(filename:string):string{
	const parts:string[] = filename.toLowerCase().match(/^.*_([a-z]{2})\.po$/);
	return parts != null && parts.length == 2 ? parts[1] : "";
  }

  saveProject(project:Project):void{
	project.files.filter(f => f.isDirty).forEach(file => {
		this.savePoFile(file);
		file.isDirty = false;
	});

  }

  savePoFile(file:TranslationFile){
	console.log('------------');
	console.log('saving data:');
	console.log(file.data);
	const fs = (<any>window).require('fs');
	var output = parser.po.compile(file.data);
	fs.writeFileSync(file.path, output);
  }

  createNewLanguage(project:Project, language:string){
	const fs = (<any>window).require('fs');
	const potFile:TranslationFile = project.files.filter(f => f.pot)[0];
	const newPoPath:string = potFile.path.replace('.pot','_' + language + '.po');

        fs.copyFileSync(potFile.path, newPoPath);	

	const newLanguageFileData:PoContent = this.parsePoFile(newPoPath);
	const newLanguageFile:TranslationFile = this.mapToTranslationFile(newPoPath);
	newLanguageFile.data = newLanguageFileData;
	newLanguageFile.setLanguage(language);
	
	this.savePoFile(newLanguageFile);
  }
}
