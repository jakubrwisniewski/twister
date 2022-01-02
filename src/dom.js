const { DefaultLang } = require("./constants");
const store = require("./store");
const { removeClassFromNodeList } = require("./utils");

const initializeUi = ({
	onLanguageChange,
	onTimeChange,
	onStart,
	onStop
}) => {

	const lang = store.get('lang') || DefaultLang;
	document.querySelector(`#lang button[value="${lang}"]`).classList.add('active');

	const time = store.get('time') || 3;
	document.querySelector(`#time button[value="${time}"]`).classList.add('active');

	const langButtons = document.querySelectorAll("#lang button");
	const timeButtons = document.querySelectorAll('#time button');

	langButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const { value } = event.currentTarget;
			onLanguageChange(value);
			removeClassFromNodeList(langButtons, 'active');
			event.currentTarget.classList.add('active');
		});
	});

	timeButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const { value } = event.currentTarget;
			onTimeChange(value);
			removeClassFromNodeList(timeButtons, 'active');
			event.currentTarget.classList.add('active');
		});
	});

	const startButton = document.querySelector("#start");
	const stopButton = document.querySelector("#stop");

	startButton.addEventListener('click', () => {
		stopButton.style.display = 'inline-block';
		startButton.style.display = 'none';
		onStart();
	});

	stopButton.addEventListener('click', () => {
		startButton.style.display = 'inline-block';
		stopButton.style.display = 'none';
		onStop();
	});

	startButton.style.display = 'inline-block';
	stopButton.style.display = 'none';
};

const partNode = document.getElementById('part');
const updatePart = (text) => {
	partNode.innerText = text;
};

const colorNode = document.getElementById('color');
const updateColor = (text, color) => {
	colorNode.innerText = text;
	colorNode.style.color = color;
};

module.exports = {
	initializeUi,
	updatePart,
	updateColor,
};
