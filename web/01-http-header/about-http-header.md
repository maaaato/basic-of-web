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

書式  
`User-Agent: Mozilla/5.0 (<system-information>) <platform> (<platform-details>) <extensions>`

例:

```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36
```

Chrome は互換性のため、`KHTML, like Gecko` や `Safari` のような文字列が追加されている。

サーバー側では`User-Agent`を判定し、処理の振る舞いを変えるなどに利用する。またブラウザ以外にも`User-Agent`の種類があり、ブラウザからアクセスされているのか判断することができる。  
その他、GoogleAnalytics などを利用し、どのブラウザからのアクセスが多いか判断し、分析に利用することがある。

ブラウザ以外でもコンテンツにリクエストを送信するコマンドを利用した場合はそのコマンドが`User-Agent`に記載される。これをウェブサーバーのログから見てなにかしらの攻撃をされているかの材料にすることもある。

- `user_agent: Wget/1.20.3 (darwin18.7.0)`
- `user_agent: curl/7.64.1`

参照
[https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent)

### accept

クライアントが処理できるメディアタイプ  
例えばブラウザが`image/png`に対応していない場合、処理可能な`image/jpeg`や`image/gif`を指定する。  
サーバーは提案のうち一つを選択し、それを利用してクライアントに`Content-Type`レスポンスヘッダーで選択を伝える。

例

```
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8
```

表示するメディアタイプをに優先度をつけたい場合に q 値（品質係数）を指定。0~1 の範囲（小数点 3 桁まで）の数値で１の方が高くなる。  
なにもつけない場合はそれらのメディアタイプは 1.0（最高品質）を表す。

### Referer

現在リクエストされているページへのリンク先を持った直前のウェブページのアドレスが含まれる。
Referer ヘッダーにより、サーバーはどこから訪問しに来たかを識別し、分析などに利用することができる。

例

```
referer: https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Accept
```

注意すべき点として、Referer ヘッダーに機密情報を含むウェブページのアドレスが指定された場合にリクエスト先のサーバーに情報が渡ってしまう。例えばアカウント情報のパスワードリセットリンクなどで用いられるユーザー固有の URL が Referer として渡ってしまった場合、リセットリンクが外部に漏れてしまうことにつながる。（リセットリンクに有効期限があったり、パスワードリセットの場合は既存のパスワードを求められるので不正利用がしにくい）  
加えて、Referer の情報を省略するために`Referrer Policyヘッダー`がある。
同じようにリクエスト先のウェブページに含まれている`img`や`a`タグに指定されている
`Referrer-Policy: strict-origin-when-cross-origin`

- `no-referrer`
  - Refere へッダー全体が省略される。リクエストとともにリファラー情報が送られることはない。
- `no-referrer-when-downgrade`
  - ポリシーが指定されていない場合や値が無効な場合の規定値。プロトコルのセキュリティ水準が同一である場合(HTTP->HTTP, HTTPS->HTTPS)または改善される場合(HTTP->HTTPS)は URL のオリジン、パス、クエリ文字列がリファラーとして送信される。
    低下する場合(HTTPS->HTTP)は、リファラーは送信されない。
- `origin`
  - https://example.com/page.html にある文書からは、 https://example.com/ というリファラーが送信される。
- `origin-when-cross-origin`
  - 同一オリジン間でリクエストを行う場合はオリジン、パス、クエリ文字列を送信するが、その他は文書のオリジンのみを送信する。
- `same-origin`
  - 同一オリジンにはリファラーが送信されるが、別オリジンには送信されない。
- `strict-origin`
  - プロトコルのセキュリティ水準が同じである場合(HTTPS->HTTPS)にのみ、文書のオリジンをリファラーとして送信するが、HTTPS->HTTP には送信しない。
- `strict-origin-when-cross-origin`
  - 同じオリジン間でリクエスト送信を行う場合はオリジン、パス、クエリ文字列を送信し、別オリジンにはプロトコルのセキュリティ水準が同じ場合はオリジンを送信し、安全性の劣る送信先にはヘッダーを送信しない。
- `unsafe-url`
  - セキュリティに関係なくオリジン、パス、クエリ文字列を送信する。安全ではないオリジンへプライベートである可能性がある除法を漏洩する可能性があるので利用する場合はよく検討する。

### Accept-Encoding

