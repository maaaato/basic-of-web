const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable("x-powered-by");

app.get('/', (req, res) => {
    res.cookie(
        'first-party-cookie', 'first',
        {
            path: '/',
            httpOnly: true
        }
        )
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost`)
})