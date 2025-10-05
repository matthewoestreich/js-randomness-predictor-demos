export function getCurrentBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") > -1) {
    return "chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "safari";
  } else if (userAgent.indexOf("Edge") > -1) {
    return "edge";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    return "opera";
  } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
    return "internetExplorer";
  }
  return "";
}

export function isCurrentBrowserSupported(currentBrowser = "") {
  const supportedBrowsers = ["chrome", "firefox", "safari"];
  if (currentBrowser === "" || !currentBrowser) {
    return false;
  }
  return supportedBrowsers.includes(currentBrowser);
}
