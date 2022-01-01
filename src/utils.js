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
