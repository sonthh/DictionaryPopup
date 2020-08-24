
const doubleClick = () => {
  const selectionText = window.getSelection().toString();

  if (!selectionText || selectionText.trim() === '') {
    return;
  }

  const normalizeURI = uriString => {
    return encodeURI(uriString)
      .replace(/%5B/g, '[')
      .replace(/%5D/g, ']')
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  };

  const normalizedSelectionText = normalizeURI(selectionText).toLowerCase().trim();

  chrome.storage.sync.get([storageKeys.type], result => {
    const type = result[storageKeys.type] || 'longman';

    const url = `${dictionaryUrls[type]}${normalizedSelectionText}`;

    window.location.href = url;
  });
}

document.body.addEventListener('dblclick', doubleClick);

const makeNavigationButton = () => {
  // navigation buttons will be appended to this element
  let $target = document.querySelector('.search_title')
    || document.querySelector('.entry_content .pagetitle')
    || document.querySelector('.error_title');

  if (!$target) {
    return;
  }

  // go forward button
  const $goforward = document.createElement('span');

  $goforward.innerHTML = 'Forward';
  $goforward.title = 'Go forward';
  $goforward.className = 'btnNavigation';

  $goforward.onclick = () => {
    history.forward();
    return false;
  }

  $target.appendChild($goforward);

  // goback button
  const $goback = document.createElement('span');

  $goback.innerHTML = 'Back';
  $goback.title = 'Go back';
  $goback.className = 'btnNavigation';

  $goback.onclick = () => {
    history.back();
    return false;
  }

  $target.appendChild($goback);
};

const makeBackToTopButton = () => {
  const $backToTop = document.createElement('button');

  $backToTop.innerHTML = 'Top';
  $backToTop.title = 'Back to top';
  $backToTop.className = 'btnBackToTop';

  $backToTop.onclick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  window.onscroll = () => {
    if (document.body.scrollTop > SCROLLED_LENGTH || document.documentElement.scrollTop > SCROLLED_LENGTH) {
      $backToTop.style.display = 'block';
      return;
    }

    $backToTop.style.display = 'none';
  }

  document.querySelector('body').appendChild($backToTop);
};

makeNavigationButton();
makeBackToTopButton();