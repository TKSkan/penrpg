phina.globalize();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var SPEED = 4;

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
    spritesheet: {
        'chara_ss':
        {
            "frame":{
                "width":32,
                "height":32,
                "cols":3, // 行列
                "rows":4 // 行列
            },
            "animations":{
                "walk":{
                    "frames":[0,1,2,1], // アニメーションするフレーム指定
                    "next":"walk", // walkの繰り返し
                    "frequency":10 // 画像の切り替えスピート
                }
            }
        }
    }
};

Sound.volume = 0.05;

phina.define('MainScene', {
    superClass: 'DisplayScene',

    // コンストラクタ
    init: function() {
        this.superInit();

        this.backgroundColor = 'black';
        this.group = DisplayElement().addChildTo(this);
        this.start = [SCREEN_WIDTH/2, SCREEN_HEIGHT/2];

/*
        this.background = Sprite('bg').addChildTo(this);
        this.background.origin.set(0,0);
        this.tmpcount = 0;

        this.group = DisplayElement().addChildTo(this);
        Player('chara1', 32, 32, 140, 240).addChildTo(this.group);
        Player('chara2', 32, 32, 240, 240).addChildTo(this.group);
        Player('chara3', 32, 32, 340, 240).addChildTo(this.group);
*/

        // 自作クラスのロード
        // Player('chara', 80, 180).addChildTo(this);


    },

    update: function(app) {

        var p = app.pointer;

        if(p.getPointing()){
            // サークルを作る
            Circle(this.start,[p.x, p.y]).addChildTo(this.group);
        }
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
            Player('chara1', 32, 32, 80, 180).addChildTo(this.group);
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

        this.group.children.eraseIf(function(elem) {
            if(elem.derete === true) {
                return true;
            }
        })
    }
});

// 自作クラス(circle)
phina.define('Circle', {
    superClass:'CircleShape',
    init: function(start, target) {
        this.superInit(start,target);

        this.setPosition(start[0],start[1]);
        this.fill = '#ff8800';
        this.stroke = '#ff0000';
        this.stroleWidth = 5;
        this.radius = 5;
        this.speed = 8;
        this.direction = Math.atan2(target[1]-start[1], target[0]-start[0]);
        this.vx = Math.cos(this.direction)*this.speed;
        this.vy = Math.sin(this.direction)*this.speed;
        this.delete = false;
    },
    update: function(app) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > SCREEN_WIDTH || this.y < 0 || this.y > SCREEN_HEIGHT) {
            this.derete = true;
        }
        console.log('a');
    }
})



// 自作クラス(player)
phina.define('Player', {
    superClass:'Sprite',
    init: function(sp, xSize, ySize, x, y) {
        this.superInit(sp, xSize, ySize);
        this.setPosition(x, y);
        this.frameIndex = 0;
        this.speed = 4;
        this.vx = this.speed;
        this.vy = this.speed;
        this.scaleX = 1.5;
        this.scaleY = 1.5;

        // animation
        var spritesheet = FrameAnimation('chara_ss');
        spritesheet.attachTo(this);
        spritesheet.gotoAndPlay('walk');
    },

    update: function(app){
    //     this.x += this.vx;
    //     this.y += this.vy;
    //     if(this.x < 0 || this.x > SCREEN_WIDTH) { this.vx = -this.vx; }
    //     if(this.y < 0 || this.y > SCREEN_HEIGHT) { this.vy = -this.vy; }
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