<<<<<<< HEAD
window.onload = function() {
    var tempList = [];
    var fullArray = [];
    //Detects key presses
    document.onkeyup = function(ev) {
        console.log(ev.keyCode);
        tempList.push(ev.keyCode);
        disp(ev.keyCode);
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
    };
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
        }, function() {
            if (chrome.runtime.error) {
                console.log("Runtime error.");
            }
        });
    }



    //check if chrome extension popup
    function disp(keyPressed) {
        if (document.body.classList.contains("mainAllStats")) {
            var keyboardMap = {
                0: "That key has no keycode",
                3: "break",
                8: "backspace / delete",
                9: "tab",
                12: 'clear',
                13: "enter",
                16: "shift",
                17: "ctrl",
                18: "alt",
                19: "pause/break",
                20: "caps lock",
                21: "hangul",
                25: "hanja",
                27: "escape",
                28: "conversion",
                29: "non-conversion",
                32: "spacebar",
                33: "page up",
                34: "page down",
                35: "end",
                36: "home",
                37: "left arrow",
                38: "up arrow",
                39: "right arrow",
                40: "down arrow",
                41: "select",
                42: "print",
                43: "execute",
                44: "Print Screen",
                45: "insert",
                46: "delete",
                47: "help",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                58: ":",
                59: "semicolon (firefox), equals",
                60: "<",
                61: "equals (firefox)",
                63: "ß",
                64: "@ (firefox)",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                91: "Windows Key / Left ⌘ / Chromebook Search key",
                92: "right window key",
                93: "Windows Menu / Right ⌘",
                95: "sleep",
                96: "numpad 0",
                97: "numpad 1",
                98: "numpad 2",
                99: "numpad 3",
                100: "numpad 4",
                101: "numpad 5",
                102: "numpad 6",
                103: "numpad 7",
                104: "numpad 8",
                105: "numpad 9",
                106: "multiply",
                107: "add",
                108: "numpad period (firefox)",
                109: "subtract",
                110: "decimal point",
                111: "divide",
                112: "f1",
                113: "f2",
                114: "f3",
                115: "f4",
                116: "f5",
                117: "f6",
                118: "f7",
                119: "f8",
                120: "f9",
                121: "f10",
                122: "f11",
                123: "f12",
                124: "f13",
                125: "f14",
                126: "f15",
                127: "f16",
                128: "f17",
                129: "f18",
                130: "f19",
                131: "f20",
                132: "f21",
                133: "f22",
                134: "f23",
                135: "f24",
                144: "num lock",
                145: "scroll lock",
                160: "^",
                161: '!',
                163: "#",
                164: '$',
                165: 'ù',
                166: "page backward",
                167: "page forward",
                168: "refresh",
                169: "closing paren (AZERTY)",
                170: '*',
                171: "~ + * key",
                172: "home key",
                173: "minus (firefox), mute/unmute",
                174: "decrease volume level",
                175: "increase volume level",
                176: "next",
                177: "previous",
                178: "stop",
                179: "play/pause",
                180: "e-mail",
                181: "mute/unmute (firefox)",
                182: "decrease volume level (firefox)",
                183: "increase volume level (firefox)",
                186: "semi-colon / ñ",
                187: "equal sign",
                188: "comma",
                189: "dash",
                190: "period",
                191: "forward slash / ç",
                192: "grave accent / ñ / æ / ö",
                193: "?, / or °",
                194: "numpad period (chrome)",
                219: "open bracket",
                220: "back slash",
                221: "close bracket / å",
                222: "single quote / ø / ä",
                223: "`",
                224: "left or right ⌘ key (firefox)",
                225: "altgr",
                226: "< /git >, left back slash",
                230: "GNOME Compose Key",
                231: "ç",
                233: "XF86Forward",
                234: "XF86Back",
                240: "alphanumeric",
                242: "hiragana/katakana",
                243: "half-width/full-width",
                244: "kanji",
                255: "toggle touchpad"
            };
            document.getElementById("details").innerHTML = keyboardMap[keyPressed];
            chrome.storage.local.get("fullList", function (items) {
                var tempAry = items.fullList;
                updateStats();
                document.getElementById("numPressed").innerHTML = "You have pressed " + keyboardMap[keyPressed] + " " + (tempAry[keyPressed-1] + 1) + " times.";
                console.log(tempAry[keyPressed - 1] + " " + keyboardMap[keyPressed] + " " + keyPressed);
            });
        }
    }


