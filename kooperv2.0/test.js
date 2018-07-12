function analize(message) {

    var arrayText = [];

    var colors = {
        "rosso" : "red",
        "verde" : "green",
        "blu" : "blue",
        "giallo" : "yellow",
        "arancio" : "orange",
        "arancione" : "orange",
        "viola" : "violet",
        "marrone" : "brown",
        "bianco" : "white",
        "nero" : "black"
    }

    console.log("hai chiamato analize");

    function elaborateMessage() {
        var lowerCaseMessage = message.toLowerCase();
        console.log("il testo è: " + lowerCaseMessage);
        arrayText = lowerCaseMessage.split(" ");
        //console.log(arrayText);
        
    }

    function findWord(array, word) {
        return array.indexOf(word);
    }

    
    function changeColor() {
        var pos = findWord(arrayText, "colore");
        if(pos !== -1) {
            var color = arrayText[pos+1];
            // console.log(color);
            if(color !== "undefined") {
                if(typeof colors[color] !== "undefined") {  
                    var body = document.getElementsByTagName('body')[0];
                    body.style.backgroundColor = colors[color];
                    var utterance = new SpeechSynthesisUtterance("Colore background modificato, colore scelto:    " + colors[color]);
                    window.speechSynthesis.speak(utterance);
                }
            }
        }
        return "hai chiamato colore";
    }

    function height() {
        var utterance = new SpeechSynthesisUtterance("Hai chiamato la funzione altezza!");
        window.speechSynthesis.speak(utterance);
        return "hai chiamato altezza";
    }

    function length() {
        var utterance = new SpeechSynthesisUtterance("Hai chiamato la funzione larghezza!");
        window.speechSynthesis.speak(utterance);
    }


    var keyWords = {
        colore : changeColor,
        altezza : height,
        larghezza : length
    }


    
    function findKeyWords() {  
        
         var keyWordsArray = Object.keys(keyWords);
        console.log("l'array è " + keyWordsArray);

        for(let i = 0; i < keyWordsArray.length; i++) {
            if(findWord(arrayText, keyWordsArray[i]) !== -1) {
                console.log("ho trovato " + keyWordsArray[i]);
                console.log(keyWords[keyWordsArray[i]]());
            }
        }
    }


    var analizeAPI  = {
        elaborateMessage: elaborateMessage,
        findWord: findWord,
        findKeyWords: findKeyWords
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
        console.log("on result");
        var text = analize(message);
        text.elaborateMessage();
        text.findKeyWords();
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
