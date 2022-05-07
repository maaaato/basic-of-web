## ビジュアルリグレッションテストとスナップショットテスト

>スナップショットテストとビジュアルテストの違いは何ですか？
>ビジュアルテストはストーリーの画像をキャプチャし、それらを画像のベースラインと比較します。スナップショットテストはDOMスナップショットを取得し、それらを>DOMベースラインと比較します。外観を確認するには、視覚的なテストの方が適しています。スナップショットテストは、スモークテストとDOMが変更されないことを確>認するのに役立ちます。

https://storybook.js.org/docs/react/writing-tests/snapshot-testing

ビジュアルリグレッションテストは外観のスクリーンショットを取得することもあり、ページ内の要素が正しく表示されるまで待機（iframeやJSで動的に生成される要素などを含む場合）する必要があり、調整が大変そうに思えた。  
また画像ファイルを生成するため、画像の保管先をS3にするなど設定が必要になる。

## ビジュアルリグレッションテストのクイズ

取得するスクリーンショットのファイル名を変更する場合に指定するAPI名はなんでしょうか？


## FYI

- [Visual Regression Testing はじめました - 具体的な運用 Tips](https://blog.recruit.co.jp/rmp/front-end/visual-regression-testing/)
- [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)