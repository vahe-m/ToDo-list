class Storage {
	static saveInStorage(name, value) {
		localStorage.setItem(name, value);
	}
	static getFromStorage(name) {
		return localStorage.getItem(name);
	}
}