=======
window.onload = function() {
    var tempList = [];
    var fullArray = [];
    //Detects key presses
    document.onkeyup = function(ev) {
        console.log(ev.keyCode);
        tempList.push(ev.keyCode);
        disp(ev.keyCode);
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
    };
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
        }, function() {
            if (chrome.runtime.error) {
                console.log("Runtime error.");
            }
        });
    }



    //check if chrome extension popup
    function disp (keyPressed) {
        if (document.body.classList.contains("mainAllStats")) {
            var keyboardMap = [
                "", // [0]
                "", // [1]
                "", // [2]
                "CANCEL", // [3]
                "", // [4]
                "", // [5]
                "HELP", // [6]
                "", // [7]
                "BACK_SPACE", // [8]
                "TAB", // [9]
                "", // [10]
                "", // [11]
                "CLEAR", // [12]
                "ENTER", // [13]
                "ENTER_SPECIAL", // [14]
                "", // [15]
                "SHIFT", // [16]
                "CONTROL", // [17]
                "ALT", // [18]
                "PAUSE", // [19]
                "CAPS_LOCK", // [20]
                "KANA", // [21]
                "EISU", // [22]
                "FINAL", // [24]
                "HANJA", // [25]
                "", // [26]
                "ESCAPE", // [27]
                "CONVERT", // [28]
                "NONCONVERT", // [29]
                "ACCEPT", // [30]
                "MODECHANGE", // [31]
                "SPACE", // [32]
                "PAGE_UP", // [33]
                "PAGE_DOWN", // [34]
                "END", // [35]
                "HOME", // [36]
                "LEFT", // [37]
                "UP", // [38]
                "RIGHT", // [39]
                "DOWN", // [40]
                "SELECT", // [41]
                "PRINT", // [42]
                "EXECUTE", // [43]
                "PRINTSCREEN", // [44]
                "INSERT", // [45]
                "DELETE", // [46]
                "", // [47]
                "0", // [48]
                "1", // [49]
                "2", // [50]
                "3", // [51]
                "4", // [52]
                "5", // [53]
                "6", // [54]
                "7", // [55]
                "8", // [56]
                "9", // [57]
                "COLON", // [58]
                "SEMICOLON", // [59]
                "LESS_THAN", // [60]
                "EQUALS", // [61]
                "GREATER_THAN", // [62]
                "QUESTION_MARK", // [63]
                "AT", // [64]
                "A", // [65]
                "B", // [66]
                "C", // [67]
                "D", // [68]
                "E", // [69]
                "F", // [70]
                "G", // [71]
                "H", // [72]
                "I", // [73]
                "J", // [74]
                "K", // [75]
                "L", // [76]
                "M", // [77]
                "N", // [78]
                "O", // [79]
                "P", // [80]
                "Q", // [81]
                "R", // [82]
                "S", // [83]
                "T", // [84]
                "U", // [85]
                "V", // [86]
                "W", // [87]
                "X", // [88]
                "Y", // [89]
                "Z", // [90]
                "OS_KEY", // [91] Windows Key (Windows) or Command Key (Mac)
                "", // [92]
                "CONTEXT_MENU", // [93]
                "", // [94]
                "SLEEP", // [95]
                "NUMPAD0", // [96]
                "NUMPAD1", // [97]
                "NUMPAD2", // [98]
                "NUMPAD3", // [99]
                "NUMPAD4", // [100]
                "NUMPAD5", // [101]
                "NUMPAD6", // [102]
                "NUMPAD7", // [103]
                "NUMPAD8", // [104]
                "NUMPAD9", // [105]
                "MULTIPLY", // [106]
                "ADD", // [107]
                "SEPARATOR", // [108]
                "SUBTRACT", // [109]
                "DECIMAL", // [110]
                "DIVIDE", // [111]
                "F1", // [112]
                "F2", // [113]
                "F3", // [114]
                "F4", // [115]
                "F5", // [116]
                "F6", // [117]
                "F7", // [118]
                "F8", // [119]
                "F9", // [120]
                "F10", // [121]
                "F11", // [122]
                "F12", // [123]
                "F13", // [124]
                "F14", // [125]
                "F15", // [126]
                "F16", // [127]
                "F17", // [128]
                "F18", // [129]
                "F19", // [130]
                "F20", // [131]
                "F21", // [132]
                "F22", // [133]
                "F23", // [134]
                "F24", // [135]
                "", // [136]
                "", // [137]
                "", // [138]
                "", // [139]
                "", // [140]
                "", // [141]
                "", // [142]
                "", // [143]
                "NUM_LOCK", // [144]
                "SCROLL_LOCK", // [145]
                "WIN_OEM_FJ_JISHO", // [146]
                "WIN_OEM_FJ_MASSHOU", // [147]
                "WIN_OEM_FJ_TOUROKU", // [148]
                "WIN_OEM_FJ_LOYA", // [149]
                "WIN_OEM_FJ_ROYA", // [150]
                "", // [151]
                "", // [152]
                "", // [153]
                "", // [154]
                "", // [155]
                "", // [156]
                "", // [157]
                "", // [158]
                "", // [159]
                "CIRCUMFLEX", // [160]
                "EXCLAMATION", // [161]
                "DOUBLE_QUOTE", // [162]
                "HASH", // [163]
                "DOLLAR", // [164]
                "PERCENT", // [165]
                "AMPERSAND", // [166]
                "UNDERSCORE", // [167]
                "OPEN_PAREN", // [168]
                "CLOSE_PAREN", // [169]
                "ASTERISK", // [170]
                "PLUS", // [171]
                "PIPE", // [172]
                "HYPHEN_MINUS", // [173]
                "OPEN_CURLY_BRACKET", // [174]
                "CLOSE_CURLY_BRACKET", // [175]
                "TILDE", // [176]
                "", // [177]
                "", // [178]
                "", // [179]
                "", // [180]
                "VOLUME_MUTE", // [181]
                "VOLUME_DOWN", // [182]
                "VOLUME_UP", // [183]
                "", // [184]
                "", // [185]
                "SEMICOLON", // [186]
                "EQUALS", // [187]
                "COMMA", // [188]
                "MINUS", // [189]
                "PERIOD", // [190]
                "SLASH", // [191]
                "BACK_QUOTE", // [192]
                "", // [193]
                "", // [194]
                "", // [195]
                "", // [196]
                "", // [197]
                "", // [198]
                "", // [199]
                "", // [200]
                "", // [201]
                "", // [202]
                "", // [203]
                "", // [204]
                "", // [205]
                "", // [206]
                "", // [207]
                "", // [208]
                "", // [209]
                "", // [210]
                "", // [211]
                "", // [212]
                "", // [213]
                "", // [214]
                "", // [215]
                "", // [216]
                "", // [217]
                "", // [218]
                "OPEN_BRACKET", // [219]
                "BACK_SLASH", // [220]
                "CLOSE_BRACKET", // [221]
                "QUOTE", // [222]
                "", // [223]
                "META", // [224]
                "ALTGR", // [225]
                "", // [226]
                "WIN_ICO_HELP", // [227]
                "WIN_ICO_00", // [228]
                "", // [229]
                "WIN_ICO_CLEAR", // [230]
                "", // [231]
                "", // [232]
                "WIN_OEM_RESET", // [233]
                "WIN_OEM_JUMP", // [234]
                "WIN_OEM_PA1", // [235]
                "WIN_OEM_PA2", // [236]
                "WIN_OEM_PA3", // [237]
                "WIN_OEM_WSCTRL", // [238]
                "WIN_OEM_CUSEL", // [239]
                "WIN_OEM_ATTN", // [240]
                "WIN_OEM_FINISH", // [241]
                "WIN_OEM_COPY", // [242]
                "WIN_OEM_AUTO", // [243]
                "WIN_OEM_ENLW", // [244]
                "WIN_OEM_BACKTAB", // [245]
                "ATTN", // [246]
                "CRSEL", // [247]
                "EXSEL", // [248]
                "EREOF", // [249]
                "PLAY", // [250]
                "ZOOM", // [251]
                "", // [252]
                "PA1", // [253]
                "WIN_OEM_CLEAR", // [254]
                "" // [255]
            ];
            document.getElementById("details").innerHTML = keyboardMap[keyPressed - 1];
            chrome.storage.local.get("fullList", function (items) {
                var tempAry = items.fullList;
                updateStats();
                document.getElementById("numPressed").innerHTML = "You have pressed " + keyboardMap[keyPressed - 1] + " " + tempAry[keyPressed - 1] + " times.";
                console.log(tempAry[keyPressed - 1] + " " + keyboardMap[keyPressed] + " " + keyPressed);
            });
        }
    }


>>>>>>> 8fc46c251aa9278709b6ec25ea95304ae4837fa0
};