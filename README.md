# js-randomness-predictor-demos
Demos and examples for js-randomness-predictor

To add a demo:

- Create appropriate folder for your demo
  - If you're making an advanced svelte demo, create the folder strucutre `./svelte/advanced/` 
- Make your demo
- Create `build:some:unique:name` script in the `package.json` file located at the root of this project
- Add your `build:some:unique:name` script to the main `build` script in the `package.json` file located at the root of this project
- **DO NOT** have your build remove anything in `docs` - just add to it
- Try to name your files with the prefix of your demo's path 
  - eg. if you made a `svelte/advanced` folder, try to keep your files named `svelt-advanced.html` or whatever
- Add your demos HTML file to the list in `./index.html` (the `index.html` file located at the root of this project)
- run `npm run build` from project root, push to GH