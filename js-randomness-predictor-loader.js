// Use a self-executing async function to handle the promises from fetch
(async () => {
  let mainScriptUrlOrBlob;
  try {
    // Step 1: Fetch the main JavaScript file and the WebAssembly binary
    const [jsResponse, wasmResponse] = await Promise.all([
      fetch("https://z3-tawny.vercel.app/z3-built.js"),
      fetch("https://z3-tawny.vercel.app/z3-built.wasm"),
    ]);

    console.log({ step: "1. fetch stuff", jsResponse, wasmResponse });

    if (!jsResponse.ok || !wasmResponse.ok) {
      throw new Error("Failed to fetch Emscripten files.");
    }

    // Step 2: Get the script text and create a blob URL
    const jsText = await jsResponse.text();
    const jsBlob = new Blob([jsText], { type: "text/javascript" });
    mainScriptUrlOrBlob = URL.createObjectURL(jsBlob);

    console.log({ step: "2. set mainScriptUrlOrBlob", jsText, jsBlob });
    console.log({ step: "3. Define Module" });

    // Step 3: Define the Module object with mainScriptUrlOrBlob
    var Module = {
      // Set the location of the WASM file for loading
      locateFile: (path, prefix) => {
        console.log({ step: "locateFile", path, prefix });
        if (path.endsWith(".wasm")) {
          return "https://z3-tawny.vercel.app/z3-built.wasm";
        }
        return prefix + path;
      },
      mainScriptUrlOrBlob: mainScriptUrlOrBlob,
      print: (text) => {
        const outputDiv = document.getElementById("output");
        outputDiv.textContent += text + "\n";
      },
      printErr: (text) => {
        console.error(text);
      },
      onRuntimeInitialized: () => {
        // Optional: Clean up the blob URL after the runtime has started
        // For a multithreaded app, it's safer to leave this until the app exits
        console.log("initZ3 runtime initialized.");
        // URL.revokeObjectURL(mainScriptUrlOrBlob);
      },
    };

    console.log({ step: "4. Module now defined, adding local script tag", Module });

    // Step 4: Create a script tag and append it to the body to execute the code
    const script = document.createElement("script");
    script.src = mainScriptUrlOrBlob;
    document.body.appendChild(script);

    function initialize() {
      try {
        if (typeof initZ3 === "undefined") {
          console.log("initZ3 not found, will try again in 1sec");
          setTimeout(() => initialize(), 1000);
        } else {
          initZ3(Module).then((moduleInstance) => {
            console.log("initZ3 Initialized!", { moduleInstance });
            window.initZ3 = initZ3;
            window.loaded_initZ3 = initZ3;
          });
        }
      } catch (e) {}
    }
    initialize();

    // For pthreads, the main thread's script URL is not used by workers.
    // However, the Module.mainScriptUrlOrBlob needs to be a URL, not a Blob,
    // for the workers to be able to use fetch() against it.
  } catch (error) {
    console.error("An error occurred during Emscripten loading:", error);
    const outputDiv = document.getElementById("output");
    outputDiv.textContent = `Error: ${error.message}`;
  }

  // Step 5: Clean up the Blob URL
  // It's best to revoke the URL only after the application and all its workers
  // have completed, to avoid race conditions.
  // For this example, we'll keep it simple and assume the app is short-lived.
  ////setTimeout(() => {
  ////  if (mainScriptUrlOrBlob) {
  ////    URL.revokeObjectURL(mainScriptUrlOrBlob);
  ////    console.log("Blob URL revoked.");
  ////  }
  ////}, 5000);
})();
