(function () {
  var socket = document.createElement('script')
  var script = document.createElement('script')
  socket.setAttribute('src', 'http://127.0.0.1:1337/socket.io/socket.io.js')
  script.type = 'text/javascript'

  socket.onload = function () {
    document.head.appendChild(script)
  }
  script.text = ['window.socket = io("http://127.0.0.1:1337");',
  'socket.on("bundle", function() {',
  'console.log("livereaload triggered")',
  'window.location.reload();});'].join('\n')
  document.head.appendChild(socket)
}());
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const DefaultLang = 'en';

const ColorName = {
	0: 'blue',
	1: 'green',
	2: 'red',
	3: 'yellow'
};

const Color = {
	blue: '',
	green: '#0a0',
	red: '#d00',
	yellow: ''
}

const Part = {
	0: 'rh',
	1: 'lh',
	2: 'rf',
	3: 'lf'
};

module.exports = {
	DefaultLang,
	Color,
	ColorName,
	Part
};

},{}],2:[function(require,module,exports){
const initializeUi = ({
	onLanguageChange,
	onTimeChange,
	onStart,
	onStop
}) => {

	document.querySelectorAll("#lang button").forEach((button) => {
		button.addEventListener('click', (event) => {
			const { value } = event.currentTarget;
			onLanguageChange(value);
		});
	});

	document.querySelectorAll('#time button').forEach((button) => {
		button.addEventListener('click', (event) => {
			const { value } = event.currentTarget;
			onTimeChange(value);
		});
	});

	document.querySelector("#start").addEventListener('click', (event) => {
		onStart();
	});

	document.querySelector("#stop").addEventListener('click', (event) => {
		onStop();
	});

};

module.exports = {
	initializeUi
};

},{}],3:[function(require,module,exports){
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

},{"./constants":1,"./lang":7,"./store":8,"./utils":9}],4:[function(require,module,exports){
module.exports = {
	on: 'on',
	colors: {
		blue: 'blue',
		green: 'green',
		yellow: 'yellow',
		blue: 'blue'
	},
	parts: {
		rf: 'right foot',
		lf: 'left foot',
		rh: 'right hand',
		lh: 'left hand'
	}
}

},{}],5:[function(require,module,exports){
module.exports = {
	on: 'na',
	colors: {
		blue: 'niebieski',
		green: 'zielony',
		yellow: 'żółty',
		blue: 'niebieski'
	},
	parts: {
		rf: 'prawa noga',
		lf: 'lewa noga',
		rh: 'prawa ręka',
		lh: 'lewa ręka'
	}
}

},{}],6:[function(require,module,exports){
const { initializeUi } = require("./dom");
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
};

initializeUi({
	onLanguageChange,
	onTimeChange,
	onStart,
	onStop
});

},{"./dom":2,"./engine":3,"./store":8}],7:[function(require,module,exports){
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

},{"./i18n/en":4,"./i18n/pl":5,"./store":8}],8:[function(require,module,exports){
const store = {
	set: (key, value) => {
		localStorage.setItem(key, value);
	},
	get: (key) => localStorage.getItem(key),
};

module.exports = store;

},{}],9:[function(require,module,exports){
const talk = (text) => {
	const utterance = new SpeechSynthesisUtterance(text);
	speechSynthesis.speak(utterance);
};

const getRandom = () => {
	return Math.round(Math.random() * 10) % 4;
};

module.exports = {
	talk,
	getRandom
};

},{}]},{},[6]);
