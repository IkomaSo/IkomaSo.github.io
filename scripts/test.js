var text = new Array();
var data = new Array(1000);
for (var i = 0; i < 3; i++) {
    data[i] = new Array(2);
}

function csvToArray(path) {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", path, true); // アクセスするファイルを指定
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

csvToArray("../vocabularys/sample.csv");
arrayToData();
console.log(text[0][0]);
console.log(data[0][0][0]);
var Hello = function(button) {
    anime({
        targets: 'html, body',
        scrollTop: window.innerHeight,
        duration: 3000
    });
}

var StartTest = function(button) {
    $(".red").show();
    anime({
        targets: 'html, body',
        scrollTop: window.innerHeight * 2,
        duration: 3000
    });
}