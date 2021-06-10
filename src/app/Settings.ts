import { ProjectData } from './Project';
import { User } from './User';

export class Settings {
	storagePath:string = '';
	lastLoaded:string = '';
	currentUser:number;
	knownUsers:User[] = [];
	projects:ProjectData[] = [];
}
