import { Readable } from 'node:stream'
import fetch from 'node-fetch'

class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  // adiciona a opção duplex
  headers: { 'Content-Type': 'application/octet-stream' },
  compress: false,
  signal: null,
  follow: 20,
  size: 0,
  timeout: 0,
  agent: null,
  highWaterMark: 16384,
  allowForbiddenHeaders: false,
  methodId: -1,
  bodyTimeout: 0,
  keepAliveTimeout: 0,
  bodySize: 0,
  maxHeaderSize: 16384,
  opaque: null,
  window: null,
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})