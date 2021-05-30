exports.Root = (req, res) => {
    if (req.method == "POST"){
        if (!req.is('json')) {
            res.status(400).end()
        }else{
            res.status(201).send(req.body)
        }
    }else{
        // Exclude POST
        res.status(200).json({
            text: "hello world"
        })
    }
}