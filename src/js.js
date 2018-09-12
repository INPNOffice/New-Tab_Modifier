//マニフェスト読み込み
	var manifest = chrome.runtime.getManifest();
//設定読み出しと実行
	console.log("New Tab Modificater\n"+manifest["version"]);
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
				data = {
					"tile":false,
					"img":null,
					"type":{
						"num":1,
						"type6":null
					},
					"color":null
				};
				chrome.storage.local.set(data,console.log("First configuration was saved."));
			}else{
				data = {
					"tile":d.tile,
					"img":d.img,
					"type":{
						"num":d.type.num,
						"type6":d.type.type6
					},
					"color":d.color
				};
			}
			//タイル非表示関係
				switch(data["tile"]){
					case true:
						console.log("Hiding tile is disabled.");
						break;
					case false:
						tile();
						break;
				}
			switch(Number(data["type"]["num"])){
				default:
					st = "background-position:center top;background-size:cover;background-repeat:no-repeat;";
					break;
				case 2:
					st = "background-position:center center;background-size:contain;background-repeat:no-repeat;";
					break;
				case 3:
					st = "background-repeat:repeat;";
					break;
				case 4:
					st = "background-repeat:repeat-y;";
					break;
				case 5:
					st = "background-repeat:repeat-x;";
					break;
				case 6:
					st = data["type"]["type6"];
					break;
			}
			//壁紙描画
				if(data["img"] != null){
						bg(data);
				}else if(data["color"] != null){
						bg(data);
				}
		}
	);
	function bg(data){
		rw(data);
		dnt = 1;
		t = 0;
		i = 0;
		setTimeout("roopbg(data)",0);
	}
	function roopbg(data){
		if(style == document.getElementsByTagName("body")[0].style.cssText){
			i++;
			t++;
			if(t >= 500 || dnt >= 2){
				console.log("Rewriting had been done for " + i + "ms, and rewriting was done " + dnt + "times.");
			}else{
				setTimeout("roopbg(data)",0);
				console.log("roopbg," + t + "ms, " + dnt + "times.");
			}
		}else{
			t = 0;
			dnt++;
			i++;
			rw(data);
			setTimeout("roopbg(data)",0);
		}
	}

	function rw(data){
		if(data["img"] != null){
			src = "height:100%;"+st+";";
			document.getElementsByTagName("body")[0].style = src;
			document.getElementsByTagName("body")[0].style.backgroundImage = 'url("' + data["img"] + '")';
		}
		if(data["color"] != null){
			document.getElementsByTagName("body")[0].style.backgroundColor = data["color"];
		}
		style = document.getElementsByTagName("body")[0].style.cssText;
	}
	function tile(){
		document.getElementById("mv-tiles").style.visibility = "hidden";
		document.getElementById("most-visited").style.visibility = "hidden";
		console.log("New tab modificater hided tiles.");
	}