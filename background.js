function getTargetValue() {
	return new Promise((res) => {
		chrome.storage.sync.get(['target'], function (result) {
			res(result.target);
		});
	});
}

async function openLink() {
	const targetValue = await getTargetValue();
	await chrome.tabs.create({
		url: targetValue ?? 'https://github.com/',
		active: true,
	});
}

chrome.runtime.onInstalled.addListener(async function () {
	const targetValue = await getTargetValue();

	if (targetValue == undefined) {
		// Set the default value for the target
		chrome.storage.sync.set(
			{target: 'https://github.com/vdegenne?tab=repositories'},
			function () {
				// console.log('Default value is set');
			}
		);
	}
});

chrome.action.onClicked.addListener(async () => {
	openLink();
});
chrome.commands.onCommand.addListener(function (command) {
	if (command === 'open-link') {
		openLink();
	}
});
