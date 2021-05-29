exports.Root = (req, res) => {
    res.json({
        text: "hello world"
    })
    res.status(200)
}