# js-randomness-predictor-demos

Demos and examples for [js-randomness-predictor](https://github.com/matthewoestreich/js-randomness-predictor)

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
  - Add your build command to the `build_commands.json` file at the root of this project.
  - Follow existing convention for providing environmental variables (those under `env` will be applied to non-dev builds)
- OUTPUT
  - **DO NOT** have your build remove anything in `docs` - just add to it
  - Keep alll of your built files in a folder named after the path to your demo folder.
    - eg. if you made a `/svelte/advanced` folder, try to keep all of your output files in a directory named `svelt-advanced/` or whatever
    - Your output folder should go in `/docs`.
    - So your full output/build path would be `/docs/svelte-advanced/<your built files>`
- Add your demos HTML file to the list in `./index.html` (the `index.html` file located at the "./webroot" folder)
- run `npm run build` from project root, push to GH

# To update `js-randomness-predictor` version in all demos:

We look for a `package.json` file in a directory. If one exists, we updgrade the `js-randomness-predictor` version

From root of project run:

```
node upgrade-jsrp.js
```
