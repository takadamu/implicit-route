プロジェクトの概要説明
目次
必要条件
使用言語、環境、テクノロジー
使い方

# README
[あんもくのルート](https://implicit-route.herokuapp.com/)  
※読み込みが遅い可能性がございます。ご了承下さいませ。
<br>
<br>
[![Image from Gyazo](https://i.gyazo.com/9433436aca4eeac04d3857f60b4d8bf3.png)](https://gyazo.com/9433436aca4eeac04d3857f60b4d8bf3)

# あんもくのルート
通り方が分かりにくい道を**分かる人が解説（投稿）**するアプリです<br>
当方一人旅が好きなのですが、道が複雑だったり分からなく困ることがよくあります  
一番困ったのは、永遠に赤信号の道路  
地元の人に聞いたところ、「あまり人が通らないから、気をつけて渡れば良い」とのこと  
このような経験から、分かりにくい道に特化した解説サイトがあると便利だと感じ制作しました<br>
**地元の人にしか分からない道が多い**という印象から **「暗黙のルール」** にかけたタイトルになっています
<br>
<br>
![9493f066690f803f6f243aaf20aae528](https://user-images.githubusercontent.com/60647249/78006468-07a8e380-7378-11ea-87d2-772c890c6124.gif)

# DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :posts

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
|content|text|null: false|
|content_url|text||
|image_url|text||
### Association
- belongs_to :user

# DEMO
このアプリでできること
- 新規ユーザー登録・ログイン・ログアウト
- ログインユーザーは投稿・編集・削除が可能
- 登録していないユーザーは閲覧のみ可能
- 投稿検索（部分一致可）
- 地図の住所検索（緯度・経度出力）<br><br>

トップページ左側の検索窓では、**部分一致検索**が可能です  
タイトルと投稿内容から、部分一致するものが表示されます  
※gem 'ransack' 使用<br>
![8547c79d98648ec1ab474d00749ddcf0](https://user-images.githubusercontent.com/60647249/78041116-502dc480-73ab-11ea-9baf-6ef2bbc948ca.gif)
<br><br>
トップページのマップ内にある検索窓からは、住所の検索ができます  
※今後の展望有<br>
![3ff00f8abe708634ee13e730ee9cf1f8](https://user-images.githubusercontent.com/60647249/78006360-dfb98000-7377-11ea-847c-1891086232d1.gif)
 
# 特徴
動きはCSSのみで表現しています  
※以下一部抜粋  
- FontAwesome<br>
![ce7817408d532e5c619269428d69148c](https://user-images.githubusercontent.com/60647249/78027119-c9232100-7397-11ea-8d5e-58b4613ddd1e.gif)<br><br>
- 各種ボタン  
ログイン<br>
![5baeded29b2f741c35da51a718b4b90e](https://user-images.githubusercontent.com/60647249/78027556-857ce700-7398-11ea-8cef-069038ddcc7d.gif)<br><br>
新規投稿  
![d9425c02f3ca71f07624c87b082fb0d5](https://user-images.githubusercontent.com/60647249/78027400-4189e200-7398-11ea-9004-31536fbea002.gif)<br><br>
検索<br>
![0b46cab1f1ec13d4aac532f591f4cf93](https://user-images.githubusercontent.com/60647249/78027738-d260bd80-7398-11ea-8350-5278b2446f48.gif)  

# 今後の展望
1. 住所と投稿を紐付けて、マップにマーカー表示させる
   - 現時点で表示されているマーカーは、事前に表示させるようJS内で組んであるものになります
2. マップ上をクリックした時も投稿ができる
   - クリックした緯度経度を保持したまま、投稿と紐付ける事ができるようにしていきたいです
3. 文章と画像が混在できるようになる
   - ブログのように、文章内に画像を貼ることができるようになり、順路の説明がしやすく（わかりやすく）なるようにしたいと考えています