import React from 'react';
import {generateUniquePairs} from "../../../components/utils/GeneratePairs";

describe("GeneratePairs", () => {

	let subject = null;

	describe('generateUniquePairs', () => {
		const fields = {names: 'Test; Ana'};
		const generatedPairs = [{firstPerson: 'test', secondPerson: 'ana'}];

		beforeEach(() => {
			subject = generateUniquePairs;
		});

		it('generate correct pairs from input', () => {
			let generatedUniquePairs = subject(fields);
			expect(generatedUniquePairs).toEqual(generatedPairs);
		});
	});
});