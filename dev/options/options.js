import '@material/mwc-textfield';

const textfield = document.querySelector('mwc-textfield');

textfield.addEventListener('change', (e) => {
	const target = e.target;
	// if (target.value) {
	// localStorage.setItem('field-value', target.value)
	saveValue(target.value);
	// }
});
(async function () {
	textfield.value = await getTargetValue();
})();

function getTargetValue() {
	return new Promise((res) => {
		chrome.storage.sync.get(['target'], function (options) {
			res(options.target);
		});
	});
}
function saveValue(value) {
	chrome.storage.sync.set({target: value});
}
