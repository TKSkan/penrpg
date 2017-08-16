phina.globalize();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

// ひぽや素材

var ASSETS = {
    image:{
        chara: './img/pipo-halloweenchara2016_26.png',
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

        this.player = Sprite('chara', 32, 32).addChildTo(this).setPosition(30, 30);
        this.player.frameIndex = 0;
        this.speed = 4;
        this.vx = this.speed;
        this.vy = this.speed;

    },

    update: function(app) {
        this.player.x += this.vx;
        this.player.y += this.vy;
        if(this.player.x < 0 || this.player.x > SCREEN_WIDTH) { this.vx = -this.vx; }
        if(this.player.y < 0 || this.player.y > SCREEN_HEIGHT) { this.vy = -this.vy; }
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