document.addEventListener('DOMContentLoaded', function () {
  var reloadCssButton = document.getElementById('reloadCss');
  if (reloadCssButton) {
    reloadCssButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: reloadStylesheets,
        });
      });
    });
  }

  var reloadJsButton = document.getElementById('reloadJs');
  if (reloadJsButton) {
    reloadJsButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: reloadScripts,
        });
      });
    });
  }
});

function reloadStylesheets() {
  var queryString = '?reload=' + new Date().getTime();
  document.querySelectorAll('link[rel="stylesheet"], link[rel="stylesheet preload"]').forEach(function (link) {
    link.href = link.href.replace(/\?.*|$/, queryString);
  });
}

function reloadScripts() {
  var queryString = '?reload=' + new Date().getTime();
  document.querySelectorAll('script').forEach(function (script) {
    if (script.src) {
      script.src = script.src.replace(/\?.*|$/, queryString);
    }
  });
}
