-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
all.js
	Dummy:
		･全てのページでContentsScriptを実行するやり方のモデル
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
background.js
	Redirect to original page of new tab:"https://www.google.co.jp/_/chrome/newtab?ie=UTF-8&extension=NTB" from default page of new tab:"https://www.google.co.jp/_/chrome/newtab?ie=UTF-8":
		･"https://www.google.co.jp/_/chrome/newtab?ie=UTF-8"では,Chromeの仕様上ContentScriptが実行されないので,リダイレクトする必要があるため
		･リダイレクトするだけなのに挙動を理想に近づけようとしたらメチャクチャややこしいことになってしまった…
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
js.js
	ContentsScript:
		･"https://www.google.co.jp/_/chrome/newtab?ie=UTF-8&extension=NTB"で発火する,この拡張機能のメイン(のはず)のスクリプト
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
options.html & options.js
	Option page and script of it:
		･説明するまでもない
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
メモ(Readme).txt
	This document:
		･開発期間が開いたときにどのファイルがどの機能を持っているのか思い出したり,この拡張機能をリバースエンジニアリングして拡張機能の実装や書き方等々を参考にする人(いないとは思うけど)のためのドキュメント
		･リバースエンジニアリング大歓迎
			なんなら解説するから気軽に
				twitter@INPN_Officer
				mail:jikkuri.5.10.5.10.pokka@gmail.com
			へご連絡を