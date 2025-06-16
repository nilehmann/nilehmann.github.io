import type { CitationItem } from '@citation-js/core';

export interface Venue {
	publisher?: string;
	name: string;
	shortName: string;
}

export interface IArticle extends CitationItem {
	key: string;
	venue: Venue;
}

export function findVenue(data: CitationItem): Venue | undefined {
	if (data.issue && data.issue in VENUES) {
		return VENUES[data.issue];
	}
	for (const key in VENUES) {
		const text = data['container-title'];
		if (!text) {
			continue;
		}
		const regex = new RegExp(`\\b${key}\\b`); // escape carefully if user input
		if (regex.test(text)) {
			return VENUES[key];
		}
	}
}

const VENUES: { [key: string]: Venue } = {
	POPL: {
		publisher: 'ACM SIGPLAN',
		name: 'Symposium on Principles of Programming Languages',
		shortName: 'POPL'
	},
	PLDI: {
		publisher: 'ACM SIGPLAN',
		name: 'Conference on Programming Language Design and Implementation',
		shortName: 'PLDI'
	},
	OSDI: {
		publisher: 'USENIX',
		name: 'Symposium on Operating Systems Design and Implementation',
		shortName: 'OSDI'
	},
	CoqPL: {
		name: 'International Workshop on Coq for Programming Languages',
		shortName: 'CoqPL'
	},
	IOI: {
		name: 'International Olympiad in Informatics',
		shortName: 'IOI'
	},
	AMW: {
		name: 'Alberto Mendelzon Workshop on Foundations of Data Management',
		shortName: 'AMW'
	}
};

export function year(article: IArticle): number {
	return article.issued?.['date-parts'][0][0] || 0;
}
