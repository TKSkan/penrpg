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
        bgm1: './bgm/bgm_maoudamashii_8bit28.mp3',
        se1: './bgm/se_maoudamashii_battle_gun02.mp3',
        se2: './bgm/se_maoudamashii_se_sound15.mp3'
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
        this.tmpcount = 0;

        this.group = DisplayElement().addChildTo(this);
        for(var i=0; i<5; i++) {
            Player('chara', 80 * i, 180).addChildTo(this.group);
        }

        // 自作クラスのロード
        // Player('chara', 80, 180).addChildTo(this);


    },

    update: function(app) {
        if(this.tmpcount !== 0){
            this.tmpcount--;
        }

        var key = app.keyboard;
        if(key.getKey('s')) {
            SoundManager.playMusic('bgm1');
        }
        if(key.getKey('e')) {
            SoundManager.stopMusic();
        }
        // スプライト消去
        if(key.getKey('d') && this.tmpcount === 0) {
            var first = this.group.children.first;
            if(first) {
                SoundManager.play('se1');
                this.tmpcount = 10;
                first.remove();
            }
        }
        // スプライト作成
        if(key.getKey('c') && this.tmpcount === 0) {
            Player('chara', 80, 180).addChildTo(this.group);
            this.tmpcount = 10;
        }
        // すべて削除
        if(key.getKey('a') && this.tmpcount === 0) {
            if(this.group.children.first) {
                SoundManager.play('se2');
                this.tmpcount = 10;
                this.group.children.clear();
            }
        }
    }
});

// 自作クラス
phina.define('Player', {
    superClass:'Sprite',
    init: function(sp, x, y) {
        this.superInit(sp, 32, 32);
        this.setPosition(x, y);
        this.frameIndex = 0;
        this.speed = 4;
        this.vx = this.speed;
        this.vy = this.speed;
    },

    update: function(app){
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < 0 || this.x > SCREEN_WIDTH) { this.vx = -this.vx; }
        if(this.y < 0 || this.y > SCREEN_HEIGHT) { this.vy = -this.vy; }
    }
})


phina.main(function() {
    var app = GameApp({
        startLabel: 'main',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
    });
    app.run();
})