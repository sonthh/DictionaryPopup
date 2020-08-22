
// create longman context menu
const contextMenu = {
  id: contextMenuId,
  title: `Look up "%s"`,
  contexts: ['selection'],
};

chrome.contextMenus.removeAll();
chrome.contextMenus.create(contextMenu);

// user click on longman context menu
chrome.contextMenus.onClicked.addListener(eventData => {
  const { menuItemId, selectionText } = eventData;

  if (menuItemId !== contextMenuId || !selectionText || selectionText.trim() === '') {
    return;
  }

  closeAllPopup();
  createNewPopup(selectionText);
  saveToStorage(selectionText);
});

chrome.runtime.onConnect.addListener(port => {
  console.assert(port.name === PORT_MESSAGING);

  port.onMessage.addListener(msg => {

    if (msg.command === messageCommands.openPopup) {
      if (!msg.text) return;
      const selectionText = msg.text;

      closeAllPopup();
      createNewPopup(selectionText);
      saveToStorage(selectionText);

      port.postMessage({ response: 'OK' });
      return;
    }

    if (msg.command === messageCommands.deleteItem) {
      if (!msg._id) return;

      const { _id } = msg;

      deleteById(_id);

      port.postMessage({ response: 'OK' });
      return;
    }

    if (msg.command === messageCommands.focusPopup) {
      focusPopup();
      return;
    }
  });
});

const focusPopup = () => {
  chrome.windows.getAll({ windowTypes: ['popup'] }, windows => {
    if (!windows || !windows.length) {
      createNewPopup('hello');
      return;
    };

    windows.forEach(({ id }) => chrome.windows.update(id, { focused: true }));
  });
}

const closeAllPopup = () => {
  chrome.windows.getAll({ windowTypes: ['popup'] }, windows => {
    if (!windows || !windows.length) return;

    windows.forEach(({ id }) => chrome.windows.remove(id));
  });
}

const normalizeURI = text => {
  return encodeURI(text)
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']')
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}

const createNewPopup = text => {
  const normalizedText = normalizeURI(text).toLowerCase().trim();

  chrome.storage.sync.get([storageKeys.type], result => {
    const type = result[storageKeys.type] || 'longman';

    const url = `${dictionaryUrls[type]}${normalizedText}`;

    const popup = {
      url,
      focused: true,
      type: 'popup', // 'normal'
      width: Math.round(screen.availWidth * 0.30),
      height: Math.round(screen.availHeight * 0.85),
      top: 0,
      left: Math.round(screen.availWidth * 0.90),
    };

    chrome.windows.create(popup);
  });
}

const saveToStorage = text => {
  if (!text) {
    return;
  }

  text = text.trim().toLowerCase();

  chrome.storage.sync.get([storageKeys.history], result => {
    const histories = result[storageKeys.history] || [];

    while (histories.length >= MAX_HISTORY_WORD) { histories.pop(); }

    histories.unshift({
      _id: uniqueId(),
      text,
    });

    chrome.storage.sync.set({
      [storageKeys.history]: histories,
    });
  });
}

const deleteById = _id => {
  if (!_id) return;

  chrome.storage.sync.get([storageKeys.history], result => {
    let histories = result[storageKeys.history] || [];

    histories = histories.filter(each => each._id !== _id);

    chrome.storage.sync.set({
      [storageKeys.history]: histories,
    });
  });
}


const notificationId = 'installed';

chrome.notifications.create(notificationId, {
  iconUrl: chrome.runtime.getURL('../icon_48.png'),
  title: 'Dictionary Popup',
  type: 'progress',
  progress: 100,
  message: 'You have successfully installed the extension',
  // buttons: [{ title: 'Contact' }],
  isClickable: false,
  priority: 2,
}, () => { });

// chrome.notifications.onClicked.addListener(id => {
//   if (notificationId !== id) return;

//   chrome.tabs.create({ url: "https://www.facebook.com/sonthh" });
// });
