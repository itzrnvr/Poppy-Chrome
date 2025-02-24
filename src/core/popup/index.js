chrome.tabs.query({}, tabs => {
    const select = document.getElementById('tabList');
    select.innerHTML = tabs.map(tab => 
      `<option value="${tab.id}">${tab.title}</option>`
    );
    
    select.addEventListener('change', (e) => {
      chrome.storage.local.set({ backgroundTab: parseInt(e.target.value) });
    });
  });