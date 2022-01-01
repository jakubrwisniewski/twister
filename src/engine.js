const { ColorName, Part } = require("./constants");
const { getLang } = require("./lang");
const store = require("./store");
const { getRandom, talk } = require("./utils");

let intervalObject;

const tick = () => {
	const colorName = ColorName[getRandom()];
	const part = Part[getRandom()];

	const lang = getLang();
	const text = `${lang.parts[part]} ${lang.on} ${lang.colors[colorName]}`;

	talk(text);
};

const start = () => {
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

module.exports = {
	start,
	stop,
	updateTime
};
