import updateTabs from "./updateTabList";

// Initial update when popup opens
updateTabs();

// Periodic updates
setInterval(updateTabs, 200);

// Uncomment this if you want to update on tab changes
// chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
//   if (changeInfo.title || changeInfo.status === 'loading') {
//     updateTabs();
//   }
// });