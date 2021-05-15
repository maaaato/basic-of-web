## 課題１（質問）

以下のヘッダーの意味と、役割を説明してください

### Host

リクエストヘッダーのひとつ。  
リクエスト先のホスト名とポート番号が記載される。  
`HTTP 1.1` では`Host`ヘッダーは必須になるが、`HTTP/2`では代わりに疑似ヘッダーである`:authority`にホスト名とポート番号が値として入る。

例:

- HTTP 1.1
  - `Host: itdoc.hitachi.co.jp`
- HTTP/2
  - `:authority: developer.mozilla.org`

サーバーで VirtualHost を利用する場合にサーバーは`Host`ヘッダーの値を判断してリクエストを振り分ける。

例えば Nginx で VirtualHost を実現するために以下のような設定を Conf に記述する。  
`server_name`の値と`Host`ヘッダーの値がマッチした場合はマッチしたディレクティブが実行される。

```
server {
    listen       80;
    server_name  hoge.com;

    access_log  /var/log/nginx/log/hoge.access.log  main;

    location / {
        root   /usr/share/nginx/html/hoge;
        index  index.html index.htm;
    }
}

server {
    listen       80;
    server_name  fuga.com;

    access_log  /var/log/nginx/log/fuga.access.log  main;

    location / {
        root   /usr/share/nginx/html/fuga;
        index  index.html index.htm;
    }
}
```

### Content-type

リクエスト、レスポンスで利用するヘッダーのひとつ。  
コンテンツのメディアタイプを示す。

メディアのタイプは [MIME(Multipurpose Internet Mail Extensions) Type](https://developer.mozilla.org/ja/docs/Glossary/MIME_type) になる。
MIME はメールでテキストや画像を送るために使っている拡張仕様。  
HTTP もマルチパートに対応しており、1 つのメッセージボディの中に複数のエンティティを含めて送ることができる。主に画像やテキストファイルなどのファイルアップロードの際に使われている。  
マルチパートのそれぞれのエンティティの区切りとして`boundary`文字列を使う。

Boundary の例

```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryxxxxyz

----WebKitFormBoundaryxxxxyz
Content-Disposition: form-data; name="Filedata"; filename="/C:/Users/xxxxx/Desktop/sample.png"
Content-Type: image/png

(data)
----WebKitFormBoundaryxxxxyz
```

MIME Type の例:

- `application/json`
- `text/html`
- `text/plain`
- `multipart/form-data`
  - HTML フォームを送信した場合
- `application/x-www-form-urlencoded`
  - HTML フォームを送信した場合。ただしバイナリデータを扱うには向いてない。

ブラウザによっては MIME を推定し、ヘッダーの値に従わない場合もある（`Content sniffing`）。その場合は`X-Content-Type-Options: nosniff`に設定するとその振る舞いを防ぐことができる。

参照  
[https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Type](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent)

### User-agent

クライアントを示す識別子

例:

書式  
`User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>`

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
```

Chrome は互換性のため、`KHTML, like Gecko` や `Safari` のような文字列が追加されている。

サーバー側では`User-Agent`を判定し、処理の振る舞いを変えるなどに利用する。またブラウザ以外にも`User-Agent`の種類があり、ブラウザからアクセスされているのか判断することができる。

- `user_agent: Wget/1.20.3 (darwin18.7.0)`
- `user_agent: curl/7.64.1`

参照
[https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent)

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
    低下する場合(HTTPS->HTTP)は、リファラーは送信されない。
- `origin`
- `origin-when-cross-origin`
- `same-origin`
- `strict-origin`
- `strict-origin-when-cross-origin`
- `unsafe-url`

### Accept-Encoding

### Authorization

### Location
