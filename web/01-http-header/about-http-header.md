## 課題１（質問）

以下のヘッダーの意味と、役割を説明してください

### Host

リクエスト先のホスト名とポート番号が記載される  
http 1.1 では`Host`ヘッダーは必須になるが、http/2 では代わりに疑似ヘッダーである`:authority`にホスト名とポート番号が値として入る

例:

- http 1.1
  - `Host: itdoc.hitachi.co.jp`
- http/2
  - `:authority: developer.mozilla.org`

### Content-type

リクエストボディのメディアタイプを指定する

MIME
マルチパート
1 つのメッセージボディの中に複数のエンティティを含めて送ることができる。主に画像やテキストファイルなどのファイルアップロードの際に使われている。

レンジリクエスト
大きなサイズの画像やデータをダウンロードする場合にコネクションが切断されたら、最初からやり直していた。
中断した箇所からダウンロードを再開できるレジューム機能がある
これを利用するにはエンティティの範囲を指定してダウンロードを行う必要がある。範囲を指定してダウンロードすることをレンジリクエストと呼ぶ

例:

- `application/json`
- `text/html`
- `multipart/form-data`

### User-agent

クライアントを示す識別子  
例:

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
```

### accept

クライアントが処理できるメディアタイプ

例

```
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
```

q 値=メディアタイプの優先傾向を指定。なにもつけない場合はそれらのメディアタイプは 1.0（最高品質）

### Referer

現在リクエストされているページへのリンク先を持った直前のウェブページのアドレスが含まれる。
Referer ヘッダーにより、サーバーは人々がどこから訪問しに来たかを識別し、分析などに利用することができる。

例

```
referer: https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Accept
```

注意すべき点として、Referer ヘッダーに機密情報を含むウェブページのアドレスが指定された場合にリクエスト先のサーバーに情報が渡ってしまいます。
Referer の情報を省略するために`Referrer Policyヘッダー`がある。
同じようにリクエスト先のウェブページに含まれている`img`や`a`タグに指定されている
`Referrer-Policy: strict-origin-when-cross-origin`

- `no-referrer`
  - Refere へッダー全体が省略される。リクエストとともにリファラー情報が送られることはない。
- `no-referrer-when-downgrade`
  - ポリシーが指定されていない場合や値が無効な場合の規定値。プロトコルのセキュリティ水準が同一である場合(HTTP->HTTP, HTTPS->HTTPS)または改善される場合(HTTP->HTTPS)は URL のオリジン、パス、クエリ文字列がリファラーとして送信される。
    低下する場合(HTTPS->HTTP)は、リファラーは送信されない
- `origin`
- `origin-when-cross-origin`
- `same-origin`
- `strict-origin`
- `strict-origin-when-cross-origin`
- `unsafe-url`

### Accept-Encoding

### Authorization

### Location
