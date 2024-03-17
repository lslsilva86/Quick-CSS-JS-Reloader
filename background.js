chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reloadStylesheetsAndScripts,
  });
});

function reloadStylesheetsAndScripts() {
  var queryString = '?reload=' + new Date().getTime();

  // Reload stylesheets
  document.querySelectorAll('link[rel="stylesheet"], link[rel="stylesheet preload"]').forEach(function (link) {
    link.href = link.href.replace(/\?.*|$/, queryString);
  });

  // Reload scripts
  document.querySelectorAll('script').forEach(function (script) {
    if (script.src) {
      script.src = script.src.replace(/\?.*|$/, queryString);
    }
  });
}
