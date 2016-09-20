/**
 * Created by jd on 2014/10/13.
 */
/**
 * Created by jd on 2014/10/13.
 */
/**
 * Created by Administrator on 2014/9/30.
 */
/*设置场景*/
var SetLayer = cc.Layer.extend({

    _cell_from_text: 0,
    _cell_from: 0,
    _cell_from_px: GC.w / 2,
    _cell_from_py: 380,
    _cell_item:null,

    _grid_flag_text: 0,
    _grid_flag: 0,
    _grid_flag_px: GC.w / 2,
    _grid_flag_py: 310,
    _grid_item:null,


    _grid_text: null,
    _grid_line_1: null,
    _grid_line_2: null,
    _grid_line_text: null,
    _grid_line_px: 50,
    _grid_line_py: 240,

    _breed_text: null,
    _breed_line_1: null,
    _breed_line_2: null,
    _breed_line_text: null,
    _breed_line_px: 50,
    _breed_line_py: 170,

    _cell_text: null,
    _cell_line_1: null,
    _cell_line_2: null,
    _cell_line_text: null,
    _cell_line_px: 50,
    _cell_line_py: 100,





    ctor: function () {
        this._super();
        this.init();
    },
    /* 初始化添加游戏对象、事件监听*/
    init: function () {

        var locChildren = this.children;
        var dstPoint = cc.p(0,0);


        this.addBg();
        this.addBackButton();

        this.addGridSet();
        this.addGridOnSet();
        this.addNumSet();
        this.addEvSet();
        this.addCellFrom();

        for(var i = 1; i < locChildren.length; i++){
            var selChild = locChildren[i];
            if(selChild){
                dstPoint.x = selChild.x-GC.w/4;
                dstPoint.y = selChild.y;
                var offset = 0|(GC.w/2 + 100);
                if( i % 2 == 0)
                    offset = -offset;

                selChild.x = dstPoint.x + offset;
                selChild.y = dstPoint.y;
                selChild.runAction(cc.moveBy(2, cc.p(dstPoint.x - offset,0)).easing(cc.easeElasticOut(0.35)));
            }
        }
        //添加事件;
        //this.addMouse();
        //his.addTouch();
    },//添加开始按钮；
    addBackButton: function () {

        var b1 = new cc.LabelTTF("返回", "Arial", 20);
        var menu1 = new cc.MenuItemLabel(b1, function () {
            cc.log("返回");
            var scene = new cc.Scene();
            scene.addChild(new GSSLayer());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        });
        var cocos2dMenu1 = new cc.Menu(menu1);
        cocos2dMenu1.alignItemsVerticallyWithPadding(10);
        cocos2dMenu1.x = GC.w/2-60;
        cocos2dMenu1.y = GC.h - 30;
        this.addChild(cocos2dMenu1, 2, 1);


    },
    //添加背景；
    addBg: function () {
//        var draw = new cc.DrawNode();
//        draw.drawRect(cc.p(0, 0), cc.p(GC.w, GC.h), cc.color(250, 100, 100, 150), 1, cc.color(250, 100, 100, 50));
//        this.addChild(draw,2,0);
        var bg=new  GMSBGLayer();
        this.addChild(bg,0);

    },
    //网格显示设置;
    addGridSet: function () {
        //细菌大小标题
        this._grid_text = new cc.LabelTTF("细菌大小", "Arial", 20);
        this._grid_text.y = this._grid_line_py + 35;
        this._grid_text.x = GC.w / 2;
        this.addChild(this._grid_text,2);

        //数字显示：
        this._grid_line_text = new cc.LabelTTF(GC.GRID_H + "*" + GC.GRID_W, "Arial", 20);
        this._grid_line_text.y = this._grid_line_py;
        //this._grid_line_text.x=this._grid_line_px+30+GC.GRID_W;
        this._grid_line_text.x = GC.w / 2;
        this.addChild(this._grid_line_text,2);
        //＋按钮；
        var line_plus = new cc.LabelTTF("+", "Arial", 30);
        var line_plus_but = new cc.MenuItemLabel(line_plus, function () {
            cc.log("++++");
            GC.GRID_W++;
            GC.GRID_H++;
            // this._grid_line_1.x++;
            this._grid_line_text.x++;
            this._grid_line_text.setString(GC.GRID_H + "*" + GC.GRID_W);

        }, this);
        var line_plus_but = new cc.Menu(line_plus_but);
        line_plus_but.x = GC.w/2+60;
        line_plus_but.y = this._grid_line_py;
        this.addChild(line_plus_but,2);

        //-按钮；
        var line_reduce = new cc.LabelTTF("-", "Arial", 30);
        var line_reduce_but = new cc.MenuItemLabel(line_reduce, function () {
            cc.log("----");
            if (GC.GRID_W > 2) {
                GC.GRID_W--;
                GC.GRID_H--;
                this._grid_line_text.x--;
                this._grid_line_text.setString(GC.GRID_H + "*" + GC.GRID_W);
            }

        }, this);
        var line_reduce_but = new cc.Menu(line_reduce_but);
        line_reduce_but.x = GC.w/2-60;
        line_reduce_but.y = this._grid_line_py;
        this.addChild(line_reduce_but,2);

    },
    onGridFlagChange: function (sender) {
            if(GC.GRID_FLAG==1){
                GC.GRID_FLAG=0;
            }else if(GC.GRID_FLAG==0){
                GC.GRID_FLAG=1;
            }
        cc.log("回调函数:"+GC.GRID_FLAG);
    },
    onCellFrom:function(){
        if(GC.CELL_FROM==0){
            GC.CELL_FROM=1;
        }else if(GC.CELL_FROM==1){
            GC.CELL_FROM=2;
        }else if(GC.CELL_FROM==2){
            GC.CELL_FROM=3;
        }else if(GC.CELL_FROM==3){
            GC.CELL_FROM=0;
        }
        cc.log("回调函数:"+GC.CELL_FROM);

    },
    //培养皿设置;
    addGridOnSet: function () {
        var grid_text = new cc.LabelTTF("培养皿分格", "Arial", 20);
        grid_text.x = this._grid_flag_px;
        grid_text.y = this._grid_flag_py +35;
        this.addChild(grid_text,2);

       //cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(20);
       this._grid_item = new cc.MenuItemToggle(
            new cc.MenuItemFont("关"),
           new cc.MenuItemFont("开"),
            this.onGridFlagChange
            , this
        );
        this._grid_item.setSelectedIndex(GC.GRID_FLAG);//初始化选择第2个；
        this._grid_item.setCallback(this.onGridFlagChange, this);
        var menu = new cc.Menu(
            this._grid_item);
        menu.x = this._grid_flag_px;
        menu.y = this._grid_flag_py;
        this.addChild(menu,2);
    },
    addCellFrom: function () {
        var cell_text = new cc.LabelTTF("细菌形态", "Arial", 20);
        cell_text.x = this._cell_from_px;
        cell_text.y = this._cell_from_py +35;
        this.addChild(cell_text,2);

        cc.MenuItemFont.setFontName("Marker Felt");
        cc.MenuItemFont.setFontSize(20);


        this._cell_item = new cc.MenuItemToggle(
            new cc.MenuItemFont("细菌1"),
            new cc.MenuItemFont("细菌2"),
            new cc.MenuItemFont("细菌3"),
            new cc.MenuItemFont("正方形"),
            this.onCellFrom
            , this
        );
        this._cell_item.setSelectedIndex(GC.CELL_FROM);//初始化选择第2个；
        this._cell_item.setCallback(this.onCellFrom, this);
        var menu = new cc.Menu(
            this._cell_item);
        menu.x = this._cell_from_px;
        menu.y = this._cell_from_py;
        this.addChild(menu,2);
    },
    //进化速度设置;
    addEvSet: function () {
        //繁殖速度大小标题
        this._breed_text = new cc.LabelTTF("繁殖速度", "Arial", 20);
        this._breed_text.y = this._breed_line_py +35;
        this._breed_text.x = GC.w / 2;
        this.addChild(this._breed_text,2);
        //画线1；
//        this._breed_line_1 = new cc.DrawNode();
//        this._breed_line_1.drawSegment(cc.p(this._breed_line_px, this._breed_line_py), cc.p(this._breed_line_px+100, this._breed_line_py), 2, cc.color(255, 100, 100, 100));
//        this.addChild(this._breed_line_1,2);
        //画线2：
        //数字显示：
        this._breed_line_text = new cc.LabelTTF(GC.EV_TIME.toFixed(1), "Arial", 20);
        this._breed_line_text.y = this._breed_line_py;
        //this._breed_line_text.x=this._breed_line_px+30+GC.EV_TIME;
        this._breed_line_text.x = GC.w / 2;
        this.addChild(this._breed_line_text,2);
        //＋按钮；
        var line_plus = new cc.LabelTTF("+", "Arial", 30);
        var line_plus_but = new cc.MenuItemLabel(line_plus, function () {
            cc.log("++++");
            GC.EV_TIME = GC.EV_TIME + 0.1;
            this._breed_line_text.x++;
            this._breed_line_text.setString(GC.EV_TIME.toFixed(1));

        }, this);
        var line_plus_but = new cc.Menu(line_plus_but);
        line_plus_but.x = GC.w/2+60;
        line_plus_but.y = this._breed_line_py;
        this.addChild(line_plus_but,2);

        //-按钮；
        var line_reduce = new cc.LabelTTF("-", "Arial", 30);
        var line_reduce_but = new cc.MenuItemLabel(line_reduce, function () {
            cc.log("----");
            if (GC.EV_TIME > 0.2) {
                GC.EV_TIME = GC.EV_TIME - 0.1;
                this._breed_line_text.x--;
                this._breed_line_text.setString(GC.EV_TIME.toFixed(1));
            }

        }, this);
        var line_reduce_but = new cc.Menu(line_reduce_but);
        line_reduce_but.x = GC.w/2-60;
        line_reduce_but.y = this._breed_line_py;
        this.addChild(line_reduce_but,2);
    },
    //开始数量设置;
    addNumSet: function () {
        //数量大小标题
        this._cell_text = new cc.LabelTTF("初始数量", "Arial", 20);
        this._cell_text.y = this._cell_line_py +35;
        this._cell_text.x = GC.w / 2;
        this.addChild(this._cell_text,2);
        //画线1；
//        this._cell_line_1 = new cc.DrawNode();
//        this._cell_line_1.drawSegment(cc.p(this._cell_line_px, this._cell_line_py), cc.p(this._cell_line_px+100, this._cell_line_py), 2, cc.color(255, 100, 100, 100));
//        this.addChild(this._cell_line_1,2);
        //画线2：
        //数字显示：
        this._cell_line_text = new cc.LabelTTF(GC.GOD_COUNT, "Arial", 20);
        this._cell_line_text.y = this._cell_line_py;
        //this._cell_line_text.x=this._cell_line_px+30+GC.GOD_COUNT;
        this._cell_line_text.x = GC.w / 2;
        this.addChild(this._cell_line_text,2);
        //＋按钮；
        var line_plus = new cc.LabelTTF("+", "Arial", 30);
        var line_plus_but = new cc.MenuItemLabel(line_plus, function () {
            cc.log("++++");
            GC.GOD_COUNT++;
            // this._cell_line_1.x++;
            this._cell_line_text.x++;
            this._cell_line_text.setString(GC.GOD_COUNT);

        }, this);
        var line_plus_but = new cc.Menu(line_plus_but);
        line_plus_but.x = GC.w/2+60;
        line_plus_but.y = this._cell_line_py;
        this.addChild(line_plus_but,2);

        //-按钮；
        var line_reduce = new cc.LabelTTF("-", "Arial", 30);
        var line_reduce_but = new cc.MenuItemLabel(line_reduce, function () {
            cc.log("----");
            if (GC.GOD_COUNT > 3) {
                GC.GOD_COUNT--;
                this._cell_line_text.x--;
                this._cell_line_text.setString(GC.GOD_COUNT);
            }


        }, this);
        var line_reduce_but = new cc.Menu(line_reduce_but);
        line_reduce_but.x = GC.w/2-60;
        line_reduce_but.y = this._cell_line_py;
        this.addChild(line_reduce_but,2);
    },
    containsTouchLocation: function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.x += this.x;
        myRect.y += this.y;
        return cc.rectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    },

    //添加鼠标点击操作;
    addTouch: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

    },
    rect: function () {
        return cc.rect(-40, -40, 40, 40);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        //if (!target.containsTouchLocation(touch)) return false;
        cc.log("onTouchBegan");
        return true;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var touchPoint = touch.getLocation();
        target._grid_line_text.x = touchPoint.x;
        cc.log("onTouchMoved");
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        cc.log("onTouchEnded");
    }
});
SetLayer.scene = function () {
    var scene = new cc.Scene();
    var SetLayer = new SMLayer();
    scene.addChild(SetLayer);
    return scene;
};

