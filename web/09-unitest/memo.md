## 課題3
カバレッジ100%にならなかった理由としてテストに含まれている関数が特定の確率で例外を発生させる仕様となっており、例外を許容するテストとなっておらず、場合によっては例外でテストがコケる不安定な状態でした。

関数内で外部オブジェクトを利用する場合、関数の処理が外部オブジェクトに依存していると外部オブジェクトがなんらかの要因で状態が変化する場合にその関数の期待値が不安定になる。
関数を外部オブジェクトに依存しないように疎結合にするためには、関数の引数として外部オブジェクトを渡すようにする。外部オブジェクト（依存）を引数で渡す（注入）ので依存性の注入という。

## 外部接続を含んだテストのデメリット/注意点について
- 接続が安定しないと想定している結果が得られずにテストが不安定になる（Flaky Testに分類される）
- 外部接続先（DBなど）の準備が必要となり、テストを実行するまでの準備事が多くなるため、テスト環境の下準備が重要になる