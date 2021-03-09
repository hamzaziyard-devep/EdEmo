// const socket = io('/')
// const videoGrid = document.getElementById('video-grid')
// const myPeer = new Peer(undefined, {
//   path: '/peerjs',
//   host: '/',
//   port: '5000'
// })






// let myVideoStream;
// const myVideo = document.createElement('video')
// myVideo.muted = true;
// const peers = {}

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('./models')
// ]).then()




// function addVideo(){
//   navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
//   }).then(stream => {
//     myVideoStream = stream;
//     addVideoStream(video, stream)
//     myPeer.on('call', call => {
//       call.answer(stream)
//       const video = document.createElement('video')
//       call.on('stream', userVideoStream => {
//         addVideoStream(video, userVideoStream)
//       })
//     })
// })}


// // navigator.mediaDevices.getUserMedia({
// //   video: true,
// //   audio: true
// // }).then(stream => {
// //   myVideoStream = stream;
// //   addVideoStream(myVideo, stream)
// //   myPeer.on('call', call => {
// //     call.answer(stream)
// //     const video = document.createElement('video')
// //     call.on('stream', userVideoStream => {
// //       addVideoStream(video, userVideoStream)
// //     })
// //   })




//   socket.on('user-connected', userId => {
//     connectToNewUser(userId, stream)
//   })
//   // input value
//   let text = $("input");
//   // when press enter send message
//   $('html').keydown(function (e) {
//     if (e.which == 13 && text.val().length !== 0) {
//       socket.emit('message', text.val());
//       text.val('')
//     }
//   });
//   socket.on("createMessage", message => {
//     $("ul").append(`<li class="message"><b>Participant</b><br/>${message}</li>`);
//     scrollToBottom()
//   })


// socket.on('user-disconnected', userId => {
//   if (peers[userId]) peers[userId].close()
// })

// myPeer.on('open', id => {
//   socket.emit('join-room', ROOM_ID, id)
// })

// function connectToNewUser(userId, stream) {
//   const call = myPeer.call(userId, stream)
//   const video = document.createElement('video')
//   call.on('stream', userVideoStream => {
//     addVideoStream(video, userVideoStream)
//   })
//   call.on('close', () => {
//     video.remove()
//   })

//   peers[userId] = call
// }

// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener(
//     'loadedmetadata', () => {
//     video.play()    
//   })
//   // videoGrid.append(video)
// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   videoGrid.appendChild(canvas)
//   const displaySize = { width: videoGrid.videoWidth, height: videoGrid.videoHeight }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//       const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//       const resizedDetections = faceapi.resizeResults(detections, displaySize)
//       canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//       faceapi.draw.drawDetections(canvas, resizedDetections)
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//       var expressions = {}

//       if (resizedDetections.length > 0) {
//           var det = resizedDetections[0];
//           Object.keys(det['expressions']).forEach(function (key, index) {
//               var expConf = det['expressions'][key];
//               var exp = key;

//               if (expConf > 0 && expConf < 1.1) {
//                   expressions[exp] = expConf;
//               }

//               if (expConf > 0.85) {
//                   topExpression = exp;
//               }
//           });
//       }
//   }, 100)
// })



// const scrollToBottom = () => {
//   var d = $('.main__chat_window');
//   d.scrollTop(d.prop("scrollHeight"));
// }


// const muteUnmute = () => {
//   const enabled = myVideoStream.getAudioTracks()[0].enabled;
//   if (enabled) {
//     myVideoStream.getAudioTracks()[0].enabled = false;
//     setUnmuteButton();
//   } else {
//     setMuteButton();
//     myVideoStream.getAudioTracks()[0].enabled = true;
//   }
// }

// const playStop = () => {
//   console.log('object')
//   let enabled = myVideoStream.getVideoTracks()[0].enabled;
//   if (enabled) {
//     myVideoStream.getVideoTracks()[0].enabled = false;
//     setPlayVideo()
//   } else {
//     setStopVideo()
//     myVideoStream.getVideoTracks()[0].enabled = true;
//   }
// }

// const setMuteButton = () => {
//   const html = `
//     <i class="fas fa-microphone"></i>
//     <span>Mute</span>
//   `
//   document.querySelector('.main__mute_button').innerHTML = html;
// }

// const setUnmuteButton = () => {
//   const html = `
//     <i class="unmute fas fa-microphone-slash"></i>
//     <span>Unmute</span>
//   `
//   document.querySelector('.main__mute_button').innerHTML = html;
// }

// const setStopVideo = () => {
//   const html = `
//     <i class="fas fa-video"></i>
//     <span>Stop Video</span>
//   `
//   document.querySelector('.main__video_button').innerHTML = html;
// }

// const setPlayVideo = () => {
//   const html = `
//   <i class="stop fas fa-video-slash"></i>
//     <span>Play Video</span>
//   `
//   document.querySelector('.main__video_button').innerHTML = html;
// }






var topExpression;

    $(document).ready(function () {
        const video = document.getElementById('video')

        const video_pane = document.getElementById('video-grid')

        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
            faceapi.nets.faceExpressionNet.loadFromUri('./models')
        ]).then(startVideo)

        function startVideo() {
            var constraints = { video: true,};

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => video.srcObject = stream)
                .catch(e => console.error(e));
        }

        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video)
            video_pane.appendChild(canvas)
            const displaySize = { width: video.videoWidth, height: video.videoHeight }
            faceapi.matchDimensions(canvas, displaySize)
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                faceapi.draw.drawDetections(canvas, resizedDetections)
                // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
                // var expressions = {}

                // if (resizedDetections.length > 0) {
                //     var det = resizedDetections[0];
                //     Object.keys(det['expressions']).forEach(function (key, index) {
                //         var expConf = det['expressions'][key];
                //         var exp = key;

                //         if (expConf > 0 && expConf < 1.1) {
                //             expressions[exp] = expConf;
                //         }

                //         if (expConf > 0.85) {
                //             topExpression = exp;
                //         }
                //     });
                // }
            }, 100)
        })

    });