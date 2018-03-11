window.onload = function () {
    var tempList = [];
    var fullArray = [];
    //Detects key presses
    document.body.addEventListener('keypress', function(ev) {
        console.log(ev.keyCode);
        tempList.push(ev.keyCode);
        chrome.storage.local.set({
            "keyPressed": tempList
        }, function() {
            if (chrome.runtime.error) {
                console.log("Runtime error.");
            }
            if (tempList.length > 10) {
                //if tempList holds more than 10 values update stats
                updateStats();
            }
            console.log(tempList);
        });
    });
    //loads onto html page
    function load() {
        updateStats();
        save();
        chrome.storage.local.get("fullList", function(items) {
            document.getElementById("list").innerHTML = items.fullList;
        });
    }
    document.getElementById("update").onclick = load;
    window.onload = load;

    //transfers temp list to full list
    function updateStats() {
        chrome.storage.local.get("fullList", function(getList) {
            chrome.storage.local.get("keyPressed", function(items) {
                if (!chrome.runtime.error) {
                    var tempAry = getList.fullList;
                    for (i = 0; i < items.keyPressed.length; i++) {
                        var tempPress = items.keyPressed[i];
                        tempAry[tempPress - 1]++;
                    }
                    save(tempAry);
                }
            });
        });
    }
    //saves full list
    function save(tempAry) {
        chrome.storage.local.set({
            "fullList": tempAry
        }, function() {
            console.log(tempAry);
            resetTemp();
        });

    }

    //resets everything
    function resetAll() {
        resetTemp();
        resetArray();
        document.getElementById("list").innerHTML = fullArray;
        console.log(fullArray);
    }
    document.getElementById("reset").onclick = resetAll;

    //resets temp array 
    function resetTemp() {
        chrome.storage.local.set({
            "keyPressed": ""
        }, function() {
            console.log("temporary cache reset");
            tempList = [-1];
        });
    }
    //resets saved array
    function resetArray() {
        fullArray[199] = 0;
        fullArray.fill(0, 0, 200);
        chrome.storage.local.set({
            "fullList": fullArray
        }, function () {
            if (chrome.runtime.error) {
                console.log("Runtime error.");
            }
        });
    }
};