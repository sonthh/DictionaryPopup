
let seletectedText = '';

document.onselectionchange = () => {
  const selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
  seletectedText = selection.trim();
};

// long press Ctrl
let pressTimer = null;

document.onkeydown = (e) => {
  // e.preventDefault(); // don't play this code => it will block shortcut key

  if (e.keyCode === SHIFT_KEY) {
    pressTimer = window.setTimeout(() => focusWindow(), LONG_PRESS);
    return;
  }

  if (e.keyCode === ALT_KEY && seletectedText && seletectedText.trim() !== '') {
    chrome.storage.sync.get([storageKeys.settings.pressingAlt], result => {

      let isAllowpressingAlt = result[storageKeys.settings.pressingAlt];

      if (isAllowpressingAlt === undefined) {
        isAllowpressingAlt = true;
      }

      if (!isAllowpressingAlt) {
        return;
      }

      pressTimer = window.setTimeout(() => openNewWindow(seletectedText), LONG_PRESS);
    });

    return;
  }
};

document.onkeyup = e => {
  if (!pressTimer) return;

  clearTimeout(pressTimer);
};

const port = chrome.runtime.connect({ name: PORT_MESSAGING });

const openNewWindow = seletectedText => {
  port.postMessage({ command: messageCommands.openPopup, text: seletectedText });
}

const focusWindow = () => {
  port.postMessage({ command: messageCommands.focusPopup });
}


// port.onMessage.addListener(msg => {
//   if (msg.response === 'OK') {
//     console.log('Message from background script');
//     return;
//   }
// });