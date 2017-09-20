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
        this.ballGroup = DisplayElement().addChildTo(this);
        this.brickGroup = DisplayElement().addChildTo(this);
        var paddle = Paddle().addChildTo(this.paddleGroup);
        Ball(paddle).addChildTo(this.ballGroup);
        for (var x=1; x<11; x++) {
            for (var y=1; y<6; y++) {
                Brick(x, y).addChildTo(this.brickGroup);
            }
        }
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

// ボールクラス
phina.define('Ball', {
    superClass:'CircleShape',
    init:function(paddle){
        this.superInit(paddle);
        this.paddle = paddle;
        this.fill = 'red';
        this.radius = 8;
        this.speed = 10;
        this.dx = 0;
        this.dy = 0;
        this.delete = false;
        this.update = this.start;
    },
    start:function(app) {
        var p = app.pointer;

        this.x = this.paddle.x;
        this.y = this.paddle.y - this.paddle.height / 2 - this.radius;
        
        if (p.getPointing()) {
            this.dx = -this.speed;
            this.dy = -this.speed;
            this.update = this.move;
        }
    },
    move:function(app) {
        this.x += this.dx;
        this.y += this.dy;
        
        // 壁との反射
        if (this.x - this.radius < 0) {
            this.x = 0 + this.radius;
            this.dx = -this.dx;
        }
        if (this.x + this.radius > SCREEN_WIDTH) {
            this.x = SCREEN_WIDTH - this.radius;
            this.dx = -this.dx;
        }
        // 天井との反射
        if (this.y - this.radius < 0) {
            this.y = 0 + this.radius;
            this.dy = -this.dy;
        }
        // パドルの反射判定
        if (this.hitTestElement(this.paddle) && this.dy > 0) {
            this.bottom = this.paddle.top;
            this.dy = -this.dy;
        }
        // ボールを落とした場合の処理
        if (this.y - this.radius > SCREEN_HEIGHT) {
            this.update = this.start;
        }
    }
})

// ブロッククラス
phina.define('Brick', {
    superClass:'RectangleShape',
    init:function(x,y){
        this.superInit(x,y);
        this.width = 50;
        this.height = 30;
        this.stroke = 'black';
        this.fill = 'brown';
        this.setPosition(x*(this.width+5), y*(this.height+2));
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