var interval;

self.onmessage = function (message) {
  if (message.data && message.data.duration) {
    if (message.data.action == "play") {
      interval = setInterval(() => {
        if (message.data.remainingSeconds > 0) message.data.remainingSeconds--;

        self.postMessage({
          remainingSeconds: message.data.remainingSeconds,
        });
      }, 1000);
    } else if (message.data.action == "pause") {
      clearInterval(interval);
    }
  }
};
