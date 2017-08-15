phina.globalize();

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;

phina.define('MainScene', {
    superClass: 'DisplayScene',

    // コンストラクタ
    init: function() {
        this.superInit();
        this.backgroundColor = 'black';

        // 矩形
        var rectangle = RectangleShape().addChildTo(this);
        // rectangle.fill = "#ffff00"; // 中の色
        rectangle.fill = "transparent"; // 中抜き
        rectangle.stroke = "#ffff00"; //外枠の色
        rectangle.setPosition(10 + 290 / 2, 10 + 190 / 2);
        rectangle.width = 290;
        rectangle.height = 190;
        // console.log(rectangle);

        // 円
        var circle = CircleShape().addChildTo(this);
        // circle.fill = "#ff0000";
        circle.fill = "transparent";
        circle.setPosition(320,240);
        circle.radius = 100;
        circle.stroke = "red";

        // 楕円
        var ellipse = CircleShape().addChildTo(this);
        // ellipse.fill = "#ff00ff";
        ellipse.fill = "transparent";
        ellipse.setPosition(500,350);
        ellipse.radius = 50;
        ellipse.stroke = "#ff00ff";
        ellipse.scaleX = 2;


        // ポリゴン
        var polygon = PolygonShape().addChildTo(this);
        polygon.fill = "#00ffff";
        polygon.setPosition(500,100);
        polygon.radius = 100;  // 大きさ
        polygon.sides = 6; // 角の数

        // 星（スター）
        var star = StarShape().addChildTo(this);
        star.fill = "#909090";
        star.setPosition(100,350);
        star.radius = 100; // 大きさ

        // ハート
        var heart = HeartShape().addChildTo(this);
        heart.fill = 'pink';
        heart.stroke = 'red';
        heart.setPosition(320,400);
        heart.radius = 50;

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