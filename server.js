const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

var options = {
  etag: false,
  setHeaders: function (res, path, stat) {
    setLongTermCache(res)
  }
}

app.use(express.static('public', options))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


function setLongTermCache(res) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  res.setHeader("Expires", date.toUTCString());
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
}