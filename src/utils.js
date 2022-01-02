const talk = (text) => {
	const utterance = new SpeechSynthesisUtterance(text);
	speechSynthesis.speak(utterance);
};

const getRandom = () => {
	return Math.round(Math.random() * 10) % 4;
};

const removeClassFromNodeList = (list, className) => {
	list.forEach(element => element.classList.remove(className));
}

module.exports = {
	talk,
	getRandom,
	removeClassFromNodeList
};
