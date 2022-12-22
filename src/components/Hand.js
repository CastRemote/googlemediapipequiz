// 0. Clone gestures repo DONE
// 0. Install packages DONE
// 1. Create new gesture definition DONE
// 2. Import gesture into handpose DONE


///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "../App.css";
import { drawHand } from "../utilities";
import { thumbsDownGesture } from "../thumbsDown";
///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";

///////// NEW STUFF IMPORTS


const Hand=(props)=>{
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  const [counter, setCounter]= useState(1);
  var count=1; 
  const [timer, setTimer]= useState(null);
  let flag=true;

  // const images = { };
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    const nets = await handpose.load();
    // setNet(nets);
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    count=props.questionId;
    flag=false;
    setTimer(setInterval(() => {
      detect(nets);
    }, 100))
  };

  const detect = async (net) => {
    // Check data is available
    // console.log(flag)
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      (webcamRef.current.video.readyState === 4 && !flag)
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.ThumbsUpGesture,
          // thumbsUpDescription,
          // victoryDescription,
          thumbsDownGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 9);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log(gesture.gestures[0].name,"mj",gesture.gestures);
          setEmoji(gesture.gestures[0].name);
          // console.log(counter,props.questionId);
          
          if(counter===props.questionId){
            if(gesture.gestures[0].name==="thumbs_up"){
              await setCounter(counter+1);   
              flag=true;
              setEmoji(null)
              props.onSelected('Engineer',counter);  
              await clearInterval(timer);
            }
            else if(gesture.gestures[0].name==="thumbs_down"){
              await setCounter(counter+1)    
              flag=true;
              setEmoji(null)
              props.onSelected('Other',counter);  
              await clearInterval(timer);
            }
          }

          // console.log(emoji);
        }
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };
// useEffect(()=>{
// runHandpose();
// },[])

  useEffect(()=>{
    console.log("hello",props.questionId,counter)
    setTimer(null);
    if(counter===props.questionId){
      flag=false
      runHandpose();
    }
    },[props.questionId]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 540,
            height: 380,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {/* NEW STUFF */}
        {emoji !== null ? (
          <h1
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 100,
              right: 0,
              textAlign: "center",
              height: 100,
              color:"white"
            }}
          >{emoji==="thumbs_up"?"yes":"no"}</h1>
        ) : (
          ""
        )}

        {/* NEW STUFF */}
      </header>
    </div>
  );
}
export default Hand

