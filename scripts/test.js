var cnt = 1;
var miss = 0;
var sum = 0;
var ans;
var random9;
var random1;
var random2;
var random3;
var random4;
var random5;
var random6;
var random7;
var random8;

var text = new Array();
var data = [];
for (var i = 0; i < 1000; i++) {
    data[i] = [];
    for (var j = 0; j < 100; j++) {
        data[i][j] = [];
    }
}
var done = new Array(1000);
for (var i = 0; i < 3; i++) {
    done[i] = new Array(3);
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
        random1 = Math.floor(Math.random() * text.length);
        random2 = Math.floor(Math.random() * 40) + 1;
        console.log(random1);
        console.log(random2);
        if (data[random1][0][1] >= random2) { break; }
    }
    questionChange(data[random1][random2][0]);
    console.log(data[random1][random2][1]);
    ans = data[random1][random2][1];
    choicesChange(ans, random1, random2);

}

function select(choice) {
    console.log(random9);
    console.log(choice);
    if (cnt >= sum) {
        alert("終了\n正解数： " + (sum - miss) + " / " + sum + " 問\nホームへ戻ります");
        location.href = 'https://ikomaso.github.io/select.html';
    }
    if (random9 == choice) {
        cnt++;
        data[random1][random2][2] = "correct";
        document.getElementById("number").innerHTML = cnt + " / " + sum + " 問";
    } else {
        alert("不正解\n答え：" + ans);
        miss++;
        cnt++;
        data[random1][random2][2] = "miss";
        document.getElementById("number").innerHTML = cnt + " / " + sum + " 問";
    }
    while (1) {
        random1 = Math.floor(Math.random() * text.length);
        random2 = Math.floor(Math.random() * 40) + 1;
        console.log(random1);
        console.log(random2);
        if (data[random1][0][1] >= random2) {
            if (!(data[random1][random2][2] == "correct" || data[random1][random2][2] == "miss")) {
                break;
            }
        }
    }
    questionChange(data[random1][random2][0]);
    console.log(data[random1][random2][1]);
    ans = data[random1][random2][1];
    choicesChange(ans, random1, random2);
}

function questionChange(q) {
    document.getElementById("question").innerHTML = q;
}

function choicesChange(ans, r1, r2) {
    console.log(data[r1][r2][1]);
    while (1) {
        random3 = Math.floor(Math.random() * text.length);
        random4 = Math.floor(Math.random() * 40) + 1;
        if (data[random3][0][1] >= random4 && !(random3 == r1 && random4 == r2)) { break; }
    }
    var s1 = data[random3][random4][1];
    var c1 = document.getElementById("c1");
    document.getElementById("c1").innerHTML = data[random3][random4][1];
    while (1) {
        random5 = Math.floor(Math.random() * text.length);
        random6 = Math.floor(Math.random() * 40) + 1;
        if (data[random5][0][1] >= random6 && !(random5 == r1 && random6 == r2) && !(random3 == random5 && random4 == random6)) { break; }
    }
    var s2 = data[random5][random6][1];
    var c2 = document.getElementById("c2");
    while (1) {
        random7 = Math.floor(Math.random() * text.length);
        random8 = Math.floor(Math.random() * 40) + 1;
        if (data[random7][0][1] >= random8 && !(random7 == r1 && random8 == r2) && !(random3 == random7 && random4 == random8) && !(random5 == random7 && random6 == random8)) { break; }
    }
    var s3 = data[random7][random8][1];
    var c3 = document.getElementById("c3");
    console.log(c3.innerHTML)

    random9 = Math.floor(Math.random() * 3) + 1;
    if (random9 == 1) {
        s1 = data[r1][r2][1];
    } else if (random9 == 2) {
        s2 = data[r1][r2][1];
    } else {
        s3 = data[r1][r2][1];
    }
    ityped.init(c1, {
        strings: [s1],
        typeSpeed: 80,
        showCursor: false,
        loop: false,
        onFinished: function() {}
    });
    ityped.init(c2, {
        strings: [s2],
        typeSpeed: 80,
        showCursor: false,
        loop: false,
        onFinished: function() {}
    });
    ityped.init(c3, {
        strings: [s3],
        typeSpeed: 80,
        showCursor: false,
        loop: false,
        onFinished: function() {}
    });
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
    for (var i = 1; i <= 15; ++i) {
        var obj = document.getElementById(i);
        if (obj.checked) {
            csvToArray("./vocabularys/test" + i + ".csv");
        }
    }


    if (text.length == 0) {
        alert("テストを選択してください");
    }
    arrayToData();

    for (var i = 0; i < text.length; ++i) {
        sum += Number(data[i][0][1]);
    }
    sum = Math.floor(sum * document.getElementById("range").value / 100);

    document.getElementById("number").innerHTML = cnt + " / " + sum + " 問";


    console.log(data[0][2][1]);

    Game();

    $(".red").show();
    anime({
        targets: 'html, body',
        scrollTop: $(document).height() - $(window).scrollTop() + $(window).height(),
        duration: 2000,
        easing: 'easeInOutQuart'
    });

    $(window).on('touchmove.noScroll', function(e) {
        e.preventDefault();
    });
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).on(scroll_event, function(e) { e.preventDefault(); });
}