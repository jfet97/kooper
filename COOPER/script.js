
var body = document.getElementsByTagName('body')[0];
body.style.backgroundColor = "gray";


function sfondo(color) //color
{
    console.log("SFONDO");
    console.log(body);
    body.style.backgroundColor = color;
}

function testo()
{
    console.log("TESTO");
}


window.onload = function()
{
    const button = document.getElementById('start');
    button.addEventListener("click" ,function()
    {
        recordAudio();
    });

}

function recordAudio()
{
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    recognition.lang = 'it';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();

    recognition.onresult = function(event) 
    {
        var message = event.results[0][0].transcript;
        console.log('You said: ', message);
        addToText(message);
        checkCommands(elaborateMessage(message));

    };
}


function checkCommands(array)
{
    const commands = 
    {
    "sfondo": sfondo,
    "testo": testo,
    }
    lookUpCommands(array, commands);

}

function elaborateMessage(message)
{
    var arrayText = message.split(" ");
    console.log(arrayText);
    return arrayText;
}

function lookUpCommands(array, commands)
{

    console.log("uno    " +commands[array[0]]);
    console.log("due    " +commands[array]);
    console.log("tre    " +commands[array[1]]);

    //commands[array[0]]; //fai prova ancora
    commands[array[0]](array[1]);
    //commands[array[0]].call(array[1]);
    




    /*for(var i = 0; i<array.lenght; i++)
    {
        if(commands.hasOwnProperty(array[i]))
        {
            commands[array[0]]();
            //commands[array[i]];
        }
    }*/
}






function addToText(message)
{
    var p = document.getElementById('vocalText');
    p.textContent = "HAI INVIATO IL SEGUENTE COMANDO VOCALE: " + message;
}
