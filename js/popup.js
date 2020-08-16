
const MAX_WORD = 15;
const STORAGE_KEY = 'LONGMAN_HISTORY';

const normalizeURI = uriString => {
  return encodeURI(uriString).replace(/%5B/g, '[').replace(/%5D/g, ']');
};

const showWindow = text => {
  // close all popup window
  chrome.windows.getAll({ windowTypes: ['popup'] }, windows => {
    if (!windows || !windows.length) return;
    windows.forEach(window => chrome.windows.remove(window.id));
  });

  // create new popup window
  const normalizedSelectionText = normalizeURI(text).toLowerCase().trim();
  const url = `https://www.ldoceonline.com/dictionary/${normalizedSelectionText}`;

  const longmanWindow = {
    url,
    focused: true,
    type: 'popup',
    width: Math.round(screen.availWidth * 0.30),
    height: Math.round(screen.availHeight * 0.85),
    top: 0,
    left: Math.round(screen.availWidth * 0.90),
  };

  chrome.windows.create(longmanWindow);
};

const deleteByIndex = index => {
  if (index < 0) return;

  chrome.storage.sync.get([STORAGE_KEY], result => {
    const histories = result[STORAGE_KEY] || [];

    histories.splice(index, 1);

    chrome.storage.sync.set({
      [STORAGE_KEY]: histories,
    }, () => {
      location.reload();
    });
  });
};

const saveWordToStorage = word => {
  chrome.storage.sync.get([STORAGE_KEY], result => {
    const histories = result[STORAGE_KEY] || [];

    while (histories.length >= MAX_WORD) { histories.pop(); }

    histories.unshift(word);

    chrome.storage.sync.set({
      [STORAGE_KEY]: histories,
    });
  });
};

const handleLookupWord = word => {
  if (!word || typeof word !== 'string' || word.trim() === '') return;

  word = word.trim().toLowerCase();

  showWindow(word);
  saveWordToStorage(word);
};


document.getElementById('btn_oxford_search').onclick = () => {
  const inputText = document.getElementById('txt_oxford_searchfield').value.trim();
  handleLookupWord(inputText);
};

// onkey enter
const $searchInput = document.getElementById('txt_oxford_searchfield');

$searchInput.onkeyup = e => {
  // e.preventDefault();
  if (e.keyCode !== 13) return;

  const inputText = e.target?.value?.trim();
  handleLookupWord(inputText);
};

// retrieve histories and view on UI
chrome.storage.sync.get([STORAGE_KEY], (result) => {
  const histories = result[STORAGE_KEY] || [];
  const $table = document.getElementById('wordTable');

  histories.forEach((text, index) => {
    // row
    const $row = $table.insertRow(-1);
    const $cellWord = $row.insertCell(0);
    const $cellAction = $row.insertCell(1);

    // cell word
    let nodeWord = htmlToElement(`<span>${text}</span>`);

    nodeWord.onclick = () => {
      showWindow(text);
    };

    $cellWord.appendChild(nodeWord);

    // action world
    let nodeAction = htmlToElement(`<span>Delete</span>`);

    nodeAction.onclick = () => {
      console.log(index);
      deleteByIndex(index);
    };

    $cellAction.appendChild(nodeAction);
  });
});

const htmlToElement = html => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstChild;
};

