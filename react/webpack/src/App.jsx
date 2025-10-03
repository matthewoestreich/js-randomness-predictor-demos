import { useState } from "react";
import { isCurrentBrowserSupported } from "../../helperFunctions";
import JSRandomnessPredictor, { getCurrentBrowser, firefox } from "js-randomness-predictor/umd";

const MATH_RANDOM = Math.random;

function callMathRandomNTimes(n) {
  const output = [];
  for (let i = 0; i < n; i++) {
    output.push(MATH_RANDOM());
  }
  return output;
}

export default function App() {
  const [currentBrowser, _setCurrentBrowser] = useState(() => getCurrentBrowser());
  const [isBrowserSupported] = useState(isCurrentBrowserSupported(currentBrowser));
  const [predictor, _setPredictor] = useState(() => {
    console.log(currentBrowser);
    if (!isCurrentBrowserSupported(currentBrowser)) {
      return null;
    }
    const sequence = callMathRandomNTimes(currentBrowser === "safari" ? 6 : 4);
    return JSRandomnessPredictor[currentBrowser](sequence);
  });
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState(null);

  const handleMakePrediction = async () => {
    try {
      setStatus("Working...");
      const p = await predictor.predictNext();
      setPrediction(p);
      setStatus(null);
    } catch (e) {
      setStatus(`Something went wrong! ${e.message}`);
    }
  }

  return (
    isBrowserSupported ? (
      <div>
        <h1>Hello React + Webpack 🚀</h1>
        {status === null ? <></> : <p>STATUS: {status}</p>}
        {status === null && prediction !== null ? (<h3>Prediction: {prediction}</h3>) : (<></>)}
        <button onClick={handleMakePrediction}>Make Prediction</button>
      </div>
    ) : (
      <h1>Browser {currentBrowser} not supported!</h1>
    )
  );
}
