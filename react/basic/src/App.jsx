import { useState } from "react";
import JSRandomnessPredictor from "js-randomness-predictor";

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
	if (currentBrowser === "" || !currentBrowser) {
		return false;
	}
	return supportedBrowsers.includes(currentBrowser);
}

// Store original Math.random as a global variable.
// We hook Math.random so we can keep our predictor in sync with Math.random.
const MATH_RANDOM = Math.random;

export default function App() {
	const [browser] = useState(getCurrentBrowser());
	const [predictor] = useState(() => {
		if (isCurrentBrowserSupported(browser)) {
			return JSRandomnessPredictor[browser](Array.from({ length: 4 }, Math.random));
		}
		return null;
	});

	// A 'prediction' has the following shape { prediction: number, random: number, correct: boolean }
	const [predictions, setPredictions] = useState([]);
	const [predictionIndex, setPredictionIndex] = useState(0);
	const [randomIndex, setRandomIndex] = useState(0);
	const [status, setStatus] = useState("");

	// We hook Math.random so we can keep our predictor in sync with Math.random.
	Math.random = () => {
		const random = MATH_RANDOM();
		handleMathRandom(random);
		return random;
	};

	async function handlePrediction() {
		setStatus("Working...");
		const prediction = await predictor.predictNext();
		setPredictions((prev) => {
			if (!prev.length || !prev[predictionIndex]) {
				return [...prev, { prediction, random: null, correct: null }];
			}
			prev[predictionIndex].prediction = prediction;
			if (prev[predictionIndex].random) {
				prev[predictionIndex].correct = prev[predictionIndex].random === prediction;
			}
			return [...prev];
		});
		setPredictionIndex((prev) => prev + 1);
		setStatus("");
	}

	function handleMathRandom(randomNumber = null) {
		const random = randomNumber ?? MATH_RANDOM();
		setPredictions((prev) => {
			if (!prev.length || !prev[randomIndex]) {
				return [...prev, { random, prediction: null, correct: null }];
			}
			prev[randomIndex].random = random;
			if (prev[randomIndex].prediction) {
				prev[randomIndex].correct = prev[randomIndex].prediction === random;
			}
			return [...prev];
		});
		setRandomIndex((prev) => prev + 1);
	}

	return (
		<div>
			<p><small>Browser: {browser === "" ? "UNRECOGNIZED" : browser}</small></p>
			{predictor === null ? (
				<h1>Unsupported Browser! Please use Firefox, Chrome, or Safari</h1>
			) : (
				<p style={{ fontSize: "24px", maxWidth: "600px" }}>
					<b>
						You can either call <code>Math.random()</code> by clicking "Call Math.random()" or by opening your browser console and manually calling <code>Math.random()</code>
					</b>
				</p>
			)}
			<button onClick={() => handlePrediction()} disabled={predictor === null || status !== ""} style={{ marginRight: "5px" }}>
				Make Prediction
			</button>
			<button onClick={() => handleMathRandom()} disabled={predictor === null}>
				Call Math.random()
			</button>
			<br />
			<p>{status !== "" ? "STATUS: " + status : ""}</p>
			<br />
			<div style={{ maxHeight: "400px", maxWidth: "600px", overflowY: "auto", position: "relative", display: predictor !== null && predictions.length > 0 ? "block" : "none" }}>
				<table style={{ borderCollapse: "separate", borderSpacing: 0 }}>
					<thead>
						<tr>
							<th style={{ border: "1px solid black", padding: "6px", position: "sticky", top: 0, zIndex: 10, backgroundColor: "white" }}></th>
							<th style={{ border: "1px solid black", padding: "6px", position: "sticky", top: 0, zIndex: 10, backgroundColor: "white" }}>Prediction</th>
							<th style={{ border: "1px solid black", padding: "6px", position: "sticky", top: 0, zIndex: 10, backgroundColor: "white" }}>Math.random()</th>
							<th style={{ border: "1px solid black", padding: "6px", position: "sticky", top: 0, zIndex: 10, backgroundColor: "white" }}>Correct?</th>
						</tr>
					</thead>
					<tbody>
						{predictions.map((prediction, index) => {
							return (
								<tr>
									<td style={{ border: "1px solid black", padding: "6px" }}>{index + 1}</td>
									<td style={{ border: "1px solid black", padding: "6px" }}>{prediction.prediction ?? ""}</td>
									<td style={{ border: "1px solid black", padding: "6px" }}>{prediction.random ?? ""}</td>
									<td style={{ border: "1px solid black", padding: "6px" }}>{prediction.correct === null ? "" : prediction.correct.toString()}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
