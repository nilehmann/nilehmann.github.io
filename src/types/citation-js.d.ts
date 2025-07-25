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
		abstract?: string;
		DOI?: string;
		issued?: { 'date-parts': number[][] };
		URL?: string;
		'container-title'?: string;
	}

	export class Cite {
		constructor(input?: InputType);

		get(): CitationItem[];
	}
}
