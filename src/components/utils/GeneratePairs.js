import {NAME_SEPARATOR} from "../../utils/constants";

export function generateUniquePairs(fields) {
	let pairs = [];
	const allNames = fields.names.split(NAME_SEPARATOR);

	for (let i = 0; i < allNames.length; i++) {
		for (let j = i + 1; j < allNames.length; j++) {
			pairs.push({firstPerson: formatName(allNames[i]), secondPerson: formatName(allNames[j])});
		}
	}
	return pairs;
}

export function shuffle(pairs) {
	for (let i = 0; i < pairs.length; i++) {
		const j = Math.floor(Math.random() * i);
		let temp = pairs[i];
		pairs[i] = pairs[j];
		pairs[j] = temp;
	}
	return pairs;
}

const formatName = name => name.toLowerCase().trim();