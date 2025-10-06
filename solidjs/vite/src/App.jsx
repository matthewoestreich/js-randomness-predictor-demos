import { createSignal, createEffect } from "solid-js";
import JSRandomnessPredictor from "js-randomness-predictor/browser";
import { getCurrentBrowser, isCurrentBrowserSupported } from "../../../utils";

// store original Math.random
// We hook Math.random so we can keep the UI updated for every Math.random call.
const MATH_RANDOM = Math.random;

function callMathRandomNTimes(n) {
  const output = [];
  for (let i = 0; i < n; i++) {
    output.push(MATH_RANDOM());
  }
  return output;
}

export default function App() {
  const browser = getCurrentBrowser();
  const sequence = callMathRandomNTimes(browser === "safari" ? 6 : 4);
  // A 'prediction' has the following shape { prediction: number, random: number, correct: boolean }
  const [predictions, setPredictions] = createSignal([]);
  const [predictionIndex, setPredictionIndex] = createSignal(0);
  const [randomIndex, setRandomIndex] = createSignal(0);
  const [status, setStatus] = createSignal("");

  const predictor = isCurrentBrowserSupported(browser) ? JSRandomnessPredictor[browser](sequence) : null;

  let tableRowRefs = [];
  let tableContainerRef;

  // We hook Math.random so we can keep the UI updated for every Math.random call.
  Math.random = () => {
    const r = MATH_RANDOM();
    handleMathRandom(r);
    return r;
  };

  function scrollToRow(rowIndex) {
    const container = tableContainerRef;
    const row = tableRowRefs[rowIndex];
    if (container && row) {
      container.scrollTop = row.offsetTop;
    }
  }

  async function handlePrediction() {
    setStatus(browser === "firefox" ? "Working... (firefox may take a bit longer)" : "Working...");
    const prediction = await predictor.predictNext();
    const index = predictionIndex();
    setPredictions((prev) => {
      if (!prev.length || !prev[index]) {
        return [...prev, { prediction, random: null, correct: null }];
      }
      prev[index].prediction = prediction;
      if (prev[index].random) {
        prev[index].correct = prev[index].random === prediction;
      }
      return [...prev];
    });
    setPredictionIndex((prevIdx) => {
      scrollToRow(prevIdx);
      return prevIdx + 1;
    });
    setStatus("");
  }

  function handleMathRandom(randomNumber = null) {
    const random = randomNumber ?? MATH_RANDOM();
    const index = randomIndex();
    setPredictions((prev) => {
      if (!prev.length || !prev[index]) {
        return [...prev, { random, prediction: null, correct: null }];
      }
      prev[index].random = random;
      if (prev[index].prediction) {
        prev[index].correct = prev[index].prediction === random;
      }
      return [...prev];
    });
    setRandomIndex((prevRand) => {
      scrollToRow(prevRand);
      return prevRand + 1;
    });
  }

  return (
    <div>
      <h1>SolidJS + Vite</h1>
      <p style="margin-bottom:0">
        <small>Browser: {browser || "UNRECOGNIZED"}</small>
      </p>
      <p style="margin-top:0">
        <small>Sequence: {JSON.stringify(sequence)}</small>
      </p>
      <h3>
        <a href="https://github.com/matthewoestreich/js-randomness-predictor-demos/tree/main/solidjs/vite">Source Code</a>
      </h3>
      {!predictor ? (
        <h1>Unsupported Browser! Please use Firefox, Chrome, or Safari</h1>
      ) : (
        <h3>
          You can either call <code>Math.random()</code> by clicking "Call Math.random()" or by opening your browser console and manually calling{" "}
          <code>Math.random()</code>
        </h3>
      )}
      <button onClick={() => handlePrediction()} disabled={!predictor || status() !== ""} style={{ "margin-right": "5px" }}>
        Make Prediction
      </button>
      <button onClick={() => handleMathRandom()} disabled={!predictor}>
        Call Math.random()
      </button>
      <p>{status() ? "STATUS: " + status() : ""}</p>
      <div ref={tableContainerRef} class="table-container" style={{ display: predictor && predictions().length > 0 ? "block" : "none" }}>
        <table style={{ "border-collapse": "separate", "border-spacing": 0 }}>
          <thead>
            <tr>
              <th class="table-header-cell"></th>
              <th class="table-header-cell">Prediction</th>
              <th class="table-header-cell">Math.random()</th>
              <th class="table-header-cell">Correct?</th>
            </tr>
          </thead>
          <tbody>
            {predictions().map((prediction, index) => (
              <tr ref={(el) => (tableRowRefs[index] = el)} key={JSON.stringify(prediction)}>
                <td class="table-data-cell">{index + 1}</td>
                <td class="table-data-cell">{prediction.prediction ?? ""}</td>
                <td class="table-data-cell">{prediction.random ?? ""}</td>
                <td class="table-data-cell">{prediction.correct == null ? "" : prediction.correct.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
