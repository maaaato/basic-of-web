const {Root} = require('../root')

test('status 200', () => {
    const req = {}
    const res = {
        status:jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
    Root(req, res)
    expect(res.json.mock.calls[0][0]["text"]).toBe("hello world")
    expect(res.status.mock.calls[0][0]).toBe(200)
})