//多言語対応
	document.getElementById("title").innerHTML = chrome.i18n.getMessage("config");
	document.getElementById("config").innerHTML = chrome.i18n.getMessage("config");
	document.getElementById("system").innerHTML = chrome.i18n.getMessage("system");
	document.getElementById("Lang").innerHTML = chrome.i18n.getMessage("langage")+":"+chrome.i18n.getMessage("lang");
	document.getElementById("tileue").innerHTML = chrome.i18n.getMessage("tileue");
	document.getElementById("wpimg").innerHTML = chrome.i18n.getMessage("wpimg");
	document.getElementById("wptype").innerHTML = chrome.i18n.getMessage("wptype");
	
//マニフェスト読み込み
	var manifest = chrome.runtime.getManifest();

//設定記憶･呼び出し(読み込み時)
	/*備忘録
		var test = {
			test : "hogehoge"
		};
		chrome.storage.local.set(test,console.log("saved"));
		chrome.storage.local.get(
			test,
			function(items) {
				console.log(items.test);
			}
		);
	*/
	//読み出し
		load();
		function load(){
			chrome.storage.local.get(
				//ここにキー一覧
				[
					"tile",
					"img",
					"type",
					"color"
				],
				function(d) {
					if(d.tile == null){
						let data = {
							"tile":false,
							"img":null,
							"type":{
								"num":1,
								"type6":null
							},
							"color":null
						};
						chrome.storage.local.set(data,console.log("First configuration was saved."));
						load();
					}else{
						data = {
							"tile":d.tile,
							"img":d.img,
							"type":d.type,
							"color":d.color
						};
							if(data["img"] != null){
								console.log(manifest["name"]
											+" "
											+manifest["version"]
											+"\nタイルの有/無効:"
											+data["tile"]
											+"\n壁紙画像のデータURL:"
											+data["img"].substr(0,99)
											+" (100文字より長い場合はそれ以下に省略)\n壁紙タイプ:"
											+data["type"]["num"]
											+"\n壁紙拡張:"
											+data["type"]["type6"]
											+"\n背景色:"
											+data["color"]);
								//タイプ選択
									style();
							}else{
								console.log(manifest["name"]
											+" "
											+manifest["version"]
											+"\nタイルの有/無効:"+data["tile"]);
								aewos();
							}
						//タイル非表示関係
							switch(data["tile"]){
								case false:
									document.form.tile.checked = false;
									break;
								case true:
									document.form.tile.checked = true;
									break;
							}
						//初回起動用に開いた瞬間設定がパーン
							chrome.storage.local.set(data,console.log("saved"));
					}
				}
			);
		}
	//CSPしね
	//保存
		//閉じるとき
		window.onbeforeunload = function(){
			chrome.storage.local.set(data,console.log("saved"));
		}

//ページでの操作
	//壁紙(ファイルが選択されたらそいつをデータURLにして保存に備える)
		document.form.bgimg.addEventListener('change', function(){
			var file = document.form.bgimg.files[0];
			var fr = new FileReader();
			fr.readAsDataURL(file);
			fr.addEventListener('load', function(){
				data["img"] = fr.result;
				chrome.storage.local.set(data,console.log("saved"));
				style();
			}, false);
		}, false);
		//プレビュー画像クリックで設定消去
			document.getElementById("image").addEventListener('click', function(){
				data["img"] = null;
				document.getElementById("image").style = "height:100%;'>";
				chrome.storage.local.set(data,console.log("saved"));
			}, false);
	//タイル非表示
		document.form.tile.addEventListener('click', function(){
			data["tile"] = document.form.tile.checked;
			chrome.storage.local.set(data,console.log("saved"));
		});
	//壁紙タイプ
		document.form.type.addEventListener('change', function(){
			data["type"]["num"] = document.form.type.value;
			style();
			chrome.storage.local.set(data,console.log("saved"));
		});
		function style(){
			switch(Number(data["type"]["num"])){
				default:
					st = "background-position:center top;background-size:cover;background-repeat:no-repeat;";
					var desc = "リピートなし･見切れあり(ただし画面いっぱい表示できる)<br>\ncode:'"+st+"'";
					setTimeout("aewos()",1);
					break;
				case 2:
					st = "background-position:center center;background-size:contain;background-repeat:no-repeat;";
					var desc = "リピートなし･見切れなし(見切れないが余白ができる)<br>\ncode:'"+st+"'";
					setTimeout("aewos()",1);
					break;
				case 3:
					st = "background-repeat:repeat;";
					var desc = "リピートあり<br>\ncode:'"+st+"'";
					setTimeout("aewos()",1);
					break;
				case 4:
					st = "background-repeat:repeat-y;";
					var desc = "縦リピートあり<br>\ncode:'"+st+"'";
					setTimeout("aewos()",1);
					break;
				case 5:
					st = "background-repeat:repeat-x;";
					var desc = "横リピートあり<br>\ncode:'"+st+"'";
					setTimeout("aewos()",1);
					break;
				case 6:
					var desc = "手動入力(上級者向け)\n:\n<input name='style' type='text' size='100'><input type='button' name='sos' value='保存'>";
					st = data["type"]["type6"];
					setTimeout("aewos()",1);
					break;
			}
			document.getElementById("describe").innerHTML = desc;
			document.form.type.selectedIndex=data["type"]["num"] - 1;
			//壁紙プレビュー
				if(data["img"] != null){
					document.getElementById("image").style = "height:88%;width:60%;border:solid 1px;background: url('"+data["img"]+"');"+st+";'>";
					document.getElementById("image").style.backgroundColor = data["color"];
				}
		}
		function aewos(){
			switch(Number(data["type"]["num"]) < 6){
				case true:
					//add event with colorcode
					document.form.color.value = data["color"];
					document.form.sc.addEventListener('click', function(){
						data["color"] = document.form.color.value;
						chrome.storage.local.set(data,console.log("saved"));
						style();
					});
					break;
				case false:
					//add event with original setting
					document.form.style.value = data["type"]["type6"];
					document.form.sos.addEventListener('click', function(){
						data["type"]["type6"] = document.form.style.value;
						chrome.storage.local.set(data,console.log("saved"));
						style();
					});
					break;
			}
		}