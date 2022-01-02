const { initializeUi, updateColor, updatePart } = require("./dom");
const store = require("./store");
const engine = require('./engine');

const onLanguageChange = (lang) => {
	store.set('lang', lang);
};

const onTimeChange = (time) => {
	store.set('time', time);
	engine.updateTime();
};

const onStart = () => {
	engine.start();
};

const onStop = () => {
	engine.stop();
	updateColor('', '');
	updatePart('');
};

engine.addUpdateEventListener((partText, colorText, colorName) => {
	updateColor(colorText, colorName);
	updatePart(partText);
});

initializeUi({
	onLanguageChange,
	onTimeChange,
	onStart,
	onStop
});
