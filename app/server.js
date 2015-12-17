import express from 'express'

var app = express()

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(3000)
