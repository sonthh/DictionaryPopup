
/*global chrome*/
import { PORT_MESSAGING, messageCommands } from '../contants/index'

const nodeEnv = process.env.NODE_ENV;
const extensionId = 'lbdbjmmjcdgdjfckgciempmphhjeghel'
let port = null;

try {
  if (nodeEnv === 'production') {
    port = chrome.runtime.connect({ name: PORT_MESSAGING });
  }

  if (nodeEnv === 'development') {
    port = chrome.runtime.connect(extensionId, { name: PORT_MESSAGING });
  }

} catch (err) { }

export const handleLookupWord = async word => {
  try {
    if (!word || typeof word !== 'string' || word.trim() === '') return;

    word = word.trim().toLowerCase();

    port.postMessage({ command: messageCommands.openPopup, text: word });
  } catch (err) {
    return Promise.reject(err);
  }
};
