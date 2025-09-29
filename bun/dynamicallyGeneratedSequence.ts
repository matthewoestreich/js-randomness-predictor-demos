import JSRandomnessPredictor from "js-randomness-predictor";

/**
 *
 * Demo showing how to use a dynamically generated sequence.
 *
 */

function callMathRandom(n = 1): number[] {
  const o: number[] = [];
  for (let i = 0; i < n; i++) {
    o.push(Math.random());
  }
  return o;
}

export default async function dynamicallyGeneratedSequence() {
  // No param provided, means sequence is generated dynamically.
  // MUST INSTANTIATE OBJECT BEFORE GATHERING EXPECTED!
  const bunPredictor = JSRandomnessPredictor.bun();

  const expectedPredictions = callMathRandom(10);
  const predictions: number[] = [];

  for (let i = 0; i < expectedPredictions.length; i++) {
    const prediction = await bunPredictor.predictNext();
    predictions.push(prediction);
  }

  console.log({
    from: "Dynamically Generated Sequence",
    sequence: bunPredictor.sequence,
    predictions,
    expectedPredictions,
    isCorrect: predictions.every((p, i) => p === expectedPredictions[i]),
  });
}
