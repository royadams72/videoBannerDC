//var startAd = function(){
BANNER.ad = BANNER.ad || {};

(function () {
var p = BANNER.ad;
var expandedAd = BANNER.expandedAd;
var container_dc = document.getElementById("container_dc");    

var bg1 = document.getElementById("bg1");
var text1 = document.getElementById("text1"); 
var playHead = document.getElementById("playHead");
var playBtn = document.getElementById("playBtn");    

var frameDelay = 1.5, framePause = .5, textFadeSpeed = .75, pulseCount = 0;

p.init = function( w, h, container ) {
    p.adWidth = w;
    p.adHeight = h;
    p.container = container;
    TweenMax.set(p.container, {display:'block', width: p.adWidth+'px', height: p.adHeight+'px',  });
    TweenMax.set(bg1, {display:'block', width: p.adWidth+'px', height: p.adHeight+'px'});
    TweenMax.set(text1, {display:'block', width: p.adWidth+'px', height: p.adHeight+'px'});
    TweenMax.set(playHead, {display:'block', width: p.adWidth+'px', height: p.adHeight+'px'});
    TweenMax.set(playBtn, {display:'block', width: p.adWidth+'px', height: p.adHeight+'px'});
    playBtn.addEventListener("click", startVideo, false);
    this.startAd();
}

p.startAd = function (){
 frame1();
}
    
p.stopAd = function (){
    TweenMax.killAll();
    TweenMax.set(playBtn, {display:'block'});
    TweenMax.set(video_container_dc, {display:'none'});
    TweenMax.to([playHead, text1], 0.7, {alpha:1}) 
   
}

function frame1() {
    TweenMax.to(text1, textFadeSpeed, {
        opacity: 1,
        y: -5
    }), TweenMax.delayedCall( textFadeSpeed, loop)
}

function loop() {
    TweenMax.to(playHead, textFadeSpeed, {
        opacity: 1
    }), pulseCount >= 1 || TweenMax.to(playHead, textFadeSpeed, {
        opacity: 0,
        delay: textFadeSpeed,
        onComplete: function() {
            pulseCount++, loop()
        }
    })
}    
    

function frame2() {
    pulseCount = 0;
    TweenMax.to( [ touch_points_txt ], textFadeSpeed, {
        opacity: 1,
        y: -5
    }), TweenMax.delayedCall( textFadeSpeed , loop2)
}    

function startVideo (){
    dcVidFunctions.pausePlayHandler();
    dcVidFunctions.muteHandler();
    TweenMax.set(playBtn, {display:'none'});
    TweenMax.set(video_container_dc, {display:'block'});
    TweenMax.to([playHead, text1], 0.7, {alpha:0}) 
}
    
}());