コンテンツのエンコーディングを示すリクエストヘッダー  
サーバーは選択したエンコーディング方式を`Content-Encoding`レスポンスヘッダーを使用してクライアントに返す。

例:

```
Accept-Encoding: gzip
Accept-Encoding: compress
Accept-Encoding: deflate
Accept-Encoding: br
Accept-Encoding: identity
Accept-Encoding: *
```

ディレクティブ

```
gzip
アルゴリズム：LZ77、ハフマン符号
フォーマット：Gnu zip

deflate
アルゴリズム：LZ77、ハフマン符号
フォーマット：zlib

bzip2
特徴：deflateやgzipよりも圧縮率が高いが非標準
アルゴリズム：Burrows-Wheeler transform (BWT)
フォーマット：bzip2

brotli(br)
特徴：Googleが開発したアルゴリズム。deflateやgzipよりも高い圧縮率
アルゴリズム：LZ77、ハフマン符号、2nd order context modeling
フォーマット:brotli

identity
圧縮しない

*
ヘッダーがないデフォルト値。あらゆるエンコーディングフォーマットを指す。すべてのエンコードディングフォーマットに対応しているという意味ではない。
```

Nginx では`gzip:on;`ディレクティブを設定することでレスポンスボディを gzip 圧縮してレスポンスを返す。

参照  
[CDN で WEB 高速化 コンテンツ圧縮（gzip）の設定と注意点](https://blog.redbox.ne.jp/cdn-gzip-compress.html)

### Authorization

ユーザーエージェントの認証情報を伝えるために使用するリクエストヘッダー  
サーバーからステータスコード`401`を受け取った後のリクエストに`Authorization`ヘッダーフィールドを含める。  
Basic 認証を設定されている場合は、ブラウザは`401`ステータスコードを受け取った後に認証ダイアログを表示し、ID と Password の入力を求める。入力された場合は base64 エンコーディングをした上で`Authorization: Bacix xxxxxxxxxxxxxxx`といった形式でリクエストを送信する。

Nginx では以下のような設定で Basic 認証を行う。

```
    location /basic {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        auth_basic "Admin area";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
```

`auth_basic`ディレクティブは任意の文字列を含むことができ、ブラウザによっては Basic 認証のダイアログのメッセージとして表示される。

### Location

`Location`ヘッダーフィールドはレスポンスの受信者に対して`Request-URI`以外のリソースへアクセスを誘導をする場合に使用するレスポンスヘッダー
ステータスコードは`3xx`が使用される。  
リクエスト先のコンテンツが移動した場合など別サイトにリダイレクトさせたい場合に使用する。

## referer について

> Q. a タグに target="\_blank"を設定したところ、先輩エンジニアから「ちゃんと rel=noreferrer を設定した？」と聞かれました。なぜそのような設定が必要なのでしょうか？

`_blank`には以下の問題が含まれている

- `_blank`で開いたリンク先で`window.opener.location = "evil url"`を実行された場合、リンク元がリダイレクトされてしまう。
- `_blank`で開いたリンクはリンク元と同じプロセスで動作するため、リンク先で重い JS の処理などを実行された場合、リンク元のパフォーマンスが劣化してしまう。

`noreferrer`を設定することで上記の問題の対策が可能。`noreferrer`以外に`noopener`属性も同様な対策が行えるが、古いブラウザでは`noopner`が対応していないため、`noreferrer`を使う。

> Q. rel=noreferrer を設定しなかった場合に起きうる問題を調べて、説明して下さい

先述の問題に加えて、以下の問題が起こりうる。

- リンク元の URL にセンシティブな情報が含まれている場合、リンク先にリファラーとしてセンシティブな情報も含んだ状態で送信してしまう

対策として`noreferrer`を設定するか、rel 属性として`referrerpolicy: origin`にするなど送信する情報を限定的にするなどがある。

> Q. 先輩エンジニアに「同じオリジンの時は referer の情報を全部送って、別オリジンの時は、オリジン情報だけを referer として送信するように、HTTP レスポンスヘッダを追加しておいてもらえる？」と頼まれました。HTTP レスポンスヘッダーには、どんな値を追加する必要があるでしょうか？

`referrer-policy: origin-when-cross-origin`

> 同一オリジン間でリクエストを行う場合はオリジン、パス、クエリ文字列を送信しますが、その他の場合は文書のオリジンのみを送信します。

参照  
[Referrer-Policy](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referrer-Policy)
