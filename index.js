const WebSocket = require("ws");

const PORT = process.env.PORT || 8081;
const wss = new WebSocket.Server({ port: PORT });

console.log("Relay running on port", PORT);

wss.on("connection", function (ws) {
  ws.on("message", function (msg) {
    wss.clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});
