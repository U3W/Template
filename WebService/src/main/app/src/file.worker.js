import("../pkg").then(wasm => {
    //wasm.init();
    self.addEventListener('message', function(e) {
        var data = e.data;
        const controller = new wasm.Backend();
        switch (data.cmd) {
            case 'start':
                self.postMessage('WORKER STARTED: ' + data.msg + ", " + controller.start());
                break;
            case 'stop':
                self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
                self.close(); // Terminates the worker.
                break;
            default:
                self.postMessage('Unknown command: ' + data.msg);
        }
    }, false);
});





/**
const workercode = () => {

    import("wasm-easypass").then(wasm => {
        //wasm.init();
        var self = this;
        self.addEventListener('message', e => {
            var data = e.data;
            const controller = new wasm.Worker();
            switch (data.cmd) {
                case 'start':
                    self.postMessage('WORKER STARTED: ' + data.msg + ", " + controller.start());
                    break;
                case 'stop':
                    self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
                    self.close(); // Terminates the worker.
                    break;
                default:
                    self.postMessage('Unknown command: ' + data.msg);
            }
        }, false);
    });

};

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;*/