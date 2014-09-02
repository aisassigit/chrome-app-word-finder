'use strict';

var sidebarOpen,sidebar;
sidebarOpen = false;
sidebar = document.createElement('iframe');
sidebar.id = 'wfSidebar';

/**
 * Events
 */

function handleRequest(request,sender, sendResponse) {
    if (request.callFunction === 'toggleSidebar'){
        toggleSidebar(request.tabUrl);
    }
    if (request.callFunction === 'pageAction'){
        pageAction(request.data);
    }
    if (request.callFunction === 'highlightWords'){
        highlightWords(request.params);
    }
}
chrome.extension.onRequest.addListener(handleRequest);

document.addEventListener('mouseup',function(event){
    var sel;
    sel = window.getSelection().toString();
    if(sel.length){
        var url = chrome.extension.getURL('index.html#/sidebar/article/sel/'+sel);
        sidebar.src = url;
        //chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
    }
});

/**
 * Local functions
 */

function toggleSidebar(tabUrl) {
    var isCanonical,canonicalUrl,el,width,newWidth;

    isCanonical = document.querySelector('link[rel="canonical"]');
    width = document.body.scrollWidth;

    if(isCanonical){
        /*jshint -W110 */
        canonicalUrl = encodeURIComponent(document.querySelector('link[rel="canonical"]').href);
    }

    if(sidebarOpen) {
        el = document.getElementById('wfSidebar');
        el.parentNode.removeChild(el);
        document.body.style.width = width+'px';
        sidebarOpen = false;
        highlightWords();
    }
    else {
        sidebar.src = chrome.extension.getURL('index.html#/sidebar/main/tabUrl/'+escape(tabUrl)+'/canonicalUrl/'+escape(canonicalUrl));
        document.body.appendChild(sidebar);
        newWidth = width - 360;
        document.body.style.width = newWidth+'px';
        sidebarOpen = true;
    }
}

function pageAction(data){
    console.log('->pageAction: '+data.message);
}

function highlightWords(words){
    var myHilitor = new Hilitor('content');
    if(words.length > 0){
        console.log('->HighlightWords:'+words.join(','));
        myHilitor.apply(words.join(','));
    }else{
        myHilitor.remove();
    }
}
