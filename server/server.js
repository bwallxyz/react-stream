const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs')

const ytdl = require('ytdl-core')
const yt = require('youtube-search-without-api-key') //REQUIRES VERSION 1.0.7 - LATEST VERSION BROKEN 
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

let currentVideo = 'Rick Astley - Never Gonna Give You Up (Official Music Video).mp4'


function readDirectory(directoryPath) {

    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
          if (err) {
            reject(err);
          }
    
          const fileArray = files.map(file => {
            return {
              name: file,
              path: `${directoryPath}/${file}`
            };
          });
    
          resolve(fileArray);
        });
      });

}




async function ytDownload2(link, filename) {

    isValidLink = ytdl.getURLVideoID(link)
    console.log(isValidLink)
    console.log(link)

    let video = ytdl(link, {filter: 'audioandvideo'})

    var size = 0
    video.on('info', function (info) {
     'use strict'
     size = info.size
   
     console.log('Got video info')
     video.pipe(fs.createWriteStream(`./media/${filename}.mp4`))
     console.log('piping')
    })
   
    var pos = 0

    video.on('data', function data (chunk) {
        'use strict'
        pos += chunk.length
   
        // `size` should not be 0 here.
        if (size) {
            var percent = ((pos / size) * 100).toFixed(2)
            process.stdout.cursorTo(0)
            process.stdout.clearLine(1)
            process.stdout.write(percent + '%')
        }
   })

    video.pipe(fs.createWriteStream(`./media/${filename}.mp4`))

    video.on('end', function end () {
        'use strict'
        console.log('\nDone')
      })
}

async function Search(req) {
    const videos = await yt.search(req);
    console.log('Videos:');
    console.log(videos[0]);
    ytDownload2(videos[0].url, videos[0].title)
    return(videos)
}


app.listen(PORT, () => {
    console.log(`Sever listening on ${PORT}`)
})

app.get('/', async (req, res) => {
    const directoryPath = './media';
    const directory = await readDirectory(directoryPath)
    console.log(directory)
    res.send(directory)
})

app.get('/video', (req, res) => {
    res.sendFile(`${currentVideo}`, { root: __dirname })
})

app.post('/search', (req, res) => {

    const inputText = req.body.input;

    console.log(inputText)

    const response = Search(inputText)

})

app.post('/setvideo', (req, res) => {
    console.log(req.body)
    currentVideo = req.body.path
    console.log(`Current video: ${currentVideo}`)
    res.send('Set video')
})