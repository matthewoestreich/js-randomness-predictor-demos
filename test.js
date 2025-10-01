function main() {
  const jsText = "console.log(1);";
  const jsBlob = new Blob([jsText], { type: "text/javascript" });
  const mainScriptUrlOrBlob = URL.createObjectURL(jsBlob);
  console.log(mainScriptUrlOrBlob.toString());
}
main();
