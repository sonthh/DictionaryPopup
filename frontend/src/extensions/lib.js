/*global chrome*/

export const getStorage = (keys = []) => {

  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(keys, result => {
        return resolve(result);
      });
    } catch (err) {
      return reject(err);
    }
  });

};

export const setStorage = (key, value) => {

  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set({
        [key]: value,
      });
    } catch (err) {
      return reject(err);
    }
  });

};

