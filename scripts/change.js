AOS.init();
Barba.Prefetch.init();
Barba.Dispatcher.on('newPageReady', function() {
    AOS.init();
});

var PageTransition = Barba.BaseTransition.extend({
    start: function() {
        // startはページトランジションの開始時に呼び出されるメソッド
        /*var _this = this;
        var _LoadOut = new Promise(function(resolve) {
            _this.LoadOut(resolve);
        });*/

        // トランジション開始と同時にnewContainerLoadingメソッドも呼ばれ、
        // トランジション用のメソッドとどちらもresolve()であればthen()が呼ばれる。
        Promise
            .all([this.newContainerLoading, this.loadOut()])
            .then(this.loadIn.bind(this));
    },
    loadOut: function(resolve) {

        resolve(anime({
            targets: this.oldContainer,
            translateX: '-10000px'
        }));
    },
    loadIn: function() {
        var _this = this;
        $(this.oldContainer).hide();
        anime({
            targets: this.newContainer,
            translateX: '-300px'
        });

        // 完了
        _this.done();
    },
});

Barba.Pjax.getTransition = function() {
    return PageTransition;
};

Barba.Pjax.start();