console.log("hello world!");
var StartTest = function(button) {
    $(".red").show();
    anime({
        targets: '.red',
        translateY: '-100vw'
    });
}