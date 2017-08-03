
(function() {
if (Enabler.isInitialized()) {
    initDC();
} else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, initDC);
}
//Run when Enabler is ready
function initDC(){		
    if(Enabler.isPageLoaded()){
        politeInit();
    }else{
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
    } 
}

function politeInit(){
// array of all the external js files we want to politely load
   loadFiles(BANNER.politeManifest, function () { politeLoadComplete();})

}
    
function loadFiles(arr, onComplete){       
var loadFileIndex = 0;
var fileType;
var files = arr
/**
* Function loads external files
*/
function loadExtScripts() {
    //Load in external Javascript file
    var fileArray = files[loadFileIndex].split(".");
    var fileType = fileArray[fileArray.length-1];
    var extScript;    
    if(fileType == "js"){
       extScript = document.createElement("script");
       extScript.setAttribute("type", "text/javascript");
       extScript.setAttribute("src", Enabler.getUrl(files[loadFileIndex]));
       extScript.onload = function() {
            loadFileHandler();
        }
    document.getElementsByTagName("head")[0].appendChild(extScript);
    }else{
       extScript = document.createElement("link");
       extScript.setAttribute("rel", "stylesheet");
       extScript.setAttribute("type", "text/css");
       extScript.setAttribute("href", Enabler.getUrl(files[loadFileIndex]));
       extScript.onload = function() {
            loadFileHandler();
        }
    document.getElementsByTagName("head")[0].appendChild(extScript); 
    }
}
    
loadExtScripts();

/**
* Fired when an External JS file has been loaded
*/
function loadFileHandler(){
    console.log("JS LOADED (" + files[loadFileIndex] + ")");
    loadFileIndex++;

    if(loadFileIndex < files.length){
        loadExtScripts(); //load next JS file
        }else {
            onComplete();
        }
      }	
    }
  BANNER.loadFiles = loadFiles
    
})()