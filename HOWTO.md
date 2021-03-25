# HOW-TO

## **1.** Install dependencies

- Install Tensorflow Model [Posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet).
- Full list of dependencies and devDependencies in [package.json]().

## **2.** Import dependencies

- App/index.js
  - `import * as bodypix` and `import * as tf`.
  - `import {useRef} from 'react'`. [useRef link](https://reactjs.org/docs/hooks-reference.html#useref)
    - help us reference our onscreen in DOM elements that keep state during the component lifecycle.

## **3.** Setup webcam and canvas

- App/index.js in `<header />` DOM element.
  - `<Webcam className="react-webcam"/>` return webcam component.
  - `<Canvas className="react-canvas" />` return canvas component.

## **4.** Define references to those

- App/index.js in `App()` component body.
  - connect canvas and webcam components with `useRef`.
  - `const webcamRef = useRef(null);`
  - `const camvasRef = useRef(null);`

## **5.** Load posenet

  ```javascript
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    //
    setInterval(() => {
      detect(net);
    }, 100);
  };
  ```

## **6.** Detect function

  **i.** async function **`detect`** runs when the app starts, goes ahead and detects our model and our webcam.

  **ii.** **`if`** statement will check the **`webcamRef`** is defined with a **`readState`** of 4.

  **iii.** Once **`webcamRef`** is ready, the const **`video`**, **`videoWidth`**, and **`videoHeight`** are defined from **`webcamRef.current.video`**.

  **iv.** Width const **`video, videoWidth, videoHeight`** the width and height of the **`webcamRef`** and **`canvasRef`** are set.

  **v.** await/async **`net.estimateSinglePoser(video)`** is stored in **`pose`** const which returns an **array** of **objects**.

  ```javascript
  // sets canvas and webcam for drawing 
  const detect = async (net) => {
  if (
    typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    // Get Video Properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Make Detections
    const pose = await net.estimateSinglePose(video);
    console.log(pose);

    drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
  }
  ```

## **7.** Drawing utilities from Tensorflow.js

  **i.** Create new `utilities/index.js` file and copy over the [**Tensorflow.js Utilities**](https://github.com/tensorflow/tfjs-models/blob/master/posenet/demos/demo_util.js)

  **ii.** From the file, in our main **`src/App/index.js`** pull out the **`drawSkeleton`** and **`drawKeypoints`** methods.

  ```javascript
  // after the import tensorflow and posenet
  import { drawKeypoints, drawSkeleton } from "../utils";
  ```

## **8.** **drawCanvas** functions

  **i.** Function **`drawCanvas`** in **`src/App/index.js`** is called from within the detect function.

  **ii.** In **`drawCanvas`** pass through our near real-time data **`pose, video, videoWidth, videoHeight, canvas`**.

  **iii.** **`videoWidth, videoHeight`** set the **`canvas.current`** properties.

  ```javascript
  const drawCanvas = (pose, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };
  ```

---

## NPM

1. **Run App** `npm start`
2. Webpack Hot Reloading and ./dist directory bundling.

### npm start

- **scripts**: `npm start` runs scripts: `{ "start": "webpack serve"}`,
  - webpack commmands are stored in package.json#scripts
  - alternatively run `npx webpack` or `node_modules/./bin/webpack`

---

## Package.JSON

### Packaging App

- **scripts**: `npm start` runs scripts: { "start": "webpack serve"},
- **main**: `webpack.config.js` is where webpack starts bundling from.

---

## WEBPACK HOW-TO

- **Webpack**: Module bundler.
- **webpack-cli**: is the interface we use to communicate with webpack.
- **webpack-dev-server**: info coming soon.

### Plugins

- **CopyWebpackPlugin**: info coming soon.
- **HtmlWebpackPlugin**: info coming soon.
- **CleanWebpackPlugin**: info coming soon.
- **UglifyPlugin**: info coming soon.

---

## BABEL HOW-TO

### Babel Loader

### Babel Presets

- **@babel/preset-env**: info coming soon.
- **@babel/preset-react**: info coming soon.

### Babel Plugins

- **@babel/plugin-transform-runtime**: info coming soon.
- **@babel/plugin-proposal-pipeline-operator**: info coming soon.
- **@babel/plugin-syntax-dynamic-import**: info coming soon.

---

## TREE

- Install Tree with Homebrew using `brew install tree`
- To create dir structure `tree -I 'node_modules|package-lock.json|dist'`
