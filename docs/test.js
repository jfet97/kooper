function analize(message) {

    var arrayText = [];

    var colors = {
        "rosso": "red",
        "verde": "green",
        "blu": "blue",
        "giallo": "yellow",
        "arancio": "orange",
        "arancione": "orange",
        "viola": "violet",
        "marrone": "brown",
        "bianco": "white",
        "nero": "black"
    }

    var keyWords = {
        comandi: commands,
        colore: changeColor,
        altezza: height,
        larghezza: length,
        spesa: shopping
    }


    function elaborateMessage() {
        var lowerCaseMessage = message.toLowerCase();
        console.log("il parlato contiene: " + lowerCaseMessage);
        arrayText = lowerCaseMessage.split(" ");
    }

    function findWord(array, word) {
        return array.indexOf(word);
    }


    function checkValue(pos, offset) {
        var value = arrayText[pos + offset];
        if(value !== undefined) return value;
        return undefined;
    }

    function findKeyWords() {
        var keyWordsArray = Object.keys(keyWords);
        console.log("l'array è " + keyWordsArray);
        for (let i = 0; i < keyWordsArray.length; i++) {
            var pos = findWord(arrayText, keyWordsArray[i]);
            if (pos !== -1) {
                console.log("ho trovato " + keyWordsArray[i]);
                console.log(keyWords[keyWordsArray[i]](pos));
            }
        }
    }






    function changeColor(pos) {
        var color = checkValue(pos, 1);
        if (color !== undefined) {
            if (typeof colors[color] !== "undefined") {
                var body = document.getElementsByTagName('body')[0];
                body.style.backgroundColor = colors[color];
                var utterance = new SpeechSynthesisUtterance("Colore background modificato, colore scelto:    " + color);
                window.speechSynthesis.speak(utterance);
            }
        }
        return "hai chiamato colore";
    }

    function height(pos) {
        var height = checkValue(pos, 2);
        if ( (height !== "undefined") && (!isNaN(height)) ) {
            var button = document.getElementById("start");
            var heightString = height + "px";
            button.style.height = heightString;
            var utterance = new SpeechSynthesisUtterance("Hai modificato l'altezza del bottone di " + height + "pixels.");
            window.speechSynthesis.speak(utterance);
        }
        return "hai chiamato altezza";
    }

    function length(pos) {
        var width = checkValue(pos, 2);
        if ( (width !== "undefined") && (!isNaN( width)) ) {
            var button = document.getElementById("start");
            var widthString = width + "px";
            button.style.width = widthString;
            var utterance = new SpeechSynthesisUtterance("Hai modificato la larghezza del bottone di " + width + "pixels.");
            window.speechSynthesis.speak(utterance);
        }
        return "hai chiamato larghezza";
    }

    function commands() {
        var utterance = new SpeechSynthesisUtterance("I comandi disponibili sono: ");
        window.speechSynthesis.speak(utterance);
        var keyWordsArray = Object.keys(keyWords);
        for (let i = 0; i < keyWordsArray.length; i++) {
            let _utterance = new SpeechSynthesisUtterance(`${keyWordsArray[i]}`);
            window.speechSynthesis.speak(_utterance);
        }
        return "hai chiamato comandi";
    }

    function shopping() {
        var utterance = new SpeechSynthesisUtterance("Vacci tu a farti la spesa, brutto idiota!");
        window.speechSynthesis.speak(utterance);
        return "hai chiamato spesa";
    }



    


    var analizeAPI = {
        elaborateMessage: elaborateMessage,
        findWord: findWord,
        findKeyWords: findKeyWords
    }

    return analizeAPI;

}



function recordAudio() {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    // recognition.lang = 'en-US';
    recognition.lang = 'it';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();
    var message;
    console.log("record");

    recognition.onresult = function (event) {
        message = event.results[0][0].transcript;
        console.log("on result");
        var text = analize(message);
        text.elaborateMessage();
        text.findKeyWords();
    };

    recognition.onspeechend = function () {
        recognition.stop();
        console.log('Speech recognition has stopped.');
    }

    recognition.onerror = function (event) {
        console.log('Speech recognition error detected: ' + event.error);
    }

}

window.onload = function () {
    const button = document.getElementById('start');
    button.addEventListener("click", function () {
        recordAudio();
    });
}
