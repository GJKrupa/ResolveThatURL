var resolver = {
	onXhrState: function(oldUrl, xhr, tab) {
		console.log('State change');
		var DONE = this.DONE || 4;
		if (xhr.readyState === DONE) {
			console.log(xhr);
			// if (response['long-url']) {
			// 	chrome.tabs.sendMessage(tab.id, {replace: oldUrl, with: response['long-url']});
			// }
		}
	},

	unshortenUrl: function(oldUrl, tab) {
		fetch(oldUrl, {
			method: 'HEAD',
			mode: 'no-cors',
			cache: 'no-cache',
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			credentials: 'include'
		}).then((data) => {
			console.log(data);
			if (data.type == 'opaque') {
				data.headers.forEach((value, key, parent) => {
					console.log(key + ' = ' + value);
				});
			} else {
				console.log('Final URL is: ' + oldUrl);
			}
		}).catch((err) => {
			console.log("ERR!");
			console.log(err);
		});
	}
}

chrome.runtime.onMessage.addListener(function(request, server, sendResponse) {
	console.log(request);
	if (request.data.command == 'replace') {
		console.log('Replace url ' + request.data.url)
		resolver.unshortenUrl(request.data.url, request.data.tab);
	} else {
		var old = request.replace;
		var replaced = request.with;
		var list = document.getElementsByTagName('a');
		for (var index=0; index<list.length; ++index) {
			if (list[index].href == old) {
				list[index].href = replaced;
			}
		}
	}
});