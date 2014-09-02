'use strict';

console.log( 'Background starting!' );

var activeTabId = null;


/**
 * Background functions....
 */

//function getActiveTab(){
//    var activeTab = null;
//    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
//        activeTab = arrayOfTabs[0];
//        return activeTab;
//    });
//    return activeTab;
//}


/**
 * Command events...
 */

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);

  if(command === 'toggleSidebar'){

    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
      var tab,tabUrl;
      tab = arrayOfTabs[0];
      tabUrl = tab.url.substr(tab.url.indexOf(':')+3);

      chrome.tabs.sendRequest(
        tab.id,
        {callFunction: 'toggleSidebar',tabUrl:encodeURIComponent(tabUrl)},
        function(response) {
          console.log(response);
        }
      );
    });
  }
});

/**
 * Browser action events...
 */
chrome.browserAction.onClicked.addListener(function() {

  chrome.tabs.getSelected(null, function(tab) {
    //var tabUrl = tab.url.substr(tab.url.indexOf(':')+3);
    var tabUrl = tab.url;
    activeTabId = tab.id;

    chrome.tabs.sendRequest(
      tab.id,
      {callFunction: 'toggleSidebar',tabUrl:encodeURIComponent(tabUrl)},
      function(response) {
        console.log(response);
      }
    );
  });
});

console.log('SRC='+chrome.extension.getURL('index.html'+'#/'));
console.log( 'Background  done.' );


/**
 * Chrome runtime events...
 */

chrome.runtime.onInstalled.addListener(function() {
  console.log('installed');
});

chrome.runtime.onSuspend.addListener(function() {
  // Do some simple clean-up tasks.
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  console.log(sender.tab ?'from a content script:' + sender.tab.url :'from the extension');

  if (request.wfAction){
    console.log('->chrome.runtime.onMessage.addListener: '+request.wfAction);
    chrome.tabs.sendRequest(
      activeTabId,
      {callFunction: request.wfAction,params:request.params},
      function(response) {
        console.log(response);
      }
    );
    sendResponse({confirmation: 'OK'});
  }
});
