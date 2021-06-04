export interface PoContent{
	charset:string;
	headers:{ [key:string]:string };
	translations:{ [key:string]:Translation };
}

interface Translation{
	msgctxt?:string;
	msgid:string;
	msgidPlural?:string;
	msgstr:string;
	comments?:{ [key:string]:string };
}
