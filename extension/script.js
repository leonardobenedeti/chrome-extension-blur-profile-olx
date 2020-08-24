var blurActive = false;

function clickAction(){
    blurActive = !blurActive;
    changeIcon();
    insertBlur();
}

function changeIcon(){
    var iconToSet = "icon_" + (blurActive ? "active" : "inactive") + ".png";
    chrome.browserAction.setIcon({path:iconToSet});
}

function insertBlur(){

    var scriptToBlur = `
        console.log("COM BLUR");
        var profile = document.getElementById('miniprofile');
        profile.style = profile.style = "-webkit-filter: blur(5px);-moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);";
    `;
    var scriptToRemoveBlur = `
        console.log("SEM BLUR");
        var profile = document.getElementById('miniprofile');
        profile.style = profile.style = "-webkit-filter: blur(0);-moz-filter: blur(0);-o-filter: blur(0);-ms-filter: blur(0);filter: blur(0);";
    `;

    var script = blurActive ? scriptToBlur : scriptToRemoveBlur;

    chrome.tabs.executeScript({code: script});
}


document.addEventListener('DOMContentLoaded', function() {
    chrome.browserAction.onClicked.addListener(clickAction);
});
