chrome.action.onClicked.addListener(async () => {
  await chrome.tabs.create({
    url: 'https://github.com/',
    active: true
  })
});