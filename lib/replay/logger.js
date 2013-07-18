// Generated by CoffeeScript 1.6.2
var URL, logger;

URL = require("url");

logger = function(settings) {
  return function(request, callback) {
    var replay;

    replay = request.replay;
    logger = replay.logger;
    logger.log("Replay: Requesting " + request.method + " " + (URL.format(request.url)));
    request.on("response", function(response) {
      return logger.log("Replay: Received " + response.statusCode + " " + (URL.format(request.url)));
    });
    request.on("error", function(error) {
      if (!replay.isIgnored(request.url.hostname)) {
        return replay.emit("error", error);
      }
    });
    callback();
  };
};

module.exports = logger;