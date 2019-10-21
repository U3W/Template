import("../pkg").then(wasm => {
    //wasm.init();
    self.addEventListener('message', function(e) {
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

