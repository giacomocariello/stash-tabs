chrome.runtime.onStartup.addListener(() => {
  chrome.promise.storage.local.clear();
});

window.unstash = async function(
    stashId, stash, shouldUpdateMessages, shouldOpenInCurrentWindow,
    chromeWindow) {
  await deleteStash(stashId);
  if (shouldOpenInCurrentWindow) {
    await openStashInExistingWindow(stash, chromeWindow);
  } else {
    if (chromeWindow.tabs.length == 1 &&
        chromeWindow.tabs[0].url == 'chrome://newtab/') {
      // Don't wait.
      chrome.promise.windows.remove(chromeWindow.id);
    }
    chromeWindow = await openStash(stash);
  }
  await chrome.promise.storage.local.set(
      {[getStashNameStorageKey(chromeWindow.id)]: stash.name});
  if (shouldUpdateMessages) {
    await setMessageRead('openStash');
  }
};
