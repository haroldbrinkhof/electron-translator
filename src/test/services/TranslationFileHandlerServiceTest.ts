import test from 'ava';
import { TranslationFileHandlerService } from '../../app/services/translation-file-handler.service';
import { Project, TranslationFile } from '../../app/Project';
import { Dirent } from '../../app/Dirent';
//import sinon from 'sinon';
const sinon = require('sinon');

test('isPotOrPo: filename ends with pot extension - returns true', 
     t => t.is(new TranslationFileHandlerService().isPotOrPo("standard_nl.pot"), true));

test('isPotOrPo: filename ends with po extension - returns true', 
     t => t.is(new TranslationFileHandlerService().isPotOrPo("standard_nl.po"), true));

test('isPot: filename does not end with pot extension - returns false', 
     t => t.is(new TranslationFileHandlerService().isPot("standard_nl.zip"), false));

test('isPot: filename smaller in length than 5 - returns false', 
     t => t.is(new TranslationFileHandlerService().isPot(".pot"), false));

test('isPot: filename ends with pot extension - returns true', 
     t => t.is(new TranslationFileHandlerService().isPot("standard_nl.pot"), true));

test('isPo: filename ends with po extension - returns true', 
     t => t.is(new TranslationFileHandlerService().isPo("standard_nl.po"), true));

test('isPo: filename does not end with po extension - returns false', 
     t => t.is(new TranslationFileHandlerService().isPo("standard_nl.zip"), false));

test('isPo: filename smaller than 4 - returns false', 
     t => t.is(new TranslationFileHandlerService().isPo(".po"), false));

const potFilename:string = "/home/harald/some_file.pot";
const expectedPotTranslationFile:TranslationFile = new TranslationFile();
expectedPotTranslationFile.pot = true;
expectedPotTranslationFile.language = "";
expectedPotTranslationFile.path = potFilename;
expectedPotTranslationFile.data = undefined;
expectedPotTranslationFile.originalData = undefined;
test('mapToTranslationfile: constructs a pot TranslationFile (pot true, language empty)', 
     t => t.deepEqual(new TranslationFileHandlerService().mapToTranslationFile(potFilename), expectedPotTranslationFile));

const poFilename:string = "/home/harald/some_file_nl.po";
const expectedPoTranslationFile:TranslationFile = new TranslationFile();
expectedPoTranslationFile.pot = false;
expectedPoTranslationFile.language = "nl";
expectedPoTranslationFile.path = poFilename;
expectedPoTranslationFile.data = undefined;
expectedPoTranslationFile.originalData = undefined;
test('mapToTranslationfile: constructs a po TranslationFile (pot false, language "nl")', 
     t => t.deepEqual(new TranslationFileHandlerService().mapToTranslationFile(poFilename), expectedPoTranslationFile));

test('extractLanguage: extracts the language part from a filename - returns "nl"', 
     t => t.is(new TranslationFileHandlerService().extractLanguage(poFilename), "nl"));

const expectedProject:Project = new Project();
expectedProject.name = '';
expectedProject.key = '';
expectedProject.files = [ expectedPotTranslationFile, expectedPoTranslationFile ];
const file1:Dirent =   { 
			name : potFilename.replace('/home/harald/',''),
			isFile : () => true
			};
const file2:Dirent =   { 
			name : poFilename.replace('/home/harald/',''),
			isFile : () => true
			};
const files:Dirent[] = [ file1, file2 ];
const stub = sinon.stub(TranslationFileHandlerService.prototype, 'readFilesFromDirectory').returns(files);
const stub2 = sinon.stub(TranslationFileHandlerService.prototype, 'parsePoFile').returns(undefined);
test('openProjectFromdirectory: creates a Project class from a directory"', 
     t => t.deepEqual(new TranslationFileHandlerService().openProjectFromDirectory("/home/harald"), expectedProject));



     
