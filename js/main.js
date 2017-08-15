phina.globalize();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

var ASSETS = {
    image:{
        bg: './img/ikamaker.png'
    },
};

phina.define('MainScene', {
    superClass: 'DisplayScene',

    // コンストラクタ
    init: function() {
        this.superInit();

        this.background = Sprite('bg').addChildTo(this);
        this.background.origin.set(0,0);

    }
});

phina.main(function() {
    var app = GameApp({
        startLabel: 'main',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
    });
    app.run();
})