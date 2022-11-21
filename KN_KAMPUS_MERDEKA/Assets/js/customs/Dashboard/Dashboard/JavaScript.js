var has_had_focus = false;
var wsbroker = "localhost";  //mqtt websocket enabled broker
var wsport = 15675; // port for above

var client = new Paho.MQTT.Client(wsbroker, wsport, "/ws",
    "bean_scan_web_client");
client.topic = "bean_scan"
client.onConnectionLost = function (responseObject) {
    debug("CONNECTION LOST - " + responseObject.errorMessage);
};

client.onMessageArrived = function (message) {
    debug("RECEIVE ON " + message.destinationName + " PAYLOAD " + message.payloadString);
    var data = JSON.parse(message.payloadString);
    $("#tbody").append(`<tr><td>${data.Code}</td></tr>`)
};

var options = {
    timeout: 3,
    userName: 'IBC:admin',
    password: 'admin123',
    keepAliveInterval: 30,
    onSuccess: function () {
        debug("CONNECTION SUCCESS");
        client.subscribe("bean_scan", { qos: 1 });
    },
    onFailure: function (message) {
        debug("CONNECTION FAILURE - " + message.errorMessage);
    }
};

if (location.protocol == "https:") {
    options.useSSL = true;
}
function debug(log) {
    console.log(log);
}
debug("CONNECT TO " + wsbroker + ":" + wsport);
client.connect(options);