## 96年に3回以上注文した（Ordersが3つ以上紐づいている）Customerのidと、注文回数

```
SELECT o.CustomerID, count(o.CustomerID) as OrderCount, o.OrderDate FROM [Orders] as o
where o.OrderDate
between "1996-01-01" and "1996-12-31"
group by o.CustomerID
HAVING OrderCount >= 3
Order by OrderCount desc
```

|CustomerID|OrderCount|	OrderDate|
|---|---|---|
|65	|6	|1996-07-22|
|63	|6	|1996-08-05|
|20	|6	|1996-07-17|
|75	|5	|1996-08-01|
|46	|5	|1996-08-16|
|37	|5	|1996-09-05|
|87	|4	|1996-07-26|
|86	|4	|1996-09-09|
|80	|4	|1996-08-08|
|25	|4	|1996-07-29|
|72	|3	|1996-11-21|
|71	|3	|1996-10-08|
|69	|3	|1996-08-14|
|61	|3	|1996-07-19|
|55	|3	|1996-07-19|
|51	|3	|1996-10-17|
|44	|3	|1996-08-13|
|41	|3	|1996-11-11|
|38	|3	|1996-09-26|
|24	|3	|1996-07-24|
|9	3|	1|996-10-16|
|7	3|	1|996-07-25|
|5	3|	1|996-08-12|


## 過去、最も多くのOrderDetailが紐づいたOrderを取得してください。何個OrderDetailが紐づいていたでしょうか？

```
SELECT o.OrderID, count(o.OrderID) as OrderCount FROM [Orders] as o 
join [OrderDetails] as od 
on o.OrderID = od.OrderID 
group by o.OrderID 
Order by count(o.OrderID) desc
```

|OrderID|OrderCount|
|---|---|
|10406|5|
|10393|5|
|10382|5|
|10360|5|
|10337|5|
|10325|5|
|10324|5|
|10309|5|
|10294|5|
|10273|5|


## Order数が多い順番にShipperのidを並べてください。Order数も表示してください

```
SELECT o.ShipperID, count(*) as ShippingCount FROM [Orders] as o
group by o.ShipperID
order by ShippingCount desc
```

|ShipperID|	ShippingCount|
|---|---|
|2|	74|
|3|	68|
|1|	54|


## 売上が高い順番にCountryを並べてください。売上も表示してください

```
select ROUND(sum(sales)) as total, x.Country from (
SELECT od.Quantity * p.Price as sales, c.Country FROM [OrderDetails] as od 
join Orders as o on od.OrderID = o.OrderID
join Products as p on od.ProductID = p.ProductID
join Customers as c on o.CustomerID = c.CustomerID
) x
group by x.Country
order by total desc
```

|total|	Country|
|---|---|
|69612|	USA|
|51672|	Austria|
|47242|	Germany|
|40215|	Brazil|
|31326|	Canada|
|29549|	France|
|17871|	Denmark|
|16696|	UK|
|15391|	Ireland|
|13556|	Venezue|
|9721	|Sweden|
|8125	|Switzed|
|8051	|Belgiu|
|6439	|Finlan|
|5862	|Mexico|
|4329	|Italy|
|4302	|Spain|
|4170	|Portug|
|1324	|Norway|
|574	|Poland|
|399	|Argent|


## 国ごとの売上を年ごとに集計する

```
select ROUND(sum(sales)) as total, strftime("%Y", x.OrderDate) as OrderYear, x.Country from (
SELECT od.Quantity * p.Price as sales, c.Country,o.OrderDate FROM [OrderDetails] as od 
join Orders as o on od.OrderID = o.OrderID
join Products as p on od.ProductID = p.ProductID
join Customers as c on o.CustomerID = c.CustomerID
) x
group by x.Country, OrderYear
```


|total|	OrderYear	|Country|
|---|---|---|
|399	|1997	|Argentina|
|36715|	1996	|Austria|
|14957|	1997	|Austria|
|8051	|1996	|Belgium|
|32155|	1996	|Brazil|
|8060	|1997	|Brazil|
|9939	|1996	|Canada|
|21387|	1997	|Canada|
|3767	|1996	|Denmark|
|14104|	1997	|Denmark|
|4580	|1996	|Finland|
|1859	|1997	|Finland|
|21499|	1996	|France|
|8050	|1997	|France|
|42770|	1996	|Germany|
|4472	|1997	|Germany|
|13205|	1996	|Ireland|
|2187	|1997	|Ireland|
|1256	|1996	|Italy|
|3073	|1997	|Italy|
|5862	|1996	|Mexico|
|1324	|1996	|Norway|
|574	|1996	|Poland|
|3106	|1996	|Portugal|
|1064	|1997	|Portugal|
|3879	|1996	|Spain|
|423	|1997	|Spain|
|9271	|1996	|Sweden|
|450	|1997	|Sweden|
|5365	|1996	|Switzerland|
|2760	|1997	|Switzerland|
|12076|	1996	|UK|
|4620	|1997	|UK|
|54595|	1996	|USA|
|15016|	1997	|USA|
|13056|	1996	|Venezuela|
|500	|1997	|Venezuela|



```
ALTER TABLE Employees
ADD Junior boolean NOT NULL default 0;

update Employees set Junior = true where strftime("%Y", BirthDate) >= '1960'
select * from Employees 
```


|EmployeeID|	LastName|	FirstName|	BirthDate|	Photo|	Junior|
|---|---|---|---|---|---|
|1|	Davolio|	Nancy|	1968-12-08|	EmpID1.pic|	1|
|2|	Fuller|	Andrew|	1952-02-19|	EmpID2.pic|	0|
|3|	Leverling|	Janet|	1963-08-30|	EmpID3.pic|	1|
|4|	Peacock|	Margaret|	1958-09-19|	EmpID4.pic|	0|
|5|	Buchanan|	Steven|	1955-03-04|	EmpID5.pic|	0|
|6|	Suyama|	Michael|	1963-07-02|	EmpID6.pic|	1|
|7|	King|	Robert|	1960-05-29|	EmpID7.pic|	1|
|8|	Callahan|	Laura|	1958-01-09|	EmpID8.pic|	0|
|9|	Dodsworth|	Anne|	1969-07-02|	EmpID9.pic|	1|
|10|	West|	Adam|	1928-09-19|	EmpID10.pic|	0|


```
ALTER TABLE Shippers
ADD long_relation boolean NOT NULL default 0;

update Shippers as s set long_relation = true where s.ShipperID IN(select ShipperID from Orders group by ShipperID having count(*) >= 70)
select * from Shippers 
```

|ShipperID|	ShipperName|	Phone|	long_relation|
|---|---|---|---|
|1	|Speedy Express|	(503) 555-9831| 0|
|2	|United Package|	(503) 555-3199|	1|
|3	|Federal Shipping|	(503) 555-9931|	0|


```
SELECT EmployeeID, MAX(OrderDate) as LastOrderDate FROM [Orders] group by EmployeeID
```

EmployeeID|	LastOrderDate|
---|---|
1|	1997-01-06|
2|	1997-01-22|
3|	1997-02-11|
4|	1997-02-10|
5|	1996-12-27|
6|	1997-02-07|
7|	1997-01-28|
8|	1997-02-12|
9|	1997-01-10|


## NULLを持つレコードの抽出方法

NULLは値でも変数でもない

NULLに比較述語を適用した結果は`unknown`になってしまう。クエリの結果として選択されるのはWHERE句の条件評価が`true`になるとき
そのため、`IS NULL`を利用する必要がある。

SQLの論理体系は3論理値(three-valued logic)と呼ばれて区別される。(`True`, `False`, `unknown`)
2種類のNULLとは未知(Unknown)、適用不能（Not Applicable）N/Aは適用不能

3値論理の演算
```
AND: false > unknown > true
OR: true > unknown > false
```


## WHEREとHAVINGの違い

- HAVING
  - `GROUP BY`句でグループ化したデータに対して条件をつける場合に利用する
  - `HAVING`句の条件式に記述できるのはグループ化に指定したカラム名や関数を使ってグループ単位で集計した結果にのみ利用可能
  - 例外もある
    - `GROUP BY`を指定せず`HAVING`を使うことができる。その場合あ`GROUP BY`は行全体に適用されれ、1行扱いになるため、複数行返すようなクエリにはできない。
    - [HAVING句を単独で使用可能な要件は？ 集約関数かASを使用すれば単独使用可能？](https://ja.stackoverflow.com/questions/21047/having%E5%8F%A5%E3%82%92%E5%8D%98%E7%8B%AC%E3%81%A7%E4%BD%BF%E7%94%A8%E5%8F%AF%E8%83%BD%E3%81%AA%E8%A6%81%E4%BB%B6%E3%81%AF-%E9%9B%86%E7%B4%84%E9%96%A2%E6%95%B0%E3%81%8Bas%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8C%E3%81%B0%E5%8D%98%E7%8B%AC%E4%BD%BF%E7%94%A8%E5%8F%AF%E8%83%BD)
- WHERE
  - グループ化する前のデータに対して条件をつける場合に利用

>WHERE句による条件の判定は、GROUP BY句によるグループ化より先に行われます。つまり、

>1.WHERE句でレコードを絞り込む
>2.絞り込まれた結果に対してGROUP BY句でグループ化する
>という順序です。

>一方HAVING句による条件の判定は、GROUP BY句によるグループ化の後で行われます。

>1.GROUP BY句で全レコードをグループ化する
>2.グループ化された結果に対してHAVING句でレコードを絞り込む

## DDL、DML、DCL、TCLについて

- DDL(Data Definition Language)
  - データベースに対して実施するSQL
  - `CREATE`,`DROP`,`ALTER`,`TRUNCATE`
  - e.g. https://github.com/isucon/isucon12-qualify/blob/main/webapp/sql/init.sql
- DML(Data Manipulation Language)
  - データ操作系
  - `SELECT`,`INSERT`,`UPDATE`,`DELETE`,`EXPLAIN`,`LOCK TABLE`
- DCL(Data Control Language)
  - DMLやDDLの利用に関する許可や禁止を行う
  - `GRANT`,`REVOKE`
- TCL(Transaction Control Language)
  - トランザクション関係
  - `COMMIT`,`ROLLBACK`,`SET TRANSACTION`,`SAVE POINT`

## Quiz

Q. HAVING句はGROUP BY句で集計した後に適用しますが、GROUP BY句を利用せずにHAVING句を適用するSQLを書くことが可能です。  
どういったクエリになるでしょうか？

## ウィンドウ関数

カンタンにまとめると以下のとおり
>現在の行に関するテーブル全体を舐める計算をする
>集約関数と考え方は似ている。集約関数は文字通り1行に集約するが、window関数を使った場合は対象の行はそのまま残る
>対象の行全てに対して処理が行われる

ちょっと詳しく
1. ウィンドウ関数のウィンドウとは、（原則として順序を持つ）範囲という意味
2. ウィンドウ関数の構文上では、PARTION BY句とORDER BY句で特徴づけられたレコードの集合を意味するが、一般的に簡略形の構文が使われるため、かえってウィンドウの存在を意識しにくい
3. PARTITION BY句はGROUP BY句から集約の機能を引いて、カットの機能だけを残し、ORDER BY句はレコードの順序を付ける
4. フレーム句はカーソルの機能をSQLの構文に持ち込むことで、カレントレコードを中心にしたレコード集合の範囲を定義することができる
5. フレーム句を使うことで、異なる行のデータを1つの行に持ってくることができるようになり、行間比較が簡単に行えるようになった
6. ウィンドウ関数の内部動作としては、現在のところ、レコードのソートが行われている。将来的にハッシュが採用される可能性もゼロではない

ウィンドウ関数の概念
1. PARTITION BY句によるレコード集合のカット
2. ORDER BY句によるレコードの順序付け
3. FRAME句によるカレントレコードを中心としたサブセットの定義

e.g.

部署ごとの平均賃金が欲しい

```
  depname  | empid | salary |  avg_salary
-----------+-------+--------+-------------
 develop   |    11 |   5200 |        5020
 develop   |     7 |   4200 |        5020
 develop   |     9 |   4500 |        5020
 develop   |     8 |   6000 |        5020
 develop   |    10 |   5200 |        5020
 personnel |     5 |   3500 |        3700
 personnel |     2 |   3900 |        3700
 sales     |     3 |   4800 |        4866
 sales     |     1 |   5000 |        4866
 sales     |     4 |   4800 |        4866
```

```
SELECT
  depname,
  AVG(depname) AS avg_salary
FROM emp_info
GROUP BY depname
```

```
depname  | avg_salary
-----------+--------
 develop   |   5200
 personnel |   3700
 sales     |   4866
```

ウィンドウ関数を使ったケース

```
SELECT
  depname,
  empid,
  salary,
  AVG(salary) OVER (PARTITION BY depname)
FROM emp_info;
```

結果
```
  depname  | empid | salary |  avg_salary
-----------+-------+--------+-------------
 develop   |    11 |   5200 |        5020
 develop   |     7 |   4200 |        5020
 develop   |     9 |   4500 |        5020
 develop   |     8 |   6000 |        5020
 develop   |    10 |   5200 |        5020
 personnel |     5 |   3500 |        3700
 personnel |     2 |   3900 |        3700
 sales     |     3 |   4800 |        4866
 sales     |     1 |   5000 |        4866
 sales     |     4 |   4800 |        4866
```


#### メモ
`depname`毎のレコードに平均のsalaryが取得できている

`OVER`句を利用することで`AVG`や`SUM`をウィンドウ関数として利用できる


直近を求めるクエリ
```
SELECT sample_date AS cur_date, 
MIN(sample_date) 
OVER (
    ORDER BY sample_date ASC ROWS BETWEEN 1 PRECEDING AND 1 PRECEDING
    ) AS latest_date FROM LoadSample;
```

`ROWS BETWEEN 1 PRECEDING AND 1 PRECEDING` カレント行に対して前のレコードを取得する意味


FYI:
- [window関数を使いこなす 〜分析のためのSQL〜](https://qiita.com/HiromuMasuda0228/items/0b20d461f1a80bd30cfc)