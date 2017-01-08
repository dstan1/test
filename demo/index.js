var videos = document.querySelectorAll('video');
var behavior = document.querySelector('#behavior');

if (location.search === '?enabled=false') {
	behavior.innerHTML = '(module disabled everywhere via <code>?enabled=false</code>';
} else if (location.search === '?enabled=true') {
	enableVideos(true);
	behavior.innerHTML = '(module enabled everywhere (whether it’s necessary or not) via <code>?enabled=true</code>)';
} else {
	enableVideos();
}

 function blurElement(element, size) {
    var filterVal = 'blur(' + size + 'px)';
    var filterVal2 = 'blur(0px)';
    $(element).css({
        'filter':filterVal,
        'webkitFilter':filterVal,
        'mozFilter':filterVal,
        'oFilter':filterVal,
        'msFilter':filterVal,
        'transition':'all 0.5s ease-out',
        '-webkit-transition':'all 0.5s ease-out',
        '-moz-transition':'all 0.5s ease-out',
        '-o-transition':'all 0.5s ease-out'
    }).delay(500);

}

function enableButtons(video) {
	var playBtn = video.parentNode.querySelector('.play');
	var fullscreenButton = video.parentNode.querySelector('.fullscreen');

	if (playBtn) {
		playBtn.addEventListener('click', function () {
			if (video.paused) {
				$(video).animate({'opacity':'1'},500);
	//			blurElement('video', 2);
				video.play();
			} 
		});
	}

	if (fullscreenButton) {
		fullscreenButton.addEventListener('click', function () {
			video.webkitEnterFullScreen();
		});
	}
}

// debug events
function debugEvents(video) {
	[
		'loadstart',
		'progress',
		'suspend',
		'abort',
		'error',
		'emptied',
		'stalled',
		'loadedmetadata',
		'loadeddata',
		'canplay',
		'canplaythrough',
		'playing', // fake event
		'waiting',
		'seeking',
		'seeked',
		'ended',
	// 'durationchange',
		'timeupdate',
		'play', // fake event
		'pause', // fake event
	// 'ratechange',
	// 'resize',
	// 'volumechange',
		'webkitbeginfullscreen',
		'webkitendfullscreen',
	].forEach(function (event) {
		video.addEventListener(event, function () {
			console.info('@', event);
		});
	});
}

function enableVideos(everywhere) {
	for (var i = 0; i < videos.length; i++) {
		window.makeVideoPlayableInline(videos[i], !videos[i].hasAttribute('muted'), !everywhere);
		enableButtons(videos[i]);
		debugEvents(videos[i]);
	}
          
}


	    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
        //        $(this).animate({'opacity':'1'},500);
                $(this).trigger('click');
                

            }
        });
    });


