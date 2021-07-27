const express = require('express');
const multipart = require('connect-multiparty');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(multipart());
app.use(express.static(path.join(__dirname, './public_html')));

app.post('/test1', (req, res) => {
    try {
        console.log('/test1');
        console.log(req.headers['content-type']);
        console.log('* body');
        console.log(req.body);
        console.log('* files');
        console.log(req.files);

        if (req.files) {
            let i = 1;
            while (true) {
                let f = req.files[`file${i++}`];
                if (!f) {
                    break;
                }
                console.log(f);
                fs.unlink(f.path, (err) => {
                    if (err) {
                        return;
                    }
                    console.log('*** The file was deleted.');
                });
            }
        }

        const obj = {
            message: 'Hello from server!'
        };

        res.status(200).json(obj);

    } catch (e) {
        console.log('*** catch');
        console.log(e);
        res.status(500).json(e);
    }

});

app.listen(3001, () => console.log('Listeninig on port 3001...'));
