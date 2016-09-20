/**
 * Created by Administrator on 2014/9/29.
 */
/* 创建背景图层*/
var GSSLayer = cc.Layer.extend({
    _Hero: null,
    _bg: null,
    _menu: null,
    _ship: null,
    Box: null,
    _enemy: null,
    _enemys: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        //将plist文件加入缓存
        //cc.spriteFrameCache.addSpriteFrames(res.test_plist);

        //添加背景层
        this.addBGLayer();
        //添加按钮层
        this.addMenu();

        return true;
    },

    addBGLayer:function(){
        this._bg=new GSSBGLayer();
        this._bg.x=0;
        this._bg.y=0;
        this.addChild(this._bg,0);


    },

    addMenu:function(){
        this._menu=new GSSMenuLayer();
        this.addChild(this._menu);
    }

});

    GSSLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GSSLayer();
        scene.addChild(layer,1);
        return scene;
};
