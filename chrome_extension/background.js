let tabTimes = {};

function getPartOfUrl(url) {
  // This function should return the part of the URL that represents the specific page.
  // This is a simple example that returns the path of the URL.
  let urlObj = new URL(url);
  console.log(urlObj.hostname + urlObj.pathname);
  return [urlObj.hostname, urlObj.pathname];
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    let [hostname, pathname] = getPartOfUrl(tab.url);
    urlPart = hostname + pathname;
    if (tabTimes[urlPart]) {
      tabTimes[urlPart].lastActivated = Date.now();
      console.log("Activated");
    } else {
      tabTimes[urlPart] = {
        timeSpent: 0,
        lastActivated: Date.now(),
      };
      console.log("First time");
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let [hostname, pathname] = getPartOfUrl(tab.url);
  urlPart = hostname + pathname;
  for (let otherUrl in tabTimes) {
    if (otherUrl != urlPart) {
      tabTimes[otherUrl].lastActivated = Date.now();
    }
  }
  if (tabTimes[urlPart]) {
    if (changeInfo.status == "complete") {
      let now = Date.now();
      tabTimes[urlPart].timeSpent += now - tabTimes[urlPart].lastActivated;
      tabTimes[urlPart].lastActivated = now;
      console.log("Updated");
    }
  }
  if (!(urlPart in tabTimes)) {
    tabTimes[urlPart] = {
      timeSpent: 0,
      lastActivated: Date.now(),
    };
    console.log("First time");
  }
});

setInterval(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      let tab = tabs[0];
      let [hostname, pathname] = getPartOfUrl(tab.url);
      urlPart = hostname + pathname;
      for (let otherUrl in tabTimes) {
        if (otherUrl != urlPart) {
          tabTimes[otherUrl].lastActivated = Date.now();
        }
      }
      if (tabTimes[urlPart]) {
        let now = Date.now();
        tabTimes[urlPart].timeSpent += now - tabTimes[urlPart].lastActivated;
        tabTimes[urlPart].lastActivated = now;
        console.log(tabTimes[urlPart].timeSpent);
      }
    }
  });
}, 1000);

setInterval(() => {
  for (let urlPart in tabTimes) {
    fetch("http://localhost:3000/tabs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: urlPart,
        time_spent: tabTimes[urlPart].timeSpent,
      }),
    });
  }
}, 10000);
