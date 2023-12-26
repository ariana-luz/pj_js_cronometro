//declaro los elementos que voy a utilizar: stopwatch es el display, boton de play que se va a modificar segun sea play o pause, y la esfera que va a ir moviendose o pausada

const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondSphere = document.getElementById('seconds-sphere');

//las variables a utilizar para controlar el cronometro:
let stopwatchInterval; //aca vamos a ir guardando el intervalo para ir modificando el segundero
let runningTime = 0; //lleva la cuenta del tiempo

const playPause = () => {//pregunta si esta pausado o no, si tiene la clase classList 'running' esta corriendo, pero el ! indica que no está corriendo, por lo tanto está pausado
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        playPauseButton.classList.add('running'); //si está pausado le agregamos la clase para que "arranque"
        start();
    } else {//si no está pausado
        playPauseButton.classList.remove('running');
        pause();
    }
}

const pause = () => {
    secondSphere.style.animationPlayState = 'paused'; //cambia el estado de la animacion a pausada
    clearInterval(stopwatchInterval); //borra el intervalo. Va a dejar el tiempo en el momento que lo hayamos frenado
}

const stop = () => {
    secondSphere.style.transform = 'rotate(-90deg) translateX(130px)';//vuelve la esfera al inicio arriba de todo
    secondSphere.style.animation = 'none';//saca la animación
    playPauseButton.classList.remove('running');//le borra el 'running' para que se vuelva a poner el boton de Play y no el de Pause
    runningTime = 0; //el running time vuelve a 0
    clearInterval(stopwatchInterval); //frena el intervalo
    stopwatch.textContent = '00:00'; //el texto del segundero vuelve a decir 00
}

const start = () => {
    secondSphere.style.animation = 'rotacion  60s linear infinite'; //empieza la animación que le agregamos con el style
    let startTime = Date.now() - runningTime; //setea un tiempo de inicio date.now. La primera vez son los milisegundos del momento menos 0 que es el running time en ese momento
    secondSphere.style.animationPlayState = 'running'; //sobrescribe el 'paused' del atributo animationPlayState
    stopwatchInterval = setInterval( ()=>{ //el intervalo se actualiza cada 1 segundo o 1000 milisegundos y se guarda en la variable stopwatchInterval
        runningTime = Date.now() -startTime;//calcula cuanto tiempo pasó, los milisegundos del momento menos el starttime
        stopwatch.textContent = calculateTime(runningTime); //cambia el contenido del texto con lo que devuelve calculateTime()
    }, 1000)
}

const calculateTime = runningTime => {//recibe el parametro de runningTime y con Math.floor obtiene el total sin decimales
    const total_seconds = Math.floor(runningTime / 1000); //1000 para los segundos
    const total_minutes = Math.floor(total_seconds / 60); // 60 para los minutos

    const display_seconds = (total_seconds % 60).toString().padStart(2, '0');//total de segundos hasta 59 para volver a 0 y lo convierte en string. padStart con 2 y 0 para que cuando llegue a 1 tenga un 0 adelante, asi no se van moviendo para atras y para adelante
    const display_minutes = total_minutes.toString().padStart(2,'0');//los minutos llegan hasta la cantidad que requiera

    return `${display_minutes}:${display_seconds}` //devuelve los minutos : los segundos

}