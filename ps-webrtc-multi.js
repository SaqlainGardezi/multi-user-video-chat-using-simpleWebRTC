window.onload=function(){
	// Grab the room name from the  URL
	var room=location.search && location.search.split('?')[1];

	// Create our WebRTC connection
	var webrtc = new SimpleWebRTC({
			// the element that will hld local video
		localVideoEl: 'localVideo',
			// the element that will hold remote videos
		remoteVideosEl:'remotes',
		autoRequestMedia: true,
		log: true
		});


	// When it's ready, and we have a room from the URL, join the call
	webrtc.on('readyToCall', function(){
		if (room) { webrtc.joinRoom(room); }
	});

	// Set the room name
	function setRoom(name){
		$('form').remove();
		$('h1').text('Welcome to room:' + name);
		$('#subTitle').text('Share this link to have friends join you: ');
		$('#roomLink').text(location.href);
		$('body').addClass('active');
	}

	// If there's room, show it in the UI
	if (room) {
		setRoom(room);
	}else{ // If not, create one when user submits the form
		$('form').submit(function(){
			var val=$('#sessionInput').val().toLowerCase();
			webrtc.createRoom(val, function(err, name){
				var newUrl=location.pathname + '?' + name;
				if (!err) {
					history.replaceState({foo: 'bar'}, null, newUrl);
					setRoom(name);
				}
			});
			return false;
		});

	}

///////////---------- Following format is not supported for screen sharing -----//////

// // Extra credit! Hook up screenshare button
// 	 var button = $('#screenShareButton'),
// 	 setButton= function(bool){
// 	 	button.text(bool? 'share screen': 'stop sharing');
// 	 };

// 	 setButton(true);

// 	 if(!webrtc.screenSharingSupport){
// 	 	button[0].disabled=true;
// 	 	console.log(webrtc+ "hello");
// 	 }else{
// 	 	button.click(function(){
// 	 		if (webrtc.localScreen) {
// 	 			webrtc.stopScreenShare();
// 	 			setButton(true);
// 	 		}else{
// 	 			webrtc.shareScreen();
// 	 			setButton(false);
// 	 		}
// 	 	});
//	 }

 };

