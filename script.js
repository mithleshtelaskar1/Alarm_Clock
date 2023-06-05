var time, alarm, currentH,currentM,
    activeAlarm= false,
    sound= new Audio("http://freesound.org/data/previews/316/316847_4939433-lq.mp3");
//loop alarm
sound.loop = true
// define the function to display the current time
function DisplayTime() {
    var now = new Date();
    time = now.toLocaleTimeString();
    clock.textContent = time;

     // watch for alarm
    if (time === alarm){
        sound.play();
       // show snoone button
        snooze.className = "";

    }
    setTimeout(DisplayTime, 1000);
}

DisplayTime();

//add optin values related towerd time
function AddMinSecVal(id) {
    var select = id;
    var min = 59

    for(i = 0; i < min; i++){
        // define as new option(taxt,value)
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i , i < 10 ? "0" + i : i);
        
    }
}

function AddHour(id){
    var select = id;
    var hour = 12;

    for ( i = 1; i <= hour; i++){
        select.options[select.options.length] =new Option(i < 10 ? "0" + i : i, i);
    }
}

AddMinSecVal(minutes);
AddMinSecVal(seconds);
AddHour(hours)

// set and clear alarm
startstop.onclick = function(){
    //set the alarm
    if (activeAlarm === false){
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
        ampm.disabled = true;

        alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
        this.textCount = " Clear Alarm";
        activeAlarm = true
    }
    else{
        // clear the alarm
        hours.disabled=false
        hours.disabled = false;
        minutes.disabled = false;
        seconds.disabled = false;
        ampm.disabled = false;

        sound.pause();
        alarm= "00:00:00 AM";
        this.textCount = "Set Alarm";

        snooze.className = "hide";
        activeAlarm = false
    }
};

//snooze for 5 minutes
snooze.onclick = function(){
    if (activeAlarm === true){
        //grab the current hour and minute
        currentH = time.substr(0, time.length - 9);
        currentM = time.substr(currentH.length + 1, time.length -8);

        if (currentM>="55"){
            minutes.value = "00";
            hours.value = parseInt(currentH) + 1;

        }
        else{
            if(parseInt(currentM) + 5 <= 9){
                minutes.value = "0" + parseInt(currentM + 5);
            }
            else{
                minutes.value = parseInt(currentM) + 5;
            }
        }
        // hide snooze button
        snooze.className = "hide";

        // now reset alarm
        startstop.click();
        startstop.click();
    }
    else{
        return false;
    }
}