import JSRandomnessPredictor from  "js-randomness-predictor";

/**
 *
 * Demo showing how to provide your own sequence.
 *
 */

function callMathRandom(n = 1): number[] {
  const o: number[] = [];
  for (let i = 0; i < n; i++) {
    o.push(Math.random());
  }
  return o;
}

export default async function manuallyProvidedSequence() {
  // MUST GENERATE SEQUENCE PRIOR TO GENERATING EXPECTED PREDICTIONS!!
  const sequence = callMathRandom(8);
  const expectedPredictions = callMathRandom(10);
  const predictions: number[] = [];

  // Since we are providing our own sequence, we can instantiate it anytime.
  const bunPredictor = JSRandomnessPredictor.bun(sequence);

  for (let i = 0; i < expectedPredictions.length; i++) {
    const prediction = await bunPredictor.predictNext();
    predictions.push(prediction);
  }

  console.log({
    from: "Manually Provided Sequence",
    sequence,
    predictions,
    expectedPredictions,
    isCorrect: predictions.every((p, i) => p === expectedPredictions[i]),
  });
}
