export interface Dirent{
	isBlockDevice?: () => boolean,
	isCharacterDevice?: () => boolean,
	isDirectory?: () => boolean,
	isFIFO?: () => boolean,
	isFile?: () => boolean,
	isSocket?: () => boolean,
	isSymbolicLink?: () => boolean,
	name:string
}
