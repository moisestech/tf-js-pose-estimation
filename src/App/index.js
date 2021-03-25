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
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });

    // run detect function on a specific basis near real-time
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // sets canvas and webcam for drawing 
  const detect = async (net) => {
    // Check data is available
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

      // to pass utility functions real-time data
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  // updates the utility functions w/ data to the canvas
  const drawCanvas = (pose, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  // inits model
  runPosenet();

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