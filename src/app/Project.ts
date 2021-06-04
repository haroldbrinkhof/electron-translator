import { PoContent } from './PoContent';

export class ProjectData{
	name:string;
	storageDirectory:string;
}

export class Project{
	name:string;
	storageDirectory:string;
	files:TranslationFile[] = [];

	onlyPoFiles():TranslationFile[] | undefined{
		return (this.files === undefined) ? [] : this.files.filter((f) => !f.pot) ;
	}

	getPotFile():TranslationFile | undefined{
		return (this.files === undefined) ? undefined : this.files.filter((f) => f.pot)[0] ;
	}

	numberOfTranslationKeys(dirtyOnly:boolean = false, missingOnly:boolean = false):number{
		return this.getTranslationKeys(dirtyOnly, missingOnly).length;
	}

	getTranslationKeys(dirtyOnly:boolean = false, missingOnly:boolean = false):string[]{
		const potFile = this.getPotFile();
		return potFile == undefined ? [] : 
		Object.keys(potFile.data.translations[""]).filter(e => e !== "")
		.filter(e => !dirtyOnly || (dirtyOnly && this.isDirty(e)))
		.filter(e => !missingOnly || (missingOnly && this.isMissing(e)))
		;
	}

	private isDirty(key:string):boolean{
		return this.onlyPoFiles()
		.map(file => file.getCommentVariable(key, CommentVariable.Dirty) != '')
		.reduce((acc, val) => acc || val, false);

	}

	private isMissing(key:string):boolean{
		return this.onlyPoFiles()
		.map(file => file.getTranslation(key, Mode.Singular) == '')
		.reduce((acc, val) => acc || val, false);

	}


}

export class TranslationFile{
	pot:boolean;
	language:string;
	path:string;
	isDirty:boolean = false;
	data:PoContent;
	originalData:PoContent;


	addNewTranslationKey(key:string):void{
		if(this.data !== undefined && this.data.translations !== undefined 
		   && key !== '' && !(key in this.data.translations['']) ){
			this.data.translations[''][key] = { "msgid": key, "msgstr": [""] };
			this.isDirty = true;
		}
	}

	private getFlagComment(key:string):string[]{
		if(key !== undefined && key !== '' && 
		   key in this.data.translations[''] && 
		   this.data.translations[''][key].comments !== undefined &&
		   this.data.translations[''][key].comments['flag'] !== undefined &&
		   this.data.translations[''][key].comments['flag'] !== ''){

			return this.data.translations[''][key].comments['flag'].split(/\r?\n/);
		} else {
			return [];
		}
	}

	private setFlagComment(key:string, values:string[]):void{
		if(key !== undefined && key !== '' && values !== undefined &&
		   key in this.data.translations[''] && 
		   this.data.translations[''][key] !== undefined){
			if(this.data.translations[''][key].comments == undefined){
				this.data.translations[''][key].comments = [];	
			}
			this.data.translations[''][key].comments['flag'] = values.join("\n");
		}
		
	}

        getCommentVariable(key:string, variable:CommentVariable):string{
		const flagValues:string[] = this.getFlagComment(key);
		const found:string[] = flagValues.filter(f => f.startsWith(variable));

		return (found.length == 0) ? '' : found[0].replace(variable + ' ','').replace(/@BR@/g, "\n");
        }

	setCommentVariable(key:string, variable:CommentVariable, value:string){
		const escapedValue = value.replace(/\r?\n/g,'@BR@');
		const flagValues:string[] = this.getFlagComment(key);
		const alreadyThere:boolean = flagValues.filter(f => f.startsWith(variable)).length > 0;
		const alteredFlagValues:string[] = (alreadyThere) ? this.deleteOrReplaceExistingCommentVariable(flagValues, variable, escapedValue): flagValues.concat([ variable + ' ' + escapedValue ]);
		this.setFlagComment(key, alteredFlagValues);
	      	this.isDirty = true;
	}

	private deleteOrReplaceExistingCommentVariable(flagValues:string[], variable:CommentVariable, value:string):string[]{
		return (value.trim() === '')? this.deleteExistingCommentVariable(flagValues, variable) : this.replaceExistingCommentVariable(flagValues, variable, value);
	}
	
	private replaceExistingCommentVariable(flagValues:string[], variable:CommentVariable, value:string):string[]{
		return flagValues.map(f => (f.startsWith(variable))?variable + ' ' + value.trim():f);
	}

	private deleteExistingCommentVariable(flagValues:string[], variable:CommentVariable):string[]{
		return flagValues.filter(f => !f.startsWith(variable));
	}

	getTranslation(key:string, mode:Mode):string{
		return (key !== '' && key in this.data.translations[''])?this.data.translations[''][key].msgstr[mode] : '';
  	}

	setTranslation(key:string, mode:Mode, value:string):void{
		if(key !== '' && key in this.data.translations[""]){
	      		this.data.translations[''][key].msgstr[mode] = value;
	      		this.isDirty = true;
		} 
	}

	setLanguage(language:string){
		this.data.headers['Language'] = language;
		this.language = language;
	}


}

export enum CommentVariable {
	Dirty = 'dirty',
	Approved = 'approved',
	Context = 'context',
};
export enum Mode{
	Singular = 0,
	Plural = 1,
};
