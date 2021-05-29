exports.User = (req, res) => {
    if (!req.is('json')) {
       return res.status(400).end()
    }
    res.status(201).send(req.body)
}