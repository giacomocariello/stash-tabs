chrome.runtime.onStartup.addListener(() => {
  chrome.promise.storage.local.clear();
});

window.unstash =
    async function(stashId, stash, shouldUpdateMessages, sameWindow) {
  await deleteStash(stashId);
  const chromeWindow =
      await(sameWindow ? openStashInSameWindow(stash) : openStash(stash));
  await chrome.promise.storage.local.set(
      {[getStashNameStorageKey(chromeWindow.id)]: stash.name});
  if (shouldUpdateMessages) {
    setMessageRead('openStash');
  }
};
