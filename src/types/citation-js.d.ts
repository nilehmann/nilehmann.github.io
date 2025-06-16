declare module '@citation-js/core' {
	export type InputType = string;

	export interface Author {
		given: string;
		family: string;
	}

	export interface CitationItem {
		title?: string;
		author?: Author[];
		issue?: string;
		issued?: { 'date-parts': number[][] };
		'container-title'?: string;
	}

	export class Cite {
		constructor(input?: InputType);

		get(): CitationItem[];
	}
}
