'use strict'
const http = require('http')
const fs = require('fs')

function loadJson(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  if (req.method === 'POST') {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      const dataJson = {
        message: 'Hello World',
        data: {
          nama: JSON.parse(data).nama,
          umur: JSON.parse(data).umur,
        },
        success: true,
      }
      res.end(JSON.stringify(dataJson))
    })
  } else if (req.method === 'GET') {
    const dataJson = {
      message: 'Hello World',
      data: {
        title: 'Testing',
      },
      success: true,
    }
    res.end(JSON.stringify(dataJson))
  }
}
function loadHtml(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile('./testing.html', (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('Data not found')
    } else {
      res.write(data)
    }
    res.end()
  })
}
http.createServer(loadJson).listen(3000)
