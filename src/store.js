const store = {
	set: (key, value) => {
		localStorage.setItem(key, value);
	},
	get: (key) => localStorage.getItem(key),
};

module.exports = store;
