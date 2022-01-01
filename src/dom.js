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
