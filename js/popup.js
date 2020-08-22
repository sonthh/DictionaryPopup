
const port = chrome.runtime.connect({ name: PORT_MESSAGING });

const settupSelection = () => {

  ///
  const $settingPressCtrl = document.querySelector('input#settingPressCtrl');

  $settingPressCtrl.onchange = e => {
    const { checked } = e.target;

    chrome.storage.sync.set({
      [storageKeys.settings.pressingCtrl]: checked,
    });
  };

  // select dictionay control
  const $selectDictionary = document.getElementById('selectDictionary');

  $selectDictionary.onchange = e => {
    const { value } = e.target;

    chrome.storage.sync.set({
      [storageKeys.type]: value,
    });
  }

  //
  chrome.storage.sync.get([storageKeys.type, storageKeys.settings.pressingCtrl], result => {
    const type = result[storageKeys.type] || 'longman';
    $selectDictionary.value = type;

    let isAllowPressingCtrl = result[storageKeys.settings.pressingCtrl];
    if (isAllowPressingCtrl === undefined) {
      isAllowPressingCtrl = true;
    }
    $settingPressCtrl.checked = isAllowPressingCtrl;

  });
}

const handleLookupWord = word => {
  if (!word || typeof word !== 'string' || word.trim() === '') return;

  word = word.trim().toLowerCase();

  port.postMessage({ command: messageCommands.openPopup, text: word });
};

const settupSearchInput = () => {
  // search button
  document.getElementById('btnSearch').onclick = () => {
    const inputText = document.getElementById('inputSearch').value.trim();
    handleLookupWord(inputText);
  };

  // search text input
  const $searchInput = document.getElementById('inputSearch');

  $searchInput.onfocus = () => {
    $searchInput.select();
  }

  $searchInput.onkeyup = e => {
    if (e.keyCode !== 13) return;

    const inputText = e.target?.value?.trim();
    handleLookupWord(inputText);
  };
}

settupSelection();
settupSearchInput();

// retrieve histories and view on UI
chrome.storage.sync.get([storageKeys.history], result => {
  const histories = result[storageKeys.history] || [];
  const $table = document.getElementById('historyTable');

  histories.forEach((each, index) => {
    // row
    const $row = $table.insertRow(-1);
    const $cellWord = $row.insertCell(0);
    const $cellAction = $row.insertCell(1);

    //
    const { text, _id } = each;

    // cell word
    let nodeWord = htmlToElement(`<span>${text}</span>`);

    $cellWord.onclick = () => {
      port.postMessage({ command: messageCommands.openPopup, text });
    };

    $cellWord.appendChild(nodeWord);

    // action world
    let nodeDelete = htmlToElement(`<span class='btnDelete' title='Delete "${text}"'> </span>`);

    nodeDelete.onclick = () => {
      port.postMessage({ command: messageCommands.deleteItem, _id });
      $row.remove();
    };

    $cellAction.appendChild(nodeDelete);

    let nodeCopy = htmlToElement(`<span class='btnCopy' title='Copy to clipboard'></span>`);

    nodeCopy.onclick = () => {
      copyToClipboard(text);
    };

    $cellAction.appendChild(nodeCopy);
  });
});

const tabButtons = document.querySelectorAll('div.infomation > a');

tabButtons.forEach(each => {
  each.onclick = e => {
    const tabContents = document.querySelectorAll('.tabcontent');
    tabContents.forEach(each => each.style.display = 'none');
    const tabId = each.getAttribute('tabid');
    document.getElementById(tabId).style.display = 'block';
  }
});

