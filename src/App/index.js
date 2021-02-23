// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load posenet
// 6. Detect function
// 7. Drawing utilities from tensorflow
// 8. Draw functions

import React, { useRef } from "react";

// access to webcam
import Webcam from "react-webcam";

// running object detection
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

// drawing x, y, point on canvas
import { drawKeypoints, drawSkeleton } from "../utils";

export default function App({project_name = 'Tensorflow.js React Pose Estimation'}) {

  return (  
    <div clasName="App">
      <h1>{project_name}</h1>
      <header>
        {/* where one intakes data for tfjs  */}
        <Webcam ref={webcamRef} className="react-webcam" />

        {/* where one draws the segmentation layer */}
        <Canvas ref={canvasRef} className="react-canvas" />
      </header>
    </div>
  )
}

// video: https://www.youtube.com/watch?v=f7uBsb-0sGQ
// github: https://github.com/nicknochnack/PosenetRealtime