/**
 * Created by Administrator on 2014/9/30.
 */
/*此为游戏主场景的逻辑控制及层显示初始化*/
var GMSLayer = cc.Layer.extend({
    _mainArr: new Array(),
    _mainI: 0,
    _score:0,
    ctor: function () {
        this._super();
        this.init();
    },
    /* 初始化添加游戏对象、事件监听*/
    init: function () {
        this.clearAllCube();
//        添加开始键；
        this.addStartButton();
        //画网格；
        this.drawGrid(GC.w / GC.GRID_W, GC.h / GC.GRID_H);
        //创建二维数组；
        this.creatArr(GC.w / GC.GRID_W, GC.h / GC.GRID_H);
        //填充二维数组；
        this.fillCubeByaArr(this._mainArr);
        //添加事件;
        this.addMouse();
        // this.schedule(this.evolution, 1);
        return true;
    },
    //添加开始按钮；
    addStartButton: function () {
        var playAgainNormal = new cc.Sprite(res.menu1_png, cc.rect(0, 0, 125, 32));
        var playAgainSelected = new cc.Sprite(res.menu1_png, cc.rect(0, 0, 125, 32));
        var playAgainDisabled = new cc.Sprite(res.menu1_png, cc.rect(0, 0, 125, 32));

        var playAgain = new cc.MenuItemSprite(
            playAgainNormal, playAgainSelected, playAgainDisabled,
            this.onPlayAgain, this);
        var menu = new cc.Menu(playAgain);
        this.addChild(menu, 1, 0);
        menu.x = GC.w / 2;
        menu.y = 20;
    },
    //点击开始按钮，开始进化；
    onPlayAgain: function (pSender) {
        cc.log("startEvolution");
        //定时进化；
        this.schedule(this.evolution, GC.EV_TIME);
    },
    //画线；
    drawGrid: function (xNum, yNum) {
        var draw = new cc.DrawNode();
        for (var i = 0; i < xNum; i++) {
            draw.drawSegment(cc.p(i * GC.GRID_W, 0), cc.p(i * GC.GRID_W, GC.h), 1, cc.color(200, 200, 250, 50));
        }
        ;
        for (var i = 0; i < yNum; i++) {
            draw.drawSegment(cc.p(0, i * GC.GRID_H), cc.p(GC.w, i * GC.GRID_H), 1, cc.color(200, 200, 250, 50));
        }
        ;
        this.addChild(draw);
    },
    //填充；
    fillCubeByaArr: function (Arr) {
        this.clearAllCube();
        this.drawScore(Arr);
        var tag_i = 1;
        for (var i = 0; i < GC.w / GC.GRID_W; i++) {
            for (var j = 0; j < GC.h / GC.GRID_H; j++) {
                if (Arr[i][j] == 1) {
                    this.fillCube(i, j, tag_i++);
                }
            }
        }
    },
    //画上分数；
    drawScore:function(Arr){
        var score=0;
        for (var i = 0; i < GC.w / GC.GRID_W; i++) {
            for (var j = 0; j < GC.h / GC.GRID_H; j++) {
                if (Arr[i][j] == 1) {
                    score++;
                }
            }
        }
        this._score=score;
        GC.SCORE=score;
        var Score = new cc.LabelTTF("分数："+this._score,"Arail",20);
        Score.x=GC.w*1/5;
        Score.y=GC.h*6/7;
        this.addChild(Score,0,1);
    },
    //清除所有方框；
    clearAllCube: function () {
        for (var i = 1; i < (GC.w / GC.GRID_W) * (GC.h / GC.GRID_H); i++) {
            this.removeChild(this.getChildByTag(i));
        }
    },
    //创建数组并初始化；
    creatArr: function (D1Long, D2Long) {
        for (var i = 0; i < D1Long; i++) { //一维长度为D1Long
            this._mainArr[i] = new Array(); //声明二维
            for (var j = 0; j < D2Long; j++) { //二维长度为D2Long
                this._mainArr[i][j] = 0;
            }
        }
    },

    //根据填充；
    fillCube: function (x, y, i) {
        var draw = new cc.DrawNode();
        var xp = x * GC.GRID_W;
        var yp = y * GC.GRID_H;
        draw.drawRect(cc.p(xp, yp), cc.p(xp + GC.GRID_W, yp + GC.GRID_H), cc.color(200, 200, 250, 50), 1, cc.color(200, 200, 250, 50));
        this.addChild(draw, 1, i+1);
    },
    //进化数组并且显示
    evolution: function () {
        this.LiftCreatScan();
        this.LiftDeathScan();
        this.fillCubeByaArr(this._mainArr);
    },
    //
    LiftCreatScan: function () {
        for (var x = 0; x < GC.w / GC.GRID_W; x++) {
            for (var y = 0; y < GC.h / GC.GRID_H; y++) {
                if (x > 0 && x < GC.w / GC.GRID_W - 1 && y > 0 && y < GC.h / GC.GRID_H - 1) {
                    var liftCount = 0;
                    if (this._mainArr[x - 1][y] == 1) {
                        liftCount++;
                    }
                    if (this._mainArr[x][y - 1] == 1) {
                        liftCount++;
                    }
                    if (this._mainArr[x + 1][y] == 1) {
                        liftCount++;
                    }
                    if (this._mainArr[x][y + 1] == 1) {
                        liftCount++;
                    }
                    if (liftCount > 1 && liftCount < 4) {
                        this._mainArr[x][y] = 1;
                    }
                }
            }
        }
        return this._mainArr;
    },
    //
    LiftDeathScan: function () {
        for (var x = 0; x < GC.w / GC.GRID_W; x++) {
            for (var y = 0; y < GC.h / GC.GRID_H; y++) {
                if (x > 0 && x < GC.w / GC.GRID_W - 1 && y > 0 && y < GC.h / GC.GRID_H - 1) {
                    var liftCount = 0;
                    if (this._mainArr[x - 1][y] == 1) {
                        liftCount++;
                    }
                    if (this._mainArr[x][y - 1] == 1) {
                        liftCount++;
                    }
                    if (this._mainArr[x + 1][y] == 1) {
                        liftCount++;
                    }
                    if (this._mainArr[x][y + 1] == 1) {
                        liftCount++;
                    }
                    if (liftCount > 1 && liftCount < 4) {
                    } else {
                        this._mainArr[x][y] = 0;
                    }
                }
            }
        }
        return this._mainArr;
    },
    addMouse: function () {
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    var target = event.getCurrentTarget();
                    var pos = event.getLocation();
                    cc.log("x,y=" + Math.floor(pos.x / GC.GRID_W) + Math.floor(pos.y / GC.GRID_H));
                    target._mainArr[Math.floor(pos.x / GC.GRID_W)][Math.floor(pos.y / GC.GRID_H)] = 1;
                    target.fillCubeByaArr(target._mainArr);
                }
//                onMouseMove: function (event) {
//                    var target = event.getCurrentTarget();
//                    var pos = event.getLocation();
//                    cc.log("x,y=" + Math.floor(pos.x / GC.GRID_W) + Math.floor(pos.y / GC.GRID_H));
//                    target._mainArr[Math.floor(pos.x / GC.GRID_W)][Math.floor(pos.y / GC.GRID_H)] = 1;
//                    target.fillCubeByaArr(target._mainArr);
//                }
            }, this);
        } else {
            cc.log("MOUSE Not supported");
        }
    }
});
GMSLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GMSLayer();
    scene.addChild(layer);
    return scene;
};

