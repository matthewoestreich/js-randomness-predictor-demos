(async () => {
  const elStatus = document.getElementById("status");
  const elPredictorSection = document.getElementById("predictor-section");
  const elMakePrediction = document.getElementById("make-prediction");
  const elCallMathRandom = document.getElementById("call-math-random");
  const elPredictions = document.getElementById("predictions");
  const elActualRandoms = document.getElementById("actual-randoms");

  // Hook Math.random so we keep our UI in sync if Math.random is called from console
  const MATH_RANDOM = Math.random;
  Math.random = () => {
    const rand = MATH_RANDOM();
    elActualRandoms.innerText += rand + "\n";
    return rand;
  };

  const CURRENT_BROWSER = getCurrentBrowser();
  const IS_SUPPORTED_BROWSER = isCurrentBrowserSupported(CURRENT_BROWSER);

  document.getElementById("your-current-browser").innerText = CURRENT_BROWSER === "" ? "UNRECOGNIZED BROWSER" : CURRENT_BROWSER;
  document.getElementById("is-your-current-browser-supported").innerText = IS_SUPPORTED_BROWSER ? "Yes" : "No";

  // RETURN EARLY IF UNSUPPORTED BROWSER
  if (!IS_SUPPORTED_BROWSER) {
    return;
  }

  // "MAIN"

  const predictor = JSRandomnessPredictor[CURRENT_BROWSER](callMathRandom(CURRENT_BROWSER === "safari" ? 6 : 4));

  elCallMathRandom.disabled = false;
  elMakePrediction.disabled = false;
  elPredictorSection.style.display = "block";

  elMakePrediction.addEventListener("click", async (e) => {
    elMakePrediction.disabled = true;
    elStatus.innerText = CURRENT_BROWSER === "firefox" ? "STATUS: Working... (firefox may take a bit longer)" : "STATUS: Working...";
    const p = await predictor.predictNext();
    elPredictions.innerText += p + "\n";
    elMakePrediction.disabled = false;
    elStatus.innerText = "";
  });

  elCallMathRandom.addEventListener("click", (e) => {
    elActualRandoms.innerText += MATH_RANDOM() + "\n";
  });

  // MISC FUNCTIONS

  function callMathRandom(nTimes = 1) {
    const output = [];
    for (let i = 0; i < nTimes; i++) {
      output.push(MATH_RANDOM());
    }
    return output;
  }

  function getCurrentBrowser() {
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

  function isCurrentBrowserSupported(currentBrowser = "") {
    const supportedBrowsers = ["chrome", "firefox", "safari"];
    return !(currentBrowser === "" || !currentBrowser) && supportedBrowsers.includes(currentBrowser);
  }
})();
