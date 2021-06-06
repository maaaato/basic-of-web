## application/x-www-form-urlencoded のデータ形式について

- HTML の form を利用した場合のデフォルトの Content-Type
- `key1=value1&key2=value2` の形式でデータ構造を表す
- json と比較するとデータ構造をネストできないので複雑なデータには向いていない
- Multipart なデータを送信する場合は`multipart/form-data`を利用する

`express`で`application/x-www-form-urlencoded`の Content-Type のデータを body から参照する場合は、`app.use(express.urlencoded({ extended: true }));`を記述する必要がある。

ref:

- https://developer.mozilla.org/ja/docs/Web/HTTP/Methods/POST

## Express についてのメモ

### res.end([data] [, encoding])

> Ends the response process. This method actually comes from Node core, specifically the response.end() method of http.ServerResponse.
> .Use to quickly end the response without any data. If you need to respond with data, instead use methods such as res.send() and res.json().

`end()`は`res.send()`や`res.json()`しない場合に必要  
例えば`res.status(200)`など

### Test Failed

Content-Type の判定をする処理で`req.is('json')`とした場合のテストの書き方がわかってない  
今回は`Get`のテストケースだけ追加

req の mock の作り方が理解できてない

以下、発生したエラー内容

```
  TypeError: req.is is not a function

      1 | exports.User = (req, res) => {
    > 2 |     if (!req.is('json')) {
        |              ^
      3 |        return res.status(400).end()
      4 |     }
      5 |     res.status(201).send(req.body)
```
