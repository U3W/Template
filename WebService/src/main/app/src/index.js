import React from "react";
import ReactDOM from "react-dom";

const worker = new Worker('worker.js');

function sayHI() {
  worker.postMessage({'cmd': 'start', 'msg': 'Hi'});
}

function unknownCmd() {
  worker.postMessage({'cmd': 'foobard', 'msg': '???'});
}

function stop() {
  worker.postMessage({'cmd': 'stop', 'msg': 'Bye'});
}

worker.addEventListener('message', function(e) {
  document.getElementById('result').textContent = e.data;
}, false);

document.getElementById("hi").addEventListener('click', sayHI);
document.getElementById("unknown").addEventListener('click', unknownCmd);
document.getElementById("stop").addEventListener('click', stop);



const App = () => {
  return <div>Hello React,Webpack 4 & Babel 7!</div>;
};

ReactDOM.render(<App />, document.querySelector("#root"));