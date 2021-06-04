import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslationFile, CommentVariable, Mode } from '../../../Project'
import { ProjectService } from '../../../services/project.service'
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-specific-language-editor',
  templateUrl: './specific-language-editor.component.html',
  styleUrls: ['./specific-language-editor.component.css']
})
export class SpecificLanguageEditorComponent implements OnInit {
	@Input() currentFile:TranslationFile;
	@Input() currentKey:BehaviorSubject<String>;
	@Output() textChangedEvent = new EventEmitter<string>();
	translationSingularText:string;
	translationPluralText:string;
	translationContextText:string;
	private _currentKey:string;
	dirtyMarker:string;
	approvedMarker:string;
	isApproved:boolean;
	textChanged:boolean;
	asciidocContent:string;
	private _textChanged:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private projectService:ProjectService) {
  }

  ngOnInit(): void {
	this.currentKey.subscribe((value:string) => this.keyChanged(value));
	this._textChanged.subscribe((value:boolean) => this.textChanged = value);
  }

  private asciidocToHtml(source:string):string{
	const asciidoctor = (<any>window).require('asciidoctor')();
	const content = asciidoctor.convert(source);
	return content;
  }

  private keyChanged(key:string){
	console.log('key changed: ' + key);
	this.translationSingularText = this.currentFile.getTranslation(key, Mode.Singular); 
	this.translationPluralText = this.currentFile.getTranslation(key, Mode.Plural); 
	this.translationContextText = this.currentFile.getCommentVariable(key, CommentVariable.Context);
	this.asciidocContent = this.asciidocToHtml(this.translationContextText);
	this.dirtyMarker = this.getDirtyMarker(key);
	this.approvedMarker = this.getApprovedMarker(key);
	this.isApproved = this.approvedMarker !== '';
	this._currentKey = key;
	this.markTextChangedIfApplicable();
  }


  private getDirtyMarker(key:string):string{
	return this.currentFile.getCommentVariable(key, CommentVariable.Dirty);
  }
  private getApprovedMarker(key:string):string{
	return this.currentFile.getCommentVariable(key, CommentVariable.Approved);
  }


  private setDirtyMarker(marker:string):string{
	this.currentFile.setCommentVariable(this._currentKey, CommentVariable.Dirty, marker);
	return this.currentFile.getCommentVariable(this._currentKey, CommentVariable.Dirty);
  }

  private setApprovedMarker(marker:string):string{
	this.currentFile.setCommentVariable(this._currentKey, CommentVariable.Approved, marker);
	return this.currentFile.getCommentVariable(this._currentKey, CommentVariable.Approved);
  }

private markTranslationAsDirty(){
	this.dirtyMarker = this.setDirtyMarker(Date());
	this.isApproved = false;
	this.setApprovedMarker('');
  }
  private markTranslationAsApproved(){
	this.dirtyMarker = this.setDirtyMarker('');
	this.approvedMarker = this.setApprovedMarker('dummy user on ' + Date());
	this.isApproved = true;
	this.textChangedEvent.emit('');
  }

  setTranslationAction():void{
	console.log('setTranslationAction');  
	this.translationChanged(this.translationSingularText, Mode.Singular);
	this.translationChanged(this.translationPluralText, Mode.Plural);
	this.translationContextChanged(this.translationContextText);

	this.markTranslationAsDirty();
	this.textChangedEvent.emit('');
  }

  approveDirtyTranslationAction():void{
	this.markTranslationAsApproved();
  }

  resetTranslationsAction():void{
	this.translationSingularText = this.currentFile.getTranslation(this._currentKey, Mode.Singular);
	this.translationPluralText = this.currentFile.getTranslation(this._currentKey, Mode.Plural);
	this.textChanged = false;
  }


  private translationChanged(text:string, mode:Mode):void{
	this.currentFile.setTranslation(this._currentKey, mode, text);
	this.textChangedEvent.emit(text);
  }

  private translationContextChanged(text:string):void{
	  console.log('translationContextChanged');
	this.currentFile.setCommentVariable(this._currentKey, CommentVariable.Context, text);
	this.asciidocContent = this.asciidocToHtml(this.translationContextText);
	console.log(this.currentFile.getCommentVariable(this._currentKey, CommentVariable.Context));
	this.textChangedEvent.emit(text);
  }

  markTextChangedIfApplicable():boolean{
	const singularDiffers:boolean = this.translationSingularText !== this.currentFile.getTranslation(this._currentKey, Mode.Singular);
	const pluralDiffers:boolean = this.translationPluralText !== this.currentFile.getTranslation(this._currentKey, Mode.Plural);

	const changed:boolean = this._currentKey !== undefined && this._currentKey !== '' && 
		singularDiffers || pluralDiffers; 
	this._textChanged.next(changed);
	return changed;
  }

  translationForSingularChanged(text:string):void{
	  this.translationSingularText = text;
	  this.markTextChangedIfApplicable();
  }

  translationForPluralChanged(text:string):void{
	  this.translationPluralText = text;
	  this.markTextChangedIfApplicable();
  }

  translationForContextChanged(text:string):void{
	this.translationContextText = text;
	this.asciidocContent = this.asciidocToHtml(this.translationContextText);
  }

}

