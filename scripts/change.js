AOS.init();
Barba.Dispatcher.on('newPageReady', function() {
    AOS.init();
});

var PageTransition = Barba.BaseTransition.extend({
    start: function() {
        // startはページトランジションの開始時に呼び出されるメソッド
        var _this = this;
        var _LoadOut = new Promise(function(resolve) {
            _this.LoadOut(resolve);
        });

        // トランジション開始と同時にnewContainerLoadingメソッドも呼ばれ、
        // トランジション用のメソッドとどちらもresolve()であればthen()が呼ばれる。
        Promise
            .all([this.newContainerLoading, this.loadOut()])
            .then(this.loadIn.bind(this));
    },
    loadOut: function(resolve) {
        anime({
            targets: '.barba-container',
            translateX: '-300px'
        });
        resolve();
    },
    loadIn: function() {
        var _this = this;
        // 完了
        _this.done();
    },
});

Barba.Prefetch.init();
Barba.Pjax.init();