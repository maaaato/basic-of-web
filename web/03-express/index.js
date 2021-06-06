const express = require('express')
const morgan = require('morgan')
const app = express()
const root = require('./root')

app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use('/', root)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})