AOS.init();
Barba.Prefetch.init();
Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    AOS.init();
    return false;

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
        new Promise(function(resolve, reject) {
            anime({
                targets: this.oldContainer,
                translateY: '-50vw'
            });
            resolve();
        })
    },
    loadIn: function() {
        var _this = this;
        anime({
            targets: this.newContainer,
            translateY: ['80vh', 0],
            easing: 'easeInOutQuart'
        });
        $(this.oldContainer).hide();
        // 完了
        _this.done();
    },
});

Barba.Pjax.getTransition = function() {
    return PageTransition;
};

Barba.Pjax.start();