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

        this.player_pos = []; // 空配列の準備


    },

    update: function(app) {
        var p = app.pointer;
        // 押しっぱなし可能
        /*
        if(p.getPointing()){
            this.player = Sprite('chara', 32, 32).addChildTo(this).setPosition(p.x, p.y);
            this.player.frameIndex = 0;
            this.player_pos.push(this.player);
        }
        */
        // クリックして離した瞬間にキャラPUT
        this.onpointend = function() {
            this.player = Sprite('chara', 32, 32).addChildTo(this).setPosition(p.x, p.y);
            this.player.frameIndex = 0;
            this.player_pos.push(this.player);
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