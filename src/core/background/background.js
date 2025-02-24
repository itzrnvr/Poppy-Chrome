// console.log("Background script loaded!");

// Keep the service worker alive with an event listener
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed/updated");
});

// chrome.tabs.executeScript({
//     code: 'console.log("addd")'
// });


  chrome.action.onClicked.addListener((tab) => {
    // Optional: Add functionality when extension icon is clicked
    console.log('Extension icon clicked');
});