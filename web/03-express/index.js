const express = require('express')
const morgan = require('morgan')
const app = express()
const router = express.Router()
const {Root} = require('./root')

app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

router.get('/', Root)
router.post('/', Root)

app.use('/', router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})