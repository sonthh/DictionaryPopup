

export const contextMenuId = 'ContextMenuId';
export const MAX_HISTORY_WORD = 15;

export const PORT_MESSAGING = 'PORT_MESSAGING';

export const CTRL_KEY = 17;
export const SHIFT_KEY = 16;
export const LONG_PRESS = 500; // miliseconds

export const SCROLLED_LENGTH = 250; // pixels

export const messageCommands = {
  openPopup: 'OPEN_POPUP',
  deleteItem: 'DELETE_ITEM',
  focusPopup: 'FOCUS_POPUP',
};

export const storageKeys = {
  history: 'KEY_HISTORY',
  type: 'KEY_DICTIONARY_TYPE',
  settings: {
    pressingAlt: 'PRESSING_ALT',
  },
};

export const dictionaryOptions = {
  longman: 'Longman',
  oxford: 'Oxford',
  cambridge: 'Cambridge',
  googleImages: 'Google Images',
  traCauVn: 'Tracau.vn',
  sohaTraTu: 'Tratu.soha.vn',
  googleTranslate: 'Google Translate'
}

export const dictionaryUrls = {
  longman: 'https://www.ldoceonline.com/dictionary/',
  oxford: 'https://www.oxfordlearnersdictionaries.com/definition/american_english/',
  cambridge: 'https://dictionary.cambridge.org/dictionary/english/',
  googleImages: 'https://www.google.com/search?tbm=isch&q=',
  sohaTraTu: 'http://tratu.soha.vn/dict/en_vn/',
  traCauVn: 'https://tracau.vn/?s=',
  googleTranslate: 'https://translate.google.com/#view=home&op=translate&sl=en&tl=vi&text='
};

export const htmlToElement = html => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstChild;
}

export const uniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const copyToClipboard = text => {
  const temp = document.createElement('textarea');
  document.body.appendChild(temp);

  temp.value = text;
  temp.select();

  document.execCommand('copy');

  document.body.removeChild(temp);
}

