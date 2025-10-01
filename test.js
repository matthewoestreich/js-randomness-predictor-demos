let e = undefined;
callPOC();

function callPOC() {
  try {
    console.log("callPOC");
    if (emscriptenPOC != undefined) {
      e = emscriptenPOC;
    }
    if (!e || e == undefined) {
      console.log("e not found");
      setTimeout(() => callPOC(), 1000);
    } else {
      e = emscriptenPOC;
      e(Module).then((moduleInstance) => console.log("emscriptenPOC() has been called!", { moduleInstance }));
    }
  } catch (err) {
    if (!e || e == undefined) {
      console.log("e not found");
      setTimeout(() => callPOC(), 1000);
    } else {
      e = emscriptenPOC;
      e(Module).then((moduleInstance) => console.log("emscriptenPOC() has been called!", { moduleInstance }));
    }
  }
}