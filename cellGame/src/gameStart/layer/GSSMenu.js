/**
 * Created by Administrator on 2014/9/29.
 */

var GSSMenuLayer = cc.Layer.extend({

    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,

    ctor:function () {
        this._super();

        this.init();
    },
    init:function () {


        this.addMenu();

    },
    addMenu:function(){
        var play1Normal = new cc.Sprite(res.m1);
        var play1Selected = new cc.Sprite(res.m1);
        var play1Disabled = new cc.Sprite(res.m1);

        var play2Normal = new cc.Sprite(res.m2);
        var play2Selected = new cc.Sprite(res.m2);
        var play2Disabled = new cc.Sprite(res.m2);

        var play3Normal = new cc.Sprite(res.m3);
        var play3Selected = new cc.Sprite(res.m3);
        var play3Disabled = new cc.Sprite(res.m3);

        var play4Normal = new cc.Sprite(res.m4);
        var play4Selected = new cc.Sprite(res.m4);
        var play4Disabled = new cc.Sprite(res.m4);
        
        var play1 = new cc.MenuItemSprite(
            play1Normal, play1Selected, play1Disabled,
            function(){
                cc.log("普通模式");
                var scene = new cc.Scene();
                scene.addChild(new GMLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
            },this);
        var play2 = new cc.MenuItemSprite(
            play2Normal, play2Selected, play2Disabled,
            function(){
                cc.log("无限模式");
                var scene = new cc.Scene();
                scene.addChild(new SMLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
            },this);
        var play3 = new cc.MenuItemSprite(
            play3Normal, play3Selected, play3Disabled,
            function(){
                cc.log("设置");
                var scene = new cc.Scene();
                scene.addChild(new SetLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
            },this);
        var play4 = new cc.MenuItemSprite(
            play4Normal, play4Selected, play4Disabled,
            function(){
                cc.log("帮助");
                var scene = new cc.Scene();
                scene.addChild(new HelpLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
            },this);

        var menu = new cc.Menu(play1,play2,play3,play4);
        menu.alignItemsVerticallyWithPadding(20);
        this.addChild(menu, 1, 2);
        menu.x = GC.w/2;
        menu.y = GC.h/2;

    }

});

GSSMenuLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GSSMenuLayer();
    scene.addChild(layer);
    return scene;
};