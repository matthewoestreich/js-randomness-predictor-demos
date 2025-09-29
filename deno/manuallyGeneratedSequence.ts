import JSRandomnessPredictor from "npm:js-randomness-predictor";

/**
 *
 * Demo showing how to provide your own sequence.
 *
 */

export default async function manuallyProvidedSequence() {
  // MUST GENERATE SEQUENCE PRIOR TO GENERATING EXPECTED PREDICTIONS!!
  const sequence = Array.from({ length: 4 }, Math.random);
  const expectedPredictions = Array.from({ length: 10 }, Math.random);
  const predictions: number[] = [];

  // Since we are providing our own sequence, we can instantiate it anytime.
  const denoPredictor = JSRandomnessPredictor.deno(sequence);

  for (let i = 0; i < expectedPredictions.length; i++) {
    const prediction = await denoPredictor.predictNext();
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
