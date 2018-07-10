function analize(message) {

    var arrayText;

    var colors = {
        "rosso" : "red",
        "verde" : "green",
        "blu" : "blue",
        "giallo" : "yellow",
        "arancio" : "orange",
        "arancione" : "orange",
        "viola" : "violet",
        "marrone" : "brown"
    }

    function elaborateMessage() {
        var lowerCaseMessage = message.toLowerCase();
        console.log(lowerCaseMessage);
        arrayText = lowerCaseMessage.split(" ");
        // console.log(arrayText);
        
    }

    function findWord(word) {
        return arrayText.indexOf(word);
    }

    
    function changeColor() {
        var pos = findWord("colore");
        if(pos !== -1) {
            var color = arrayText[pos+1];
            // console.log(color);
            if(color !== "undefined") {
                if(typeof colors[color] !== "undefined") {  
                    var body = document.getElementsByTagName('body')[0];
                    body.style.backgroundColor = colors[color];
                }
            }
        }
    }

    var analizeAPI  = {
        elaborateMessage: elaborateMessage,
        findWord: findWord,
        changeColor: changeColor
    }
    
    return analizeAPI;

}



function recordAudio()
{
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    
    // recognition.lang = 'en-US';
    recognition.lang = 'it';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();
    var message;
    console.log("record");

    recognition.onresult = function(event) {
        message = event.results[0][0].transcript;
        var text = analize(message);
        text.elaborateMessage();
        text.changeColor();
    };
    
    recognition.onspeechend = function() {
        recognition.stop();
        console.log('Speech recognition has stopped.');
    }

    recognition.onerror = function(event) {
        console.log('Speech recognition error detected: ' + event.error);
    }
   
}

window.onload = function()
{
    const button = document.getElementById('start');
    button.addEventListener("click" , function()
    {
        recordAudio();
    }); 
}
