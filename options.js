document.addEventListener('DOMContentLoaded', () => {
  const acronymList = document.getElementById('acronymList');
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importFile');

  // Load existing acronyms
  chrome.storage.local.get('acronyms', (result) => {
    const acronyms = result.acronyms || {};
    displayAcronyms(acronyms);
  });

  // Display acronyms
  function displayAcronyms(acronyms) {
    acronymList.innerHTML = '';
    Object.entries(acronyms).forEach(([acronym, meaning]) => {
      const li = document.createElement('li');
      li.textContent = `${acronym}: ${meaning}`;
      acronymList.appendChild(li);
    });
  }

  // Export JSON
  exportBtn.addEventListener('click', () => {
    chrome.storage.local.get('acronyms', (result) => {
      const data = JSON.stringify(result.acronyms || {});
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'acronyms.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  });

  // Import JSON
  importBtn.addEventListener('click', () => {
    const file = importFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const importedAcronyms = JSON.parse(e.target.result);
        chrome.storage.local.set({ acronyms: importedAcronyms }, () => {
          displayAcronyms(importedAcronyms);
        });
      };
      reader.readAsText(file);
    }
  });
});
