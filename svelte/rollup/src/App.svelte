<script>
  import { tick } from "svelte";
  import JSRandomnessPredictor from "js-randomness-predictor/browser";
  import { getCurrentBrowser, isCurrentBrowserSupported } from "../../helperFunctions";

  // Hook Math.random so we can update our UI if someone calls it from console.
  const MATH_RANDOM = Math.random;
  Math.random = () => {
    const r = MATH_RANDOM();
    handleMathRandom(r);
    return r;
  }

  const browser = getCurrentBrowser();
  const isSupported = isCurrentBrowserSupported(browser);

  const tableRowRefs = [];
  let tableContainerRef;

  // A 'prediction' has the following shape { prediction: number, random: number, correct: boolean }
  let predictions = [];
  let predictionIndex = 0;
  let randomIndex = 0;
  let status = "";
  let sequence = null;
  let predictor = null;

  if (isSupported) {
    sequence = callMathRandomNTimes(browser === "safari" ? 6 : 4);
    predictor = JSRandomnessPredictor[browser](sequence);
    console.log(predictor);
  }

  async function scrollToRow(index) {
    await tick();
    const container = tableContainerRef;
    const row = tableRowRefs[index];
    if (container && row) {
      container.scrollTop = row.offsetTop;
    }
  }

  async function handlePrediction() {
    status = browser === "firefox" || browser === "safari" ? "Working... (firefox|safari may take a bit longer)" : "Working...";
    const prediction = await predictor.predictNext();
    if (!predictions.length || !predictions[predictionIndex]) {
      predictions.push({ prediction, random: null, correct: null });
    } else {
      predictions[predictionIndex].prediction = prediction;
      if (predictions[predictionIndex].random) {
        predictions[predictionIndex].correct = predictions[predictionIndex].random === prediction;
      }
    }
    predictions = [...predictions];
    await scrollToRow(predictionIndex);
    predictionIndex = predictionIndex + 1;
    status = "";
  }

  async function handleMathRandom(n = null) {
    const random = n ?? MATH_RANDOM();
    if (!predictions.length || !predictions[randomIndex]) {
      predictions.push({ prediction: null, random, correct: null });
    } else {
      predictions[randomIndex].random = random;
      if (predictions[randomIndex].prediction) {
        predictions[randomIndex].correct = predictions[randomIndex].prediction === random;
      }
    }
    predictions = [...predictions];
    await scrollToRow(randomIndex);
    randomIndex = randomIndex + 1;
  }

  function callMathRandomNTimes(n) {
    const output = [];
    for (let i = 0; i < n; i++) output.push(MATH_RANDOM());
    return output;
  }
</script>

<main>
  <h1>Svelte + Rollup</h1>
  <p style="margin-bottom: 0">
    <small>Browser: {browser}</small>
  </p>
  <p style="margin-top: 0">
    <small>Sequence: {sequence}</small>
  </p>
  <h3>
    <a href="https://github.com/matthewoestreich/js-randomness-predictor-demos/tree/main/vue/vite">Source Code</a>
  </h3>
  {#if !isSupported}
    <h1>Unsupported Browser! Please use Firefox, Chrome, or Safari</h1>
  {:else}
    <div>
      <h3>
        You can either call <code>Math.random()</code> by clicking "Call Math.random()" or by opening your browser console and manually calling{" "}
        <code>Math.random()</code>
      </h3>
      <button on:click={() => handlePrediction()} disabled={predictor === null || status !== ""} style="margin-right: 5px">Make Prediction</button>
      <button on:click={() => handleMathRandom()} disabled={predictor === null}>Call Math.random()</button>
      <br />
      <p>{status !== "" ? "STATUS: " + status : ""}</p>
      <br />
      {#if predictions.length > 0}
        <div bind:this={tableContainerRef} class="table-container">
          <table style="border-collapse: separate; border-spacing: 0">
            <thead>
              <tr>
                <th class="table-header-cell"></th>
                <th class="table-header-cell">Prediction</th>
                <th class="table-header-cell">Math.random()</th>
                <th class="table-header-cell">Correct?</th>
              </tr>
            </thead>
            <tbody>
              {#each predictions as prediction, index (JSON.stringify(prediction))}
                <tr bind:this={tableRowRefs[index]}>
                  <td class="table-data-cell">{index + 1}</td>
                  <td class="table-data-cell">{prediction.prediction ?? ""}</td>
                  <td class="table-data-cell">{prediction.random ?? ""}</td>
                  <td class="table-data-cell">{prediction.correct == null ? "" : prediction.correct.toString()}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  {/if}
</main>

<style>
  p,
  small {
    word-break: break-all;
  }

  button {
    height: 5rem;
    width: 10rem;
    cursor: pointer;
  }

  .table-container {
    display: flex;
    justify-content: center;
    max-height: 500px;
    overflow-y: auto;
  }

  .table-header-cell {
    border: 1px solid black;
    padding: 6px;
    background-color: white;
  }

  .table-data-cell {
    border: 1px solid black;
    padding: 6px;
  }
</style>
