
//Detects key presses
document.body.addEventListener('keypress', function(ev) {
    console.log(ev.keyCode);
    fullList.push(ev.keyCode);
    chrome.storage.local.set({ "keyPressed" : ev.keyCode }, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
        
    });
});

//loads onto html page
function load() {
    chrome.storage.local.get("keyPressed", function (items) {
        if (!chrome.runtime.error) {
            console.log("recieved" + items.keyPressed);
            document.getElementById("display").innerHTML = items.keyPressed;
        }
    });
}
document.getElementById("update").onclick = load;