var tempList = [];
var fullArray = [];
//Detects key presses
document.body.addEventListener('keypress', function (ev) {
    console.log(ev.keyCode);
    tempList.push(ev.keyCode);
    chrome.storage.local.set({ "keyPressed" : tempList }, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
        console.log(tempList);
        testing();
        
    });
});



//loads onto html page
function load() {
    chrome.storage.local.get("fullList", function (getList) { 
        chrome.storage.local.get("keyPressed", function (items) {
            if (!chrome.runtime.error) {
                console.log("recieved" + items.keyPressed);
                document.getElementById("display").innerHTML = items.keyPressed;
                var tempAry = getList.fullList;
                console.log(tempAry);
                for (i = 0; i < items.keyPressed.length; i++) {
                    var tempPress = items.keyPressed[i];
                    tempAry[tempPress - 1] = tempPress;
                }
                console.log(tempAry);
                save(tempAry);
            }
        });
    });
}
document.getElementById("update").onclick = load;

function save(tempAry) {
    chrome.storage.local.set({ "fullList" : tempAry}, function () {
        console.log(tempAry);
    });
}

function reset() {
    fullArray[199] = 0;
    fullArray.fill(0, 0, 200);
    chrome.storage.local.set({ "fullList" : fullArray }, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
        document.getElementById("list").innerHTML = fullArray;
        console.log(fullArray);
        
    });
}
document.getElementById("reset").onclick = reset;



/*
function testing() {
    chrome.storage.local.get("keyPressed", function (items) {
        if (!chrome.runtime.error) {
            console.log("recieved" + items.keyPressed);
        }
    });
}
*/