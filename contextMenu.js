function thingy(oldUrl, xhr, tab) {
	var DONE = this.DONE || 4;
	if (xhr.readyState === DONE){
		var response = JSON.parse(xhr.response);
		if (response['long-url']) {
			chrome.tabs.sendMessage(tab.id, {replace: oldUrl, with: response['long-url']});
		}
	}
}

function onClick(info, theTab) {
	var oldUrl = info.linkUrl;
	var url = "http://api.longurl.org/v2/expand?format=json&url=" + encodeURIComponent(info.linkUrl);
	var tab = theTab;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		thingy(oldUrl, xhr, tab);
	}
	xhr.open("GET", url, true);
	xhr.send();
}

var id = chrome.contextMenus.create({
	"title": "Unshorten Link",
	"contexts":["link"],
	"onclick": function(info, tab) {
		onClick(info, tab);
	},
	"onclick": onClick
});