phina.globalize();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

phina.define('MainScene', {
    superClass: 'DisplayScene',

    // コンストラクタ
    init: function() {
        this.superInit();
        this.backgroundColor = 'blue';

        // ラベル（テキスト）
        var label1 = Label({text: 'Hello,World',fontSize:64}).addChildTo(this);
        var label2 = Label({text: 'Hello,World',fontSize:64}).addChildTo(this);

        label1.x = 240;
        label1.y = 50;

        label2.x = 240;
        label2.y = 150;


        // 長方形
        var rectangle = RectangleShape().addChildTo(this);

        rectangle.x = 240;
        rectangle.y = 250;

        rectangle.width = 350;
        rectangle.fill = 'yellow';

        console.log(rectangle);

        var label3 = Label({text: 'Hello,World',fontSize:64}).addChildTo(this);

        label3.x = 240;
        label3.y = 250;
        label3.fill = 'red';

    }
});

phina.main(function() {
    var app = GameApp({
        startLabel: 'main',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });
    app.run();
})