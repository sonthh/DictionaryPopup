
const contextMenuId = 'ContextMenuId';
const MAX_HISTORY_WORD = 15;

const PORT_MESSAGING = 'PORT_MESSAGING';

const CTRL_KEY = 17;
const SHIFT_KEY = 16;
const LONG_PRESS = 500; // miliseconds

const SCROLLED_LENGTH = 250; // pixels

const messageCommands = {
  openPopup: 'OPEN_POPUP',
  deleteItem: 'DELETE_ITEM',
  focusPopup: 'FOCUS_POPUP',
};

const storageKeys = {
  history: 'KEY_HISTORY',
  type: 'KEY_DICTIONARY_TYPE',
  settings: {
    pressingCtrl: 'PRESSING_CTRL',
  },
};

const dictionaryUrls = {
  longman: 'https://www.ldoceonline.com/dictionary/',
  oxford: 'https://www.oxfordlearnersdictionaries.com/definition/american_english/',
  cambridge: 'https://dictionary.cambridge.org/dictionary/english/',
  googleImages: 'https://www.google.com/search?tbm=isch&q=',
};

const htmlToElement = html => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstChild;
}

const uniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const copyToClipboard = text => {
  var dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

