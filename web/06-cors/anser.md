## CORSについて
CORSはクロスオリジンへのリクエストのために、安全なオプトインのメカニズムを提供する仕組み。  
クロスオリジンへXHR、Fetch API（リソース共有）を行う場合、同一生成元ポリシー（Same-Origin Policy）の制約がある。この制約を満たすためにCORSを利用する。  
クライアント側（ブラウザ）は`Origin`ヘッダーをリクエスト時に自動的に付与し、サーバー側（クロスオリジン）は`Origin`ヘッダーを検証し問題なければオプトインし、レスポンスヘッダーに`Access-Control-Allow-Origin`を付与する。  
オプトインしない場合は`Access-Control-Allow-Origin`がレスポンスヘッダーに付与されていないため、ブラウザはリクエストを無効にする（ブラウザのコンソールに`Access-Control-Allow-Origin`に関するエラーメッセージが表示されるはず）  
CORSにはPreflight RequestとSimple Requestの二種類がある。


### preflight request
サーバーがCORSプロトコルを理解していることを特定のメソッドとヘッダーを仕様してチェックする

`OPTIONS`リクエストで、`Access-Control-Request-Method`,`Access-Control-Request-Headres`,`Origin`の3つのHTTPリクエストヘッダーを使用する。


https://developer.mozilla.org/ja/docs/Glossary/Preflight_request

preflight requestはsimple requestと比較して最低1往復のネットワークレイテンシが発生する
ただ、一度確認が取れるとその結果をクライアント側でキャッシュするため、2回目からはpreflight requestは実行されない


### simple request

preflight requestを引き起こさないリクエスト
- メソッド
    - GET
    - HEAD
    - POST
- ヘッダー（CORSセーフリクエストヘッダー）
    - Accept
    - Accept-Language
    - Content-Language
    - Content-Type (但し、下記の要件を満たすもの)
        - application/x-www-form-urlencoded
        - multipart/form-data
        - text/plain
    - DPR
    - Downlink
    - Save-Data
    - Viewport-Width
    - Width
- XMLHttpRequestUpload
    - 
- ReadableStream


### access-control-allow-origin

同一生成元ポリシー
ブラウザは認証トークンやクッキーなどのプライベートなユーザーデータを保持します。これらを他のアプリケーションに漏洩することは許されません。

CORS(Cross-Origin Resource Sharing)




XMLHttpRequest
IE5で独自実装された
MSXMLライブラリの一部としてリリースされた。XMLHTTPという名前の由来