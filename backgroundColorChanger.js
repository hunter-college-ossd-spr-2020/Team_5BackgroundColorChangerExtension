const COLOR_RED = "div { color: red; }";
const COLOR_BLUE = "div { color: blue; }";
const COLOR_GREEN = "div { color: green; }";

const TEXT_RED = "Turn text red";
const TEXT_BLUE = "Turn text blue";
const TEXT_GREEN = "Turn text green";
const TEXT_DEFAULT = "Default text";

// toggle between red text and no red text
function toggleCSS(tab) {
  function gotTitle(title) {
    if (title === TEXT_RED) {
      browser.pageAction.setTitle({tabId: tab.id, title: TEXT_BLUE});
      browser.tabs.insertCSS({code: COLOR_RED});
      
    } else if (title === TEXT_BLUE){
      browser.pageAction.setTitle({tabId: tab.id, title: TEXT_GREEN});
      browser.tabs.removeCSS({code: COLOR_RED});
      browser.tabs.insertCSS({code: COLOR_BLUE});

    }else if (title === TEXT_GREEN){
      browser.pageAction.setTitle({tabId: tab.id, title: TEXT_DEFAULT});
      browser.tabs.removeCSS({code: COLOR_BLUE});
      browser.tabs.insertCSS({code: COLOR_GREEN});
    } else{
      browser.pageAction.setTitle({tabId: tab.id, title: TEXT_RED});
      browser.tabs.removeCSS({code: COLOR_GREEN});
    }

  }
  
  var getTitle = browser.pageAction.getTitle({tabId: tab.id});
  getTitle.then(gotTitle); // get current page title, and 
}

// Initialize page action set a hover note to user and
function initializePageAction(tab) {
  browser.pageAction.setTitle({tabId: tab.id, title: TEXT_RED}); // title of action (on hover)
  browser.pageAction.show(tab.id); // show page action icon
}


var getAllTabs = browser.tabs.query({}); // grab all tabs

// for each tab, intialize the page
getAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

browser.tabs.onUpdated.addListener((tab) => {
  initializePageAction(tab);
});

// Listen for icon click event, when click, toggle color
browser.pageAction.onClicked.addListener(toggleCSS);
