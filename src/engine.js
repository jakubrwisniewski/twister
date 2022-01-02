const { ColorName, Part } = require("./constants");
const { getLang } = require("./lang");
const store = require("./store");
const { getRandom, talk } = require("./utils");

let intervalObject;
let onUpdate;

const tick = () => {
	const colorName = ColorName[getRandom()];
	const part = Part[getRandom()];

	const lang = getLang();

	const partText = lang.parts[part];
	const colorText = lang.colors[colorName];

	const text = `${partText} ${lang.on} ${colorText}`;

	talk(text);

	if(onUpdate) {
		onUpdate(
			partText,
			colorText,
			colorName
		);
	}
};

const start = () => {
	if(intervalObject) {
		stop();
	}
	intervalObject = setInterval(tick, store.get('time') * 1000);
};

const stop = () => {
	clearInterval(intervalObject);
};

const updateTime = () => {
	if(intervalObject) {
		stop();
		start()
	}
};

const addUpdateEventListener = (callback) => {
	onUpdate = callback;
};

module.exports = {
	start,
	stop,
	updateTime,
	addUpdateEventListener
};
