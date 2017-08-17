phina.globalize();

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 800;

// ひぽや素材

var ASSETS = {
    image:{
        chara1: './img/pipo-halloweenchara2016_26.png',
        chara2: './img/pipo-halloweenchara2016_25.png',
        chara3: './img/pipo-halloweenchara2016_08.png',
        bg: './img/ikamaker.png'
    },
    sound:{
        bgm1: './bgm/bgm_maoudamashii_8bit28.mp3',
        se1: './bgm/se_maoudamashii_battle_gun02.mp3',
        se2: './bgm/se_maoudamashii_se_sound15.mp3'
    },
};

Sound.volume = 0.05;

phina.define('MainScene', {
    superClass: 'DisplayScene',

    // コンストラクタ
    init: function() {
        this.superInit();

        this.backgroundColor = 'black';
        this.paddleGroup = DisplayElement().addChildTo(this);
        var paddle = Paddle().addChildTo(this.paddleGroup);
    },

    update: function(app) {
    }
});


// パドルクラス
phina.define('Paddle', {
    superClass: 'RectangleShape',
    init: function(){
        this.superInit();
        this.width = 100;
        this.height = 20;
        this.setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT - this.height);
    },
    update: function(app) {
        var p = app.pointer;
        this.x = p.x;
        if(this.x < this.width/2) {
            this.x = this.width/2;
        }
        if(this.x > SCREEN_WIDTH - this.width/2) {
            this.x = SCREEN_WIDTH - this.width/2;
        }
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