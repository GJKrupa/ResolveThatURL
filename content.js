chrome.runtime.onMessage.addListener(function(request, server, sendResponse) {
	var old = request.replace;
	var replaced = request.with;
	var list = document.getElementsByTagName('a');
	for (var index=0; index<list.length; ++index) {
		if (list[index].href == old) {
			list[index].href = replaced;
		}
	}
});
