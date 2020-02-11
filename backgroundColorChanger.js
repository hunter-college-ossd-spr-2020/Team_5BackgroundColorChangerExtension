/**
 * CSS Styling for Text Color Change
 */
const COLOR_RED = "body { color: red; } div { color: red; } span { color: red; } a { color: red; text-color: red; } h { color: red; } p { color: red; } details { color: red; } li { color: red; } em { color: red; }";
const COLOR_BLUE = "body { color: blue; } div { color: blue; } span { color: blue; } a { color: blue; text-color: blue; } h { color: blue; } p { color: blue; } details { color: blue; } li { color: blue; } em { color: blue; }";
const COLOR_GREEN = "body { color: green; } div { color: green; } span { color: green; } a { color: green; text-color: green; } h { color: green; } p { color: green; } details { color: green; } li { color: green; } em { color: green; }";

const TEXT_RED = "Turn text red";
const TEXT_BLUE = "Turn text blue";
const TEXT_GREEN = "Turn text green";
const TEXT_DEFAULT = "Default text";

// toggle between red, blue, green, and default text color

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

var getAllTabs = browser.tabs.query({}); // grab all tabs

// for each tab, intialize the page
getAllTabs.then((tabs) => {
  for (let tab of tabs) {
    browser.pageAction.setTitle({tabId: tab.id, title: TEXT_RED}); // title of action (on hover)
    browser.pageAction.show(tab.id); // show page action icon

  }
});

browser.tabs.onUpdated.addListener((id, newInfo, tab) => {
  browser.pageAction.setTitle({tabId: tab.id, title: TEXT_RED}); // title of action (on hover)
  browser.pageAction.show(tab.id); // show page action icon

});

// Listen for icon click event, when click, toggle color
browser.pageAction.onClicked.addListener(toggleCSS);
