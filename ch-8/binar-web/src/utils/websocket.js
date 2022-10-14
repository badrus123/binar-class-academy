const WebSocket = require('websocket').w3cwebsocket

function WsClient(wss) {
  this.routes = {}
  this.callback = {}
  this.connected = false
  this.connect = () => {
    this.client = new WebSocket(wss)
    this.client.onopen = () => {
      const payload = {
        type: 'init',
        keypass: 'fullmoon',
      }
      this.connected = true
      console.log('Connected to ' + wss)
      this.client.send(JSON.stringify(payload))
      this.routes['connected'] && this.routes['connected']()
    }
    this.client.onmessage = (msg) => {
      // console.log(msg)
      const payload = JSON.parse(msg.data.toString())
      const route = payload.type || payload.route
      const { data } = payload
      const callback = payload.callback
      // console.log(payload)
      if (route === 'reply') {
        this.callback[callback] && this.callback[callback](data)
      } else if (route !== 'pong' && route !== 'ping') {
        this.routes[route](data)
      }
    }
    this.client.onclose = (e) => {
      this.connected = false
      console.log('Websocket connection closed')
      console.log('Reconnecting in 5 seconds to ' + wss)
      setTimeout(() => {
        this.connect()
      }, 5000)
    }
  }
  this.send = (type, data, callback) => {
    if (!data) data = {}
    const payload = { type, ...data }
    this.callback[type] = callback
    this.client.send(JSON.stringify(payload))
  }
  this.on = (type, handler) => {
    this.routes[type] = handler
  }

  setInterval(() => {
    const payload = {
      type: 'ping',
    }
    // console.log(this.connected)
    if (this.connected) this.client.send(JSON.stringify(payload))
    //setTimeout(ping,59000)
  }, 59000)
}
export default WsClient
