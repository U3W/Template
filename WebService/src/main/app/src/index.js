import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import Worker from './file.worker'

function sayHI() {
    worker.postMessage({'cmd': 'start', 'msg': 'Hi'});
}

function unknownCmd() {
    worker.postMessage({'cmd': 'foobard', 'msg': '???'});
}

function stop() {
    // Calling worker.terminate() from this script would also stop the worker.
    worker.postMessage({'cmd': 'stop', 'msg': 'Bye'});
}

// var worker = new Worker(worker_script);

const worker = new Worker("worker.js");

worker.addEventListener('message', function(e) {
    document.getElementById('result').textContent = e.data;
}, false);

document.getElementById("hi").addEventListener('click', sayHI);
document.getElementById("unknown").addEventListener('click', unknownCmd);
document.getElementById("stop").addEventListener('click', stop);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
