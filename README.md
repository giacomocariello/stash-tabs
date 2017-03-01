# Stash Tabs (a Chrome extension)

A session manager with little UI and a lot of attention to detail.

## File Structure

- `popup.html/js/css` — popup window, created/destroyed each time popup is opened.
- `background.html/js` — background page that is always present.
- `main.js` — logic not specific to the popup or the background page.
- `lib/...` — library files (`moment.min.js`: 2.14.1).
