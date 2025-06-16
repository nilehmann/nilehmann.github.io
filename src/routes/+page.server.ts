import { findVenue } from '$lib/types';
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import fs from 'fs';
import path from 'path';

export const prerender = true;

export async function load() {
	const folderPath = path.resolve('static/papers');
	const files = fs.readdirSync(folderPath);
	const bibFiles = files.filter((file) => file.endsWith('.bib'));

	const articles = [];
	for (const bibFile of bibFiles) {
		const key = bibFile.replace(/\.bib$/, '');

		const bibPath = path.join(folderPath, `${key}.bib`);
		const pdfPath = path.join(folderPath, `${key}.pdf`);

		if (!fs.existsSync(pdfPath)) {
			throw new Error(`File not found: ${pdfPath}`);
		}

		const cite = new Cite(fs.readFileSync(bibPath, 'utf-8'));
		const data = cite.get()[0];
		articles.push({
			venue: findVenue(data),
			key,
			...data
		});
	}

	return { articles };
}
