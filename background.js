chrome.runtime.onStartup.addListener(() => {
  chrome.promise.storage.local.clear();
});

/**
 * If chromeWindow is provided, opens in this window.
 */
window.unstash =
    async function(stashId, stash, shouldUpdateMessages, chromeWindow) {
  await deleteStash(stashId);
  if (chromeWindow) {
    await openStashInExistingWindow(stash, chromeWindow);
  } else {
    chromeWindow = await openStash(stash);
  }
  await chrome.promise.storage.local.set(
      {[getStashNameStorageKey(chromeWindow.id)]: stash.name});
  if (shouldUpdateMessages) {
    setMessageRead('openStash');
  }
};
