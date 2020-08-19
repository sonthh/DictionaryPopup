
let seletectedText = '';

document.onselectionchange = () => {
  const selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
  seletectedText = selection.trim();
};

// long press Ctrl
let pressTimer = null;

document.onkeydown = (e) => {
  // e.preventDefault(); // don't play this code => it will block shortcut key like: Ctrl + C,Ctrl + V,....

  if (e.keyCode !== CTRL_KEY || seletectedText.trim() === '') return;

  chrome.storage.sync.get([storageKeys.settings.pressingCtrl], result => {
    const isAllowPressingCtrl = result[storageKeys.settings.pressingCtrl];
    if (!isAllowPressingCtrl) {
      return;
    }
    pressTimer = window.setTimeout(() => openNewWindow(seletectedText), LONG_PRESS_CTRL);
  });


};

document.onkeyup = (e) => {
  if (!pressTimer) return;

  clearTimeout(pressTimer);
};

const port = chrome.runtime.connect({ name: PORT_MESSAGING });

const openNewWindow = seletectedText => {
  port.postMessage({ command: messageCommands.openPopup, text: seletectedText });
}

// port.onMessage.addListener(msg => {
//   if (msg.response === 'OK') {
//     console.log('Message from background script');
//     return;
//   }
// });