<script setup>
import { reactive, ref, watch, nextTick } from "vue";
import JSRandomnessPredictor from "js-randomness-predictor/browser";
import { getCurrentBrowser, isCurrentBrowserSupported } from "../../../utils";

// Hook Math.random so we can update our UI if someone calls it from console.
const MATH_RANDOM = Math.random;
Math.random = () => {
  const r = MATH_RANDOM();
  handleMathRandom(r);
  return r;
};

const tableContainerRef = ref(null);
const tableRowRefs = reactive([]);
const predictions = reactive([]);
const randomIndex = ref(0);
const predictionIndex = ref(0);
const scrollToIndex = ref(0);
const sequence = ref(null);
const status = ref("");
const browser = getCurrentBrowser();
const isSupported = ref(isCurrentBrowserSupported(browser));

let predictor = null;

if (isSupported.value) {
  sequence.value = callMathRandom(browser === "safari" ? 6 : 4);
  predictor = JSRandomnessPredictor[browser](sequence.value);
}

function callMathRandom(ntimes = 1) {
  const output = [];
  for (let i = 0; i < ntimes; i++) {
    output.push(MATH_RANDOM());
  }
  return output;
}

async function handlePrediction() {
  status.value = browser === "firefox" || browser === "safari" ? "Working... (firefox|safari may take a bit longer)" : "Working...";
  const prediction = await predictor.predictNext();
  if (!predictions.length || !predictions[predictionIndex.value]) {
    predictions.push({ prediction, random: null, correct: null });
  } else {
    predictions[predictionIndex.value].prediction = prediction;
    if (predictions[predictionIndex.value].random) {
      predictions[predictionIndex.value].correct = predictions[predictionIndex.value].random === prediction;
    }
  }
  scrollToIndex.value = predictionIndex.value;
  predictionIndex.value++;
  status.value = "";
}

function handleMathRandom(n = null) {
  const random = n ?? MATH_RANDOM();
  if (!predictions.length || !predictions[randomIndex.value]) {
    predictions.push({ prediction: null, random, correct: null });
  } else {
    predictions[randomIndex.value].random = random;
    if (predictions[randomIndex.value].prediction) {
      predictions[randomIndex.value].correct = predictions[randomIndex.value].prediction === random;
    }
  }
  scrollToIndex.value = randomIndex.value;
  randomIndex.value++;
}

watch(scrollToIndex, () => {
  nextTick(() => {
    const index = scrollToIndex.value;
    if (index === null || index < 0) return;
    const container = tableContainerRef.value;
    const row = tableRowRefs[index];
    if (container && row) container.scrollTop = row.offsetTop;
    scrollToIndex.value = null;
  });
});
</script>

<template>
  <div>
    <h1>Vue + Vite</h1>
    <p style="margin-bottom: 0">
      <small>Browser: {{ browser }}</small>
    </p>
    <p style="margin-top: 0">
      <small>Sequence: {{ sequence }}</small>
    </p>
    <h3>
      <a href="https://github.com/matthewoestreich/js-randomness-predictor-demos/tree/main/vue/vite">Source Code</a>
    </h3>
    <h1 v-if="!isSupported">Unsupported Browser! Please use Firefox, Chrome, or Safari</h1>
    <div v-else>
      <h3>
        You can either call <code>Math.random()</code> by clicking "Call Math.random()" or by opening your browser console and manually calling{" "}
        <code>Math.random()</code>
      </h3>
      <button @click="() => handlePrediction()" :disabled="predictor === null || status !== ''" style="margin-right: 5px">Make Prediction</button>
      <button @click="() => handleMathRandom()" :disabled="predictor === null">Call Math.random()</button>
      <br />
      <p>{{ status !== "" ? "STATUS: " + status : "" }}</p>
      <br />
      <div v-if="predictions.length > 0" ref="tableContainerRef" class="table-container">
        <table style="border-collapse: separate; border-spacing: 0">
          <thead>
            <tr>
              <th className="table-header-cell"></th>
              <th className="table-header-cell">Prediction</th>
              <th className="table-header-cell">Math.random()</th>
              <th className="table-header-cell">Correct?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prediction, index) in predictions" :key="JSON.stringify(prediction)" :ref="(el) => (tableRowRefs[index] = el)">
              <td className="table-data-cell">{{ index + 1 }}</td>
              <td className="table-data-cell">{{ prediction.prediction ?? "" }}</td>
              <td className="table-data-cell">{{ prediction.random ?? "" }}</td>
              <td className="table-data-cell">{{ prediction.correct === null ? "" : prediction.correct.toString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  display: block;
  justify-content: center;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%;
}

table {
  width: 100%;
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
