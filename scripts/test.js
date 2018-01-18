var cnt = 0;
var elem = document.getElementById("range1");
console.log(elem);

function getValue() {
    var newValue = elem.value;
    var target = document.getElementById("value");
    target.innerHTML = newValue + "%";
}


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
    while (1) {
        var random1 = Math.floor(Math.random() * text.length);
        var random2 = Math.floor(Math.random() * 40) + 1;
        console.log(random1);
        console.log(random2);
        if (data[random1][0][1] >= random2) { break; }
    }
    questionChange(data[random1][random2][0]);
    console.log(data[random1][random2][1]);
    var ans = data[random1][random2][1]
    choicesChange(ans);

}

function questionChange(q) {
    document.getElementById("question").innerHTML = q;
}

function choicesChange(ans) {
    while (1) {
        var random3 = Math.floor(Math.random() * text.length);
        var random4 = Math.floor(Math.random() * 40) + 1;
        if (data[random3][0][1] >= random4 || !(random3 == random1 || random4 == random2)) { break; }
    }
    document.getElementById("c1").innerHTML = data[random3][random4][1];
    while (1) {
        var random5 = Math.floor(Math.random() * text.length);
        var random6 = Math.floor(Math.random() * 40) + 1;
        if (data[random5][0][1] >= random6 || !(random5 == random1 || random6 == random2) || !(random3 == random5 || random4 == random6)) { break; }
    }
    document.getElementById("c2").innerHTML = data[random5][random6][1];
    while (1) {
        var random7 = Math.floor(Math.random() * text.length);
        var random8 = Math.floor(Math.random() * 40) + 1;
        if (data[random7][0][1] >= random8 || !(random7 == random1 || random8 == random2) || !(random3 == random7 || random4 == random8) || !(random5 == random7 || random6 == random8)) { break; }
    }
    document.getElementById("c3").innerHTML = data[random7][random8][1];

    var random9 = Math.floor(Math.random() * 4) + 1;
    document.getElementById("c" + random9).innerHTML = ans;

}

var Hello = function(button) {
    anime({
        targets: 'html, body',
        scrollTop: window.innerHeight,
        duration: 3000,
        easing: 'easeInOutQuart'
    });
}

var StartTest = function(button) {
    for (var i = 1; i <= 1; ++i) {
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
        duration: 3000,
        easing: 'easeInOutQuart'
    });

    $(window).on('touchmove.noScroll', function(e) {
        e.preventDefault();
    });
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).on(scroll_event, function(e) { e.preventDefault(); });
}