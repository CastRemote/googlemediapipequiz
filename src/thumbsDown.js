import * as fp from 'fingerpose'; 

export const thumbsDownGesture = new fp.GestureDescription('thumbs_down');
thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);
// do this for all other fingers
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    thumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    thumbsDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
  }
// describe thumbs down gesture 
// export const thumbsDownGesture= new GestureDescription('thumbs_down');

// thumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl);
// thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 0);
//     thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
//     thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);
// for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
//     thumbsDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
//     thumbsDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
//   }