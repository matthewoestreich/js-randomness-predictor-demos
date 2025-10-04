# js-randomness-predictor-demos

Demos and examples for js-randomness-predictor

# Commands

**To build for production**

eg. run this before pushiing to GitHub..

`npm run build`

**To build locally for testing**

eg. to test how the entire 'site' operates using `server.js` at the root of this project..

`npm run build:dev`

**To start local dev server**

will start `server.js` at project root

`npm run dev`

# To add a demo:

- Create appropriate folder for your demo
  - If you're making an advanced svelte demo, create the folder strucutre `./svelte/advanced/`
- Make your demo
- BUILDING
  - Create `build:some:unique:name` script in the `package.json` file located at the root of this project
  - Add your `build:some:unique:name` script to the main `build` script in the `package.json` file located at the root of this project
  - If you have any dev-specific options/scenarios then add those to the `package.json` file (at the root of this project) under the `"build:dev"` script.
- OUTPUT
  - **DO NOT** have your build remove anything in `docs` - just add to it
  - Keep alll of your built files in a folder named after the path to your demo folder.
    - eg. if you made a `/svelte/advanced` folder, try to keep all of your output files in a directory named `svelt-advanced/` or whatever
    - Your output folder should go in `/docs`.
    - So your full output/build path would be `/docs/svelte-advanced/<your built files>`
- Add your demos HTML file to the list in `./index.html` (the `index.html` file located at the root of this project)
- run `npm run build` from project root, push to GH
