const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()

app.use(morgan("combined"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.get('/', (req, res) => {
    var adImgName = ''
    var thirdParty = req.cookies['third-party-cookie']
    if (thirdParty) {
        adImgName = thirdParty
    } else {
        adImgName = "first"
    }
    console.log('Cookies: ', req.cookies)
    res.cookie(
        'third-party-cookie', 'third',
        {
            path: '/',
            httpOnly: true,
            sameSite: "none",
            secure: true
        }
        );
    res.sendFile(__dirname + `/public/img/ad_${adImgName}.jpg`);
})

app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:8000`)
})