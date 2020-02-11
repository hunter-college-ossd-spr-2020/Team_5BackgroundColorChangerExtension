/**
 * CSS Styling for Text Color Change
 */
const COLOR_RED = "body { color: red; } div { color: red; } span { color: red; } a { color: red; text-color: red; } h { color: red; } p { color: red; } details { color: red; } li { color: red; } em { color: red; }";
const COLOR_BLUE = "body { color: blue; } div { color: blue; } span { color: blue; } a { color: blue; text-color: blue; } h { color: blue; } p { color: blue; } details { color: blue; } li { color: blue; } em { color: blue; }";
const COLOR_GREEN = "body { color: green; } div { color: green; } span { color: green; } a { color: green; text-color: green; } h { color: green; } p { color: green; } details { color: green; } li { color: green; } em { color: green; }";

/**
 * Title constants for color; (on hover of addon icon, display next title)
 */
const TEXT_RED = "Turn text red";
const TEXT_BLUE = "Turn text blue";
const TEXT_GREEN = "Turn text green";
const TEXT_DEFAULT = "Default text";

/**
 *  Switch CSS Text Color (between red, blue, green, and default text color) 
 */
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
  
  /* Get Current Page Title */
  var getTitle = browser.pageAction.getTitle({tabId: tab.id});
  getTitle.then(gotTitle); 
}

/**
 * Initialize all tabs with the addon (using pageAction)
 */
var getAllTabs = browser.tabs.query({}); // grab all tabs


/**
 * For each tab, initialize the addon (set icon, default color...)
 */
getAllTabs.then((tabs) => {
  for (let tab of tabs) {
    browser.pageAction.setTitle({tabId: tab.id, title: TEXT_RED}); /* Title of action (default red) */
    browser.pageAction.show(tab.id); /* Show page action icon */
  }
});


/**
 *  Check for updates on tab and set addon title and icon for page
 */
browser.tabs.onUpdated.addListener((id, newInfo, tab) => {
  browser.pageAction.setTitle({tabId: tab.id, title: TEXT_RED}); /* Title of action (default red)*/
  browser.pageAction.show(tab.id); /* Show page action icon */

});


/**
 * Listen for icon click event, when click, toggle color 
 */
browser.pageAction.onClicked.addListener(toggleCSS);
