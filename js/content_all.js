
let seletectedText = '';

document.onselectionchange = () => {
  const selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
  seletectedText = selection.trim();
};

// long press Ctrl
let pressTimer = null;
const CTRL_KEY = 17;
const LONG_PRESS = 500;

document.onkeydown = (e) => {
  // e.preventDefault(); // don't play this code => it will block shortcut key like: Ctrl + C,Ctrl + V,....

  if (e.keyCode !== CTRL_KEY || seletectedText.trim() === '') return;

  pressTimer = window.setTimeout(() => openNewWindow(seletectedText), LONG_PRESS);
};

document.onkeyup = (e) => {
  if (!pressTimer) return;

  clearTimeout(pressTimer);
};

// create new popup window by using javascript

const normalizeURI = uriString => {
  return encodeURI(uriString).replace(/%5B/g, '[').replace(/%5D/g, ']');
};

const openNewWindow = seletectedText => {
  const width = Math.round(screen.availWidth * 0.30);
  const height = Math.round(screen.availHeight * 0.85);
  const top = 0;
  const left = Math.round(screen.availWidth * 0.90);

  const popupParams = `titlebar=no,directories=no,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${width},height=${height},left=${left},top=${top}`;

  const normalizedSelectionText = normalizeURI(seletectedText).toLowerCase().trim();

  const url = `https://www.ldoceonline.com/dictionary/${normalizedSelectionText}`;

  newwindow = window.open(url, 'Hello', popupParams);

  if (window.focus) { newwindow.focus() }
}
