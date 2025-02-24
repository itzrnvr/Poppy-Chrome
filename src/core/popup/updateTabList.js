const updateTabs = async () => {
  const tabs = await chrome.tabs.query({});
  
  // Sort tabs to put active tab first
  const sortedTabs = tabs.sort((a, b) => {
    if (a.active) return -1;
    if (b.active) return 1;
    return 0;
  });

  const select = document.getElementById('tabList');
  select.innerHTML = '<option value="">Select tab</option>' + sortedTabs.map(tab =>
    `<option value="${tab.id}">${tab.title}</option>`
  );

  const handleSelection = (e) => {
    chrome.storage.local.set({ backgroundTab: parseInt(e.target.value) });
    window.close();
  };

  select.addEventListener('change', handleSelection);

  
}

export default updateTabs;