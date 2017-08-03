// JavaScript Document

function DCVideoFunctions (vContainer){
var root = this;
var p = DCVideoFunctions;

function init(){
    BANNER.dom = BANNER.dom || {}; 
   // p.adContainer = ad; 
    p.vid = vContainer;
    setUpDom();
    addListeners();
    addVideoTracking();
    BANNER.dom.vidMuteBtn.style.display = 'block';
    BANNER.dom.vidPlayBtn.style.display = 'block';
    BANNER.dom.vidStopBtn.style.display = 'block';
    BANNER.dom.vidReplayBtn.style.display = 'block';
}
init();
    
function addVideoTracking () {
   // console.log(this)
	//Add in the Video Files - These are 3 different codecs due to different browser specifications - we recommend you have all 3 filetypes.
	p.vid.innerHTML='<source id="video_1_mp4_src_dc" type="video/mp4" src="'+Enabler.getUrl("vids/video.mp4")+'" />'+
                   '<source id="video_1_ogg_src_dc" type="video/ogg" src="'+Enabler.getUrl("vids/video.ogg")+'" />'+
                   '<source id="video_1_webm_sr_dcc" type="video/webm" src="'+Enabler.getUrl("vids/video.webm")+'" />';
	
	Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
		studio.video.Reporter.attach('video_1', p.vid);
	});

} 


function setUpDom (){
    BANNER.dom.vidPlayBtn = document.getElementById('video_control_play_dc');
    BANNER.dom.vidPauseBtn = document.getElementById('video_control_pause_dc');
    BANNER.dom.vidStopBtn = document.getElementById('video_control_stop_dc');
    BANNER.dom.vidReplayBtn = document.getElementById('video_control_replay_dc');
    BANNER.dom.vidUnmuteBtn = document.getElementById('video_control_unmute_dc');
    BANNER.dom.vidMuteBtn = document.getElementById('video_control_mute_dc');    
    BANNER.dom.bgExit = document.getElementById('background_exit_dc');
   } 
    

function addListeners () {
	BANNER.dom.bgExit.addEventListener('click', bgExitHandler, false);
	BANNER.dom.vidPlayBtn.addEventListener('click', function(){root.pausePlayHandler()}, false);
	BANNER.dom.vidPauseBtn.addEventListener('click', function(){root.pausePlayHandler()}, false);
	BANNER.dom.vidMuteBtn.addEventListener('click', function(){root.muteHandler()}, false);
	BANNER.dom.vidUnmuteBtn.addEventListener('click', function(){root.UnmuteHandler()}, false);
	BANNER.dom.vidReplayBtn.addEventListener('click', replayHandler, false);
	BANNER.dom.vidStopBtn.addEventListener('click', function(){root.stopHandler();}, false);
	p.vid.addEventListener('ended', videoEndHandler, false);	
  }
    
p.prototype.pausePlayHandler = function() {
     //console.log(vid.paused);
	//alert(e);
	if (p.vid.paused) {
        //console.log(vid.paused);
		p.vid.play();
		//Show Pause button and hide Play button
		BANNER.dom.vidPauseBtn.style.display = 'block';
		BANNER.dom.vidPlayBtn.style.display = 'none';
    	p.vid.volume = 1.0;
	} else {
		//If not paused then Pause
		p.vid.pause();
		//Show Play button and hide Pause button
		BANNER.dom.vidPauseBtn.style.display = 'none';
		BANNER.dom.vidPlayBtn.style.display = 'block';
	}
   
}
    

function bgExitHandler (e) {
	//Call Exits
	Enabler.exit('HTML5_Background_Clickthrough');
	Enabler.counter("EVENT_VIDEO_STOP");
	//set video's first frame
	p.vid.currentTime = 0;
	//Pause film
	p.vid.pause();
	//Show required buttons
	 BANNER.dom.vidPauseBtn.style.display  = 'none';
	 BANNER.dom.vidPlayBtn.style.display = 'block';
	
	isFirstPlay = true;
    BANNER.ad.stopAd();
}
    
p.prototype.muteHandler = function (e) {
		p.vid.volume = 0.0;
		BANNER.dom.vidMuteBtn.style.display = 'none';
		BANNER.dom.vidUnmuteBtn.style.display = 'block';
}

p.prototype.UnmuteHandler = function (e) {
		p.vid.volume = 1.0;
		BANNER.dom.vidMuteBtn.style.display = 'block';
		BANNER.dom.vidUnmuteBtn.style.display = 'none';
}

p.prototype.stopHandler = function(e){
	Enabler.counter("EVENT_VIDEO_STOP");
	//set video's first frame
	p.vid.pause();
	//Show required buttons
	BANNER.dom.vidPauseBtn.style.display = 'none';
	BANNER.dom.vidPlayBtn.style.display = 'block';
	isFirstPlay = true;
}

function replayHandler (e) {
	p.vid.currentTime = 0;
	//Play film
	p.vid.play();
	//Turn sound on
	p.vid.volume = 1.0;
	//Show required buttons
    BANNER.dom.vidPauseBtn.style.display = 'block';
	BANNER.dom.vidMuteBtn.style.display = 'block';
	
	isFirstPlay = true;
}

function videoEndHandler (e) {
    p.vid.currentTime = 0;
	p.vid.pause();
    BANNER.dom.vidPauseBtn.style.display = 'none';
    BANNER.dom.vidPlayBtn.style.display = 'block';
	isFirstPlay = true;
    BANNER.ad.stopAd();
}
}