var cnt = 0;

var text = new Array();
var data = new Array(1000);
for (var i = 0; i < 3; i++) {
    data[i] = new Array(3);
}

function csvToArray(path) {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", path, false); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    text.push(req.responseText);
}

function arrayToData() {
    for (var i = 0; i < text.length; ++i) {
        var s = text[i].split("\n");
        for (var j = 0; j < s.length; ++j) {
            data[i][j] = s[j].split(',');
        }
    }
}

function Game() {
    var random = Math.floor(Math.random() * data.length);
    var random2 = Math.floor(Math.random() * 40);
    questionChange("Hello World!")

}

function questionChange(q) {
    document.getElementById("question").innerHTML = q;
}

var Hello = function(button) {
    anime({
        targets: 'html, body',
        scrollTop: window.innerHeight,
        duration: 3000
    });
}

var StartTest = function(button) {
    for (var i = 1; i <= 5; ++i) {
        var obj = document.getElementById(i);
        if (obj.checked) {
            csvToArray("./vocabularys/test" + i + ".csv");
        }
    }

    if (text.length == 0) {
        alert("テストを選択してください")
    }

    arrayToData();
    console.log(data[0][0][0]);
    console.log(data[0][2][1]);

    Game();

    $(".red").show();
    anime({
        targets: 'html, body',
        scrollTop: window.innerHeight * 2,
        duration: 3000
    });
}