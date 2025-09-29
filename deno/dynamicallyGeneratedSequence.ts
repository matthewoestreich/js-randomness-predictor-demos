import JSRandomnessPredictor from "js-randomness-predictor";

/**
 *
 * Demo showing how to use a dynamically generated sequence.
 *
 */

export default async function dynamicallyGeneratedSequence() {
  // No param provided, means sequence is generated dynamically.
  // MUST INSTANTIATE OBJECT BEFORE GATHERING EXPECTED!
  const denoPredictor = JSRandomnessPredictor.deno();

  const expectedPredictions = Array.from({ length: 10 }, Math.random);
  const predictions: number[] = [];

  for (let i = 0; i < expectedPredictions.length; i++) {
    const prediction = await denoPredictor.predictNext();
    predictions.push(prediction);
  }

  console.log({
    from: "Dynamically Generated Sequence",
    sequence: denoPredictor.sequence,
    predictions,
    expectedPredictions,
    isCorrect: predictions.every((p, i) => p === expectedPredictions[i]),
  });
}
