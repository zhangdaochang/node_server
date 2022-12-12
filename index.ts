import * as http from "http";
import * as fs from "fs";
import * as p from "path"
import * as url from "url";

const server = http.createServer()
const path = p.join(__dirname, "public")

function matchFile(fileName : string) {
    return new Promise((resolve, reject) => {
        fs.readFile(p.join(path, fileName), (err, data) => {
            if (err) {
                return reject("找不到啊铁子")
            }
            return resolve(data)
        })
    })
}

server.on('request', async (req, res) => {
    const {url: u} = req
    if(!u)return
    const {pathname, query} = url.parse(u)
    const Cotype:any = {
        "js": "text/javascript; charset=utf-8",
        "css": "text/css; charset=utf-8",
        "jpg": "image/jpeg",
        "html": "text/html; charset=utf-8"
    }
    if (!pathname) return;
    let contentType =Cotype[pathname.split('.' )[1]]
    if(contentType){
        res.setHeader('Content-Type', contentType)
    }

    res.end(await matchFile(pathname).catch(async (err)=>{
        res.statusCode = 404
        res.end(await matchFile("NotFound.html"))
    }))
})
server.listen(8888)