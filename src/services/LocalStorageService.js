export class LocalStorageService {

	retrieveItemFromLocalStorage = (key) => {
		return localStorage && localStorage.getItem(key);
	}

	saveItemToLocalStorage = (key, value) => {
		localStorage && localStorage.setItem(key, value);
	}

	clear() {
		localStorage.clear();
	}
}
