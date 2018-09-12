console.log("Background page is running...");
ID = {};

chrome.tabs.onCreated.addListener(function(Tab){
	Redirect(Tab);
});
chrome.tabs.onUpdated.addListener(function(IDofChangedTab,INFOofChangedTab,ChangedTab){
	Redirect(ChangedTab);
});
chrome.webRequest.onBeforeRequest.addListener(function (details) {
	if("https://www.google.co.jp/_/chrome/newtab?ie=UTF-8&ext=NTM" != details.url){
		ID[details.tabId] = details.tabId;
	}
},{
	urls: ['*://www.google.co.jp/_/chrome/newtab*','*://newtab/*']
},[
]
);

function Redirect(Tab){
	if(Tab.id in ID){
		chrome.tabs.update(Tab.id,{
			url:"https://www.google.co.jp/_/chrome/newtab?ie=UTF-8&ext=NTM"
		}, function(){
			console.log("Redirecting newtab...");
		});
		delete ID[Tab.id];
	}
}