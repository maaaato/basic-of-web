## カスタムヘッダーを送信する

`curl`で実行する場合

```
curl -v -H "X-Test: hello" "https://httpbin.org/headers"
*   Trying 34.199.75.4...
* TCP_NODELAY set
* Connected to httpbin.org (34.199.75.4) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/cert.pem
  CApath: none
* TLSv1.2 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* TLSv1.2 (IN), TLS handshake, Server finished (14):
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS handshake, Finished (20):
* TLSv1.2 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (IN), TLS handshake, Finished (20):
* SSL connection using TLSv1.2 / ECDHE-RSA-AES128-GCM-SHA256
* ALPN, server accepted to use h2
* Server certificate:
*  subject: CN=httpbin.org
*  start date: Dec 21 00:00:00 2020 GMT
*  expire date: Jan 19 23:59:59 2022 GMT
*  subjectAltName: host "httpbin.org" matched cert's "httpbin.org"
*  issuer: C=US; O=Amazon; OU=Server CA 1B; CN=Amazon
*  SSL certificate verify ok.
* Using HTTP2, server supports multi-use
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* Using Stream ID: 1 (easy handle 0x7fb1f8009600)
> GET /headers HTTP/2
> Host: httpbin.org
> User-Agent: curl/7.64.1
> Accept: */*
> X-Test: hello
>
* Connection state changed (MAX_CONCURRENT_STREAMS == 128)!
< HTTP/2 200
< date: Wed, 19 May 2021 14:28:32 GMT
< content-type: application/json
< content-length: 197
< server: gunicorn/19.9.0
< access-control-allow-origin: *
< access-control-allow-credentials: true
<
{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-60a52090-4e89a501241e06714f4eede9",
    "X-Test": "hello"
  }
}
* Connection #0 to host httpbin.org left intact
* Closing connection 0
```

オプションについて

```
-v 詳細をログに出力
-H ヘッダーを付与
```

`wget`で実行する場合

```
wget -S --header='X-Test: Hello' "https://httpbin.org/headers"[main]
--2021-05-19 23:29:48--  https://httpbin.org/headers
Resolving httpbin.org (httpbin.org)... 54.166.163.67, 34.231.30.52, 54.91.118.50, ...
Connecting to httpbin.org (httpbin.org)|54.166.163.67|:443... connected.
HTTP request sent, awaiting response...
  HTTP/1.1 200 OK
  Date: Wed, 19 May 2021 14:29:49 GMT
  Content-Type: application/json
  Content-Length: 248
  Connection: keep-alive
  Server: gunicorn/19.9.0
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Credentials: true
Length: 248 [application/json]
Saving to: ‘headers’

headers                                        100%[==================================================================================================>]     248  --.-KB/s    in 0s

2021-05-19 23:29:49 (8.76 MB/s) - ‘headers’ saved [248/248]
```

ダウンロードしたファイルの内容

```
cat headers
{
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "identity",
    "Host": "httpbin.org",
    "User-Agent": "Wget/1.20.3 (darwin18.7.0)",
    "X-Amzn-Trace-Id": "Root=1-60a520dd-4aa763c013ea47272a308050",
    "X-Test": "Hello"
  }
}
```

オプションについて

```
-S --server-response サーバーの応答を表示
--header=STRING 送信するヘッダーにSTRINGを追加
```

`httpie`の場合

[https://httpie.io/](https://httpie.io/)  
シンタックスハイライトされたり使い勝手が良い

```
http https://httpbin.org/headers X-Test:hello
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 239
Content-Type: application/json
Date: Wed, 19 May 2021 14:27:39 GMT
Server: gunicorn/19.9.0

{
    "headers": {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Host": "httpbin.org",
        "User-Agent": "HTTPie/2.4.0",
        "X-Amzn-Trace-Id": "Root=1-60a5205b-00787d0a5f3226186d427bf0",
        "X-Test": "hello"
    }
}
```

## `json`を送信する

```
curl -X POST -H "Content-Type: application/json" -d '{"name":"hoge"}' https://httpbin.org/post
```

```
{
  "args": {},
  "data": "{\"name\":\"hoge\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "15",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-60a5223b-3c746b6a71c0320a6a97dbee"
  },
  "json": {
    "name": "hoge"
  },
  "origin": "xxx.xxx.xxx.xx",
  "url": "https://httpbin.org/post"
}
```

`httpie`の場合

```
http POST https://httpbin.org/post name=hoge
```

## ネストされた`json`の送信

`curl`の場合

```
curl -X POST -H "Content-Type: application/json" -d '{userA:{"name":"hoge","age":"29"}}' https://httpbin.org/post
{
  "args": {},
  "data": "{userA:{\"name\":\"hoge\",\"age\":\"29\"}}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "34",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-60a5247c-394cf32361ea4d82304d7181"
  },
  "json": null,
  "origin": "xxx.xxx.xxx.xx",
  "url": "https://httpbin.org/post"
}
```

`httpie`の場合

```
http POST https://httpbin.org/post userA:='{"name": "hoge","age": "29"}'
```

## `Content-Type: application/x-www-form-urlencoded`を使ってデータを送信する

`curl`の場合

```
url -X POST -H "Content-Type: application/x-www-form-urlencoded" -d '{userA:{"name":"hoge","age":"29"}}' https://httpbin.org/post
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "{userA:{\"name\":\"hoge\",\"age\":\"29\"}}": ""
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "34",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-60a52501-2e89bd342ad924d469fe2a03"
  },
  "json": null,
  "origin": "xx.xxx.xxx.xx",
  "url": "https://httpbin.org/post"
}
```

`httpie`の場合

```
http -f POST https://httpbin.org/post userA:='{"name": "hoge","age": "29"}'
```
