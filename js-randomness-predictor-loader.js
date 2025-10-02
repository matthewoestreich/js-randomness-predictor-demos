(async () => {
  let mainScriptUrlOrBlob;
  try {
    const [jsResponse, wasmResponse] = await Promise.all([
      fetch("https://z3-tawny.vercel.app/z3-built.js"),
      fetch("https://z3-tawny.vercel.app/z3-built.wasm"),
    ]);

    if (!jsResponse.ok || !wasmResponse.ok) {
     console.error("js-randomness-predictor Failed to fetch z3 files", { jsResponse: jsResponse.ok, wasmResponse: wasmResponse.ok });
    }

    const jsText = await jsResponse.text();
    const jsBlob = new Blob([jsText], { type: "text/javascript" });
    mainScriptUrlOrBlob = URL.createObjectURL(jsBlob);

    var Module = {
      locateFile: (path, prefix) => {
        console.log({ step: "locateFile", path, prefix });
        if (path.endsWith(".wasm")) {
          return "https://z3-tawny.vercel.app/z3-built.wasm";
        }
        return prefix + path;
      },
      mainScriptUrlOrBlob: mainScriptUrlOrBlob,
      onRuntimeInitialized: () => {
        console.log("from jsrp-loader : js-randomness-predictor initialized.");
      },
    };

    const script = document.createElement("script");
    script.src = mainScriptUrlOrBlob;
    script.id = `z3-built-jsrp`;
    document.body.appendChild(script);

    function initialize() {
      try {
        if (typeof initZ3 === "undefined") {
          console.log("from jsrp-loader : initZ3 is undefined");
          setTimeout(() => initialize(), 1000);
        } else {
          if (window.initZ3) {
            console.log("from jsrp-loader : window.initZ3 now exists", window.initZ3);
            //window.initZ3(Module);
            return;
          }
          //initZ3(Module).then((initializedZ3Module) => {
          //  console.log({status:"initialized",initializedZ3Module});
          //  window.initZ3 = initializedZ3Module;
          //});
        }
      } catch (e) {
        console.error("js-randomness-predictor something went wrong during initialize()", e);
      }
    }
    initialize();

  } catch (error) {
    console.error("js-randomness-predictor an error occurred during loading:", error);
  }
})();
