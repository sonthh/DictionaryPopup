
const contextMenuId = 'LongmanContextMenu';
const MAX_WORD = 15;
const STORAGE_KEY = 'LONGMAN_HISTORY';

// create longman context menu
const contextMenu = {
  id: contextMenuId,
  title: `Longman lookups "%s"`,
  contexts: ['selection'],
};

chrome.contextMenus.removeAll();
chrome.contextMenus.create(contextMenu);

// user click on longman context menu
chrome.contextMenus.onClicked.addListener(eventData => handleOnClickContextMenu(eventData));

const normalizeURI = (uriString) => {
  return encodeURI(uriString).replace(/%5B/g, '[').replace(/%5D/g, ']');
};

const handleOnClickContextMenu = eventData => {
  const { menuItemId, selectionText } = eventData;

  if (menuItemId !== contextMenuId || !selectionText || selectionText.trim() === '') {
    return;
  }

  // close all current popup windows
  chrome.windows.getAll({ windowTypes: ['popup'] }, windows => {
    if (!windows || !windows.length) return;

    windows.forEach(({ id }) => chrome.windows.remove(id));
  });

  // create new popup window
  const normalizedSelectionText = normalizeURI(selectionText).toLowerCase().trim();

  const url = `https://www.ldoceonline.com/dictionary/${normalizedSelectionText}`;

  const popup = {
    url,
    focused: true,
    type: 'popup', // 'normal' for debugging
    width: Math.round(screen.availWidth * 0.30),
    height: Math.round(screen.availHeight * 0.85),
    top: 0,
    left: Math.round(screen.availWidth * 0.90),
  };

  chrome.windows.create(popup);

  // save data to chrome storage
  const word = selectionText.trim().toLowerCase();

  chrome.storage.sync.get([STORAGE_KEY], result => {
    const histories = result[STORAGE_KEY] || [];

    while (histories.length >= MAX_WORD) { histories.pop(); }

    histories.unshift(word);

    chrome.storage.sync.set({
      [STORAGE_KEY]: histories,
    });
  });
};
