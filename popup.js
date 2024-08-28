document.getElementById('searchField').addEventListener('input', function () {
  const query = this.value.trim().toUpperCase();

  chrome.storage.local.get('acronyms', (result) => {
    const acronyms = result.acronyms || {};
    const filteredAcronyms = Object.keys(acronyms).filter((acronym) =>
      acronym.includes(query)
    );

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    filteredAcronyms.forEach((acronym) => {
      const meaning = acronyms[acronym];
      const p = document.createElement('p');
      p.textContent = `${acronym}: ${meaning}`;
      resultsDiv.appendChild(p);
    });
  });
});
