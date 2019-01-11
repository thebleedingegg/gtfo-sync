chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {


	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
});
