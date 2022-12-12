import * as http from "http";
import * as fs from "fs";
import * as p from "path"
import * as url from "url";

const server = http.createServer()
const path = p.join(__dirname, "public")

server.on('request', (req, res) => {
    const {url: u} = req
    const {pathname,query} = url.parse(u || '')
    console.log(query);
    switch (pathname) {
        case '/index.html':
            fs.readFile(p.join(path, pathname), (err, data) => {
                if (err) {
                    throw err
                }
                res.end(data.toString())
            })
            break
        case '/main.js':
            res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
            fs.readFile(p.join(path, pathname), (err, data) => {
                if (err) {
                    throw err
                }
                res.end(data.toString())
            })
            break
        case '/style.css':
            res.setHeader('Content-Type', 'text/css; charset=utf-8')
            fs.readFile(p.join(path, pathname), (err, data) => {
                if (err) {
                    throw err
                }
                res.end(data.toString())
            })
            break
        case '/apple.jpg':
            res.setHeader('Content-Type', 'image/jpeg')
            fs.readFile(p.join(path, pathname), (err, data) => {
                if (err) {
                    throw err
                }
                res.end(data)
            })
            break
    }
})
server.listen(8888)