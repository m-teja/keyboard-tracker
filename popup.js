var a = 1;
function myFunction() {
    chrome.tabs.create({'url': chrome.extension.getURL('allStats.html')}, function(tab) {
    // Tab opened.
    });
}

document.getElementById("openTab").onclick = myFunction;