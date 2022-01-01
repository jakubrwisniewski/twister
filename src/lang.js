const pl = require('./i18n/pl');
const en = require('./i18n/en');
const store = require('./store');

const langMap = {
	pl,
	en
};

const getLang = () => {
	const lang = store.get('lang') || DefaultLang;
	return langMap[lang];
};

module.exports = {
	getLang
};
