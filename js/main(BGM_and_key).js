phina.globalize();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var SPEED = 4;

// ひぽや素材

var ASSETS = {
    image:{
        chara: './img/pipo-halloweenchara2016_26.png',
        bg: './img/ikamaker.png'
    },
    sound:{
        bgm1: './bgm/bgm_maoudamashii_8bit28.mp3'
    }
};

Sound.volume = 0.05;

phina.define('MainScene', {
    superClass: 'DisplayScene',

    // コンストラクタ
    init: function() {
        this.superInit();

        this.background = Sprite('bg').addChildTo(this);
        this.background.origin.set(0,0);

        this.player = Sprite('chara', 32, 32).addChildTo(this).setPosition(30, 30);
        this.player.frameIndex = 0;
        this.spd = SPEED;
        this.vx = 0;
        this.vy = 0;

    },

    update: function(app) {
        this.vx = 0;
        this.vy = 0;

        var key = app.keyboard;
        if(key.getKey('left')) {
            this.vx = -this.spd;
        }
        if(key.getKey('right')) {
            this.vx = this.spd;
        }
        if(key.getKey('up')) {
            this.vy = -this.spd;
        }
        if(key.getKey('down')) {
            this.vy = this.spd;
        }

        this.player.x += this.vx;
        this.player.y += this.vy;

        if(key.getKey('s')) {
            SoundManager.playMusic('bgm1');
        }
        if(key.getKey('e')) {
            SoundManager.stopMusic();
        }
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