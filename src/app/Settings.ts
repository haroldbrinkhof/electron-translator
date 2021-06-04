import { ProjectData } from './Project';

export class Settings {
	storagePath:string = '';
	lastLoaded:string = '';
	user:string = '';
	projects:ProjectData[] = [];
}
