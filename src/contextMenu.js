

var id = chrome.contextMenus.create({
	"title": "Un-shorten Link",
	"id": "un-shorten",
	"contexts":["link"]
});

chrome.contextMenus.onClicked.addListener(function(info, theTab) {
	console.log("Requested un-shorten for...");
	console.log(info);
	console.log(theTab);

	chrome.scripting.executeScript({
		target: {tabId: theTab.id, allFrames: true},
		files: ["src/content.js"]
    })

	chrome.tabs.sendMessage(theTab.id, {
		data: {
			command: "replace",
			url: info.linkUrl,
			tab: theTab
		}
	});
});