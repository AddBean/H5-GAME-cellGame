/**
 * Created by Administrator on 2014/10/13.
 */
/*此为游戏主场景的逻辑控制及层显示初始化*/
var SMLayer = cc.Layer.extend({
    _mainArr: new Array(),
    _revArr: new Array(),
    _mainI: 0,
    _score: 0,
    _touch_flag: 1,
    _cell_tag: 5,
    _clearMenueFlag: 1,
    _start_x_panle: 35,
    _start_y_panle: 100,
    //构造函数;
    ctor: function () {
        this._super();
        this.init();
    },
    /* 初始化添加游戏对象、事件监听*/
    init: function () {
        this._touch_flag = 1;
        this.clearAllCube();
        this.addBg();
//        添加开始键；
        this.addStartButton();
        //画网格；
        if (GC.GRID_FLAG == 1) {
            this.drawGrid(GC.PANLE_W / GC.GRID_W, GC.PANLE_H / GC.GRID_H);
        }
        //创建二维数组；
        this.creatArr(GC.PANLE_W / GC.GRID_W, GC.PANLE_H / GC.GRID_H);
        //填充二维数组；
        this.creatCellByaArr(this._mainArr);
        //添加事件;
        //this.addMouse();
        this.addTouch();
        return true;
    },
    addBg: function () {
        var bg=new  GMSBGLayer();
        this.addChild(bg,0);
    },
    //添加开始按钮；
    addStartButton: function () {

        var b1 = new cc.LabelTTF("返回", "Arial", 20);
        var menu1 = new cc.MenuItemLabel(b1, function () {
            cc.log("返回");
            var scene = new cc.Scene();
            scene.addChild(new GSSLayer());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        });
        var cocos2dMenu1 = new cc.Menu(menu1);
        cocos2dMenu1.alignItemsVerticallyWithPadding(10);
        cocos2dMenu1.x = 30;
        cocos2dMenu1.y = GC.h - 30;
        this.addChild(cocos2dMenu1, 1, 0);


        var playNormal = new cc.Sprite(res.start);
        var playSelected = new cc.Sprite(res.start);
        var playDisabled = new cc.Sprite(res.start);

        var play = new cc.MenuItemSprite(
            playNormal, playSelected, playDisabled,
            function () {
                cc.log("开始繁殖");
                //定时进化；
                this.schedule(this.evolution, GC.EV_TIME);
            },this);
        var menu = new cc.Menu(play);
        menu.alignItemsVerticallyWithPadding(20);
        this.addChild(menu, 1, 1);
        menu.x = 160;
        menu.y = 65;

    },

    //画线；
    drawGrid: function (xNum, yNum) {
        var draw = new cc.DrawNode();
//        for (var i = 0; i < xNum + 1; i++) {
//            draw.drawSegment(cc.p(this._start_x_panle + i * GC.GRID_W, this._start_y_panle), cc.p(this._start_x_panle + i * GC.GRID_W, this._start_y_panle + GC.PANLE_H), 0, cc.color(255, 200, 250, 50));
//        }
//        ;
//        for (var i = 0; i < yNum + 1; i++) {
//            draw.drawSegment(cc.p(this._start_x_panle, this._start_y_panle + i * GC.GRID_H), cc.p(this._start_x_panle + GC.PANLE_W, this._start_y_panle + i * GC.GRID_H), 0, cc.color(255, 200, 250, 50));
//        }
//        ;
        for (var x = 0; x < xNum; x++) {
            for (var y = 0; y < yNum; y++) {
                draw.drawRect(
                    cc.p(x * GC.GRID_W + this._start_x_panle, y * GC.GRID_H + this._start_y_panle),
                    cc.p(x * GC.GRID_W + GC.GRID_W + this._start_x_panle, y * GC.GRID_H + GC.GRID_H + this._start_y_panle),
                    cc.color(100, 100, 100, 55),
                    2,
                    cc.color(250, 100, 100, 250));
            }
        }
        this.addChild(draw, 0, 1);
    },
    //填充并显示；
    creatCellByaArr: function (Arr) {
        this.clearAllCube();
        this.drawScore(Arr);
        var tag_i = 1;
        for (var i = 0; i < GC.PANLE_W / GC.GRID_W; i++) {
            for (var j = 0; j < GC.PANLE_H / GC.GRID_H; j++) {
                if (Arr[i][j] == 1) {
                    this.creatCell(i, j, tag_i++);
                }
            }
        }
    },
    //创建子细胞；
    creatCell: function (x, y, i) {
        var draw = new cc.DrawNode();
        var cell;
        var xp = x * GC.GRID_W + this._start_x_panle;
        var yp = y * GC.GRID_H + this._start_y_panle;
        cell = new Cell(this, xp, yp, GC.CELL_FROM);
        this.addChild(cell, 1, i + this._cell_tag);
        if (this._revArr[x][y] != this._mainArr[x][y]) {
            cell.onFadeIn();
            this._revArr = this._mainArr;
        }
        //

    },
    //画上分数；
    drawScore: function (Arr) {
        var score = 0;
        for (var i = 0; i < GC.PANLE_W / GC.GRID_W; i++) {
            for (var j = 0; j < GC.PANLE_H / GC.GRID_H; j++) {
                if (Arr[i][j] == 1) {
                    score++;
                }
            }
        }
        this._score = score;
        var Score = new cc.LabelTTF("细菌数：" + this._score, "Arail", 15);
        Score.x = GC.w - 55;
        Score.y = GC.h - 32;
        this.addChild(Score, 0, this._cell_tag - 2);
    },
    //清除所有方框；
    clearAllCube: function () {
        for (var i = this._cell_tag - 3; i < (GC.PANLE_W / GC.GRID_W) * (GC.PANLE_H / GC.GRID_H); i++) {
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
        this._revArr = this._mainArr;
    },

    //进化数组并且判断游戏是否结束；
    evolution: function () {
        cc.log("正在进化");
        this._revArr = this._mainArr;//进化前数组;
        var last_Score = this._score;
        this._touch_flag = 0;//失能触摸；
        this.LiftCreatScan();
        this.LiftDeathScan();
        this.creatCellByaArr(this._mainArr);
    },
    //扫描是否诞生新生命；
    LiftCreatScan: function () {
        for (var x = 0; x < GC.PANLE_W / GC.GRID_W; x++) {
            for (var y = 0; y < GC.PANLE_H / GC.GRID_H; y++) {
                if (x > 0 && x < GC.PANLE_W / GC.GRID_W - 1 && y > 0 && y < GC.PANLE_H / GC.GRID_H - 1) {
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
    //扫描是否有生命死亡;
    LiftDeathScan: function () {
        for (var x = 0; x < GC.PANLE_W / GC.GRID_W; x++) {
            for (var y = 0; y < GC.PANLE_H / GC.GRID_H; y++) {
                if (x > 0 && x < GC.PANLE_W / GC.GRID_W - 1 && y > 0 && y < GC.PANLE_H / GC.GRID_H - 1) {
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

    //添加鼠标点击操作;
    addMouse: function () {
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    var target = event.getCurrentTarget();
                    var pos = event.getLocation();
                    cc.log("x,y=" + Math.floor(pos.x / GC.GRID_W) + Math.floor(pos.y / GC.GRID_H));
                    if (target._score < GC.GOD_COUNT) {//如果步数未走完;
                        //取消;
                        if (target._mainArr[Math.floor(pos.x / GC.GRID_W)][Math.floor(pos.y / GC.GRID_H)] == 0) {
                            target._mainArr[Math.floor(pos.x / GC.GRID_W)][Math.floor(pos.y / GC.GRID_H)] = 1;
                        } else {
                            target._mainArr[Math.floor(pos.x / GC.GRID_W)][Math.floor(pos.y / GC.GRID_H)] = 0;
                        }
                    } else {
                        cc.log("您步数已满");
                        //this.addChild(Score, 0, this._cell_tag - 2);
                        // target.getChildByTag(this._cell_tag - 2).setFontSize(60);
                    }
                    target.creatCellByaArr(target._mainArr);
                }
            }, this);
        } else {
            cc.log("MOUSE Not supported");
        }
    },

    //添加鼠标点击操作;
    addTouch: function () {
        if ('mouse' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().processEvent(event);
                }
            }, this);

        if (cc.sys.capabilities.hasOwnProperty('touches'))
            cc.eventManager.addListener({
                prevTouchId: -1,
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan: function (touches, event) {
                    var touch = touches[0];
                    event.getCurrentTarget().processEvent(touches[0]);
                }
            }, this);
    },
    processEvent: function (event) {
        var pos = event.getLocation();

        if (pos.x > this._start_x_panle &&
            pos.x < this._start_x_panle + GC.PANLE_W &&
            pos.y > this._start_y_panle &&
            pos.y < this._start_y_panle + GC.PANLE_H) {//判断是否在培养皿内；
            if (this._mainArr[Math.floor((pos.x - this._start_x_panle) / GC.GRID_W)][Math.floor((pos.y - this._start_y_panle) / GC.GRID_H)] == 0) {
                this._mainArr[Math.floor((pos.x - this._start_x_panle) / GC.GRID_W)][Math.floor((pos.y - this._start_y_panle) / GC.GRID_H)] = 1;
            } else {
                this._mainArr[Math.floor((pos.x - this._start_x_panle) / GC.GRID_W)][Math.floor((pos.y - this._start_y_panle) / GC.GRID_H)] = 0;
            }

            this.creatCellByaArr(this._mainArr);

        } else {
            cc.log("点出边界");
        }

    }
});
SMLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new SMLayer();
    scene.addChild(layer);
    return scene;
};

