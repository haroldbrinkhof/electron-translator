import test from 'ava';
import { Project, TranslationFile } from '../app/Project';

test('onlyPoFiles: returns only the .po files associated with the project', 
     t => {
	const project:Project = new Project();
	const potFile:TranslationFile = new TranslationFile();
	potFile.pot = true;
	const poFile:TranslationFile = new TranslationFile();
	poFile.pot = false;
	project.files = [ potFile, poFile ];
	return t.deepEqual(project.onlyPoFiles(), [ poFile ]);
     });
