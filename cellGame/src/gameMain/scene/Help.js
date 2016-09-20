/**
 * Created by jd on 2014/10/13.
 */
/*帮助场景*/
var HelpLayer = cc.Layer.extend({
    _bg: null,
    ctor: function () {
        this._super();
        this.init();
    },
    /* 初始化添加游戏对象、事件监听*/
    init: function () {
        this.addBg();
        this.addHelpBg();
        this.addBackButton();
    },
    addBg: function () {
        var bg=new  GSSBGLayer();
        this.addChild(bg,0);
    },
    addHelpBg:function(){
        var bg_sp = new cc.Sprite(res.help);
        this.addChild(bg_sp);
        bg_sp.x = GC.w/2;
        bg_sp.y = GC.h/2;
        return true;
    },
    addBackButton: function () {


            var playNormal = new cc.Sprite(res.start);
            var playSelected = new cc.Sprite(res.start);
            var playDisabled = new cc.Sprite(res.start);

            var play = new cc.MenuItemSprite(
                playNormal, playSelected, playDisabled,
                function(){
                    cc.log("确定");
                    var scene = new cc.Scene();
                    scene.addChild(new GSSLayer());
                    cc.director.runScene(new cc.TransitionFade(1.2, scene));
                },this);
            var menu = new cc.Menu(play);
            menu.alignItemsVerticallyWithPadding(20);
            this.addChild(menu, 1, 1);
            menu.x = GC.w/2;
            menu.y = GC.h/4;
    }
});
HelpLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new HelpLayer();
    scene.addChild(layer);
    return scene;
};