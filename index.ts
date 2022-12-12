import * as http from "http";

const server = http.createServer()

server.on('request', (req, res) => {
    res.end("hi fuck!");
})
server.listen(8888)