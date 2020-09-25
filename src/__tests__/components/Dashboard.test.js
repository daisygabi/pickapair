import React from 'react';
import {shallow} from 'enzyme';
import Dashboard from "../../components/Dashboard";

describe("Dashboard", () => {

	let subject = null;

	describe('verify the UI elements exist', () => {

		beforeEach(() => {
			subject = shallow(<Dashboard/>);
		});

		it('finds form', () => {
			expect(subject.find('#generateForm').length).toEqual(1);
		});
	});
});