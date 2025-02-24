chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed/updated");
});

let backgroundTabId = null;

// Listen for storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.backgroundTab) {
    backgroundTabId = changes.backgroundTab.newValue;
    console.log(backgroundTabId)
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!backgroundTabId) return; // Critical check [[6]]
  
  if (changeInfo.audible !== undefined && tabId !== backgroundTabId) {
    chrome.storage.local.get(['backgroundTab'], (result) => {
      if (!result.backgroundTab) return;
      
      chrome.scripting.executeScript({
        target: { tabId: result.backgroundTab },
        func: (hasCompetingAudio) => {
          document.querySelectorAll('video, audio').forEach(media => {
            media.volume = hasCompetingAudio ? 0.2 : 0.7;
          });
        },
        args: [changeInfo.audible]
      }).catch(error => console.debug('Target tab inactive'));
    });
  }
});