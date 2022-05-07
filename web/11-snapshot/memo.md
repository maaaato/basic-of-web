## スナップショットテストとは？
あるプログラムの出力を以前の出力と比較し、両者に差分があるかをテストする手法のこと。  
予め以前のバージョンのプログラムの出力 (スナップショット) のどこかに保存しておき、新しいバージョンのプログラムの出力と比較し、差分があったら`fail`させる。これにより、プログラムの出力内容が予期せぬうちに変わってしまっていた場合に気づくことができる。

例)

```
// Jestのドキュメントから引用
// from: https://deltice.github.io/jest/docs/ja/snapshot-testing.html
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

rendererの結果をシリアライズしてスナップショットとして保存、比較するようにJestに指示している。  
テストを実行したあとは以下のようにスナップショットファイルが作成される。

```
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

2回目以降テストを実行する際は、このスナップショットファイルとの差分が計算される。もし<Link>コンポーネントの実装にミスがあり、予期せぬうちにrender結果が変わってしまった場合はスナップショットに差分が発生し、テストが fail するようになる。


## スナップショットテストを用いることで、どのようなメリットがあるか

1. DOMのプロパティ（テキスト、クラス名など）など差分がわかりやすいものをテストするのに向いている
2. レガシーコードでテストがない場合にログをスナップショットとして取ることで変化に気付けるようにする（GoldenMaster）
3. テストコードを書く必要がない
4. スナップショットを見ることで正しい状態がわかる（ただし差分が少ない人の目でわかるレベル）

## スナップショットテストには向いてないこと

1. 動的に変化する値（タイムスタンプなど、ランダムな値を含むもの）
2. 差分が多すぎる場合は人の目でわからないのでスナップショットを見るだけで正しい結果がわからない


## Storyshotを使う

https://storybook.js.org/docs/react/writing-tests/snapshot-testing

このページにある手順に従ってstoryshotsのアドオンを追加する。

`storybook.test.js`を`src`ディレクトリに追加し、`npm test ./src/storybook.test.js`を実行することでテストを実行することが出来る。

実行後、`__snapshots__`ディレクトリ以下に`storybook.test.js.snap`が作成されるが内容はstorybookのstoryで利用しているコンポーネントのレンダリング結果がシリアライズされている。

Gameのテキストを` 次のプレイヤー: X`を変更したあとにテストを実行すると以下のように検知が出来る。

```
        <div
          className="game-info"
        >
          <div>
    -       Next player: X
    +       次のプレイヤー: X
          </div>
          <ol>
            <li>
              <button
                onClick={[Function]}
```

変更が正しい場合はsnapshotの結果を更新する。その後、再度テストを実行してパスすることを確認する。

## snapshotテストに関するクイズ

snapshotテストはテストがないレガシーなコードをテストするときの足がかりにすることができます。  
このような手法をなんというでしょうか？




### FYI
- [スナップショットテストの向き不向きについて考えてみる](https://www.mizdra.net/entry/2021/02/04/003728)
- [CDK for Terraform 0.6 Adds Unit Testing](https://www.hashicorp.com/blog/cdk-for-terraform-0-6-adds-unit-testing)
- [Surviving Legacy Code with Golden Master and Sampling - The Code Whisperer](https://blog.thecodewhisperer.com/permalink/surviving-legacy-code-with-golden-master-and-sampling)
- [What is the "Golden Master" Technique? | stevenschwenke.de](https://stevenschwenke.de/whatIsTheGoldenMasterTechnique)