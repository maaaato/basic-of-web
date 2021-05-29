const express = require('express')
const morgan = require('morgan')
const app = express()
const router = express.Router()
const { Root } = require('./root')
const { User } = require('./user')

app.use(morgan("combined"))
app.use(express.json())

router.get('/', Root)
router.post('/user', User)
app.use('/', router)
app.use('/user', router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})