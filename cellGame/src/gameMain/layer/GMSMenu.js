/**
 * Created by Administrator on 2014/9/30.
 */


var GMSenuLayer = cc.Layer.extend({

    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,

    ctor:function () {
        this._super();

        this.init();
    },
    init:function () {

        var playAgainNormal = new cc.Sprite(res.menu1_png, cc.rect(0, 0, 125, 32));
        var playAgainSelected = new cc.Sprite(res.menu1_png, cc.rect(0, 0, 125, 32));
        var playAgainDisabled = new cc.Sprite(res.menu1_png, cc.rect(0, 0, 125, 32));

        var playAgain = new cc.MenuItemSprite(
            playAgainNormal, playAgainSelected, playAgainDisabled,
            this.onPlayAgain,this);

        var menu = new cc.Menu(playAgain);
        this.addChild(menu, 1, 2);
        menu.x = GC.w_2;
        menu.y = GC.h_2;

        var b1 = new cc.LabelTTF("普通模式","Arial",20);

        var b2 = new cc.LabelTTF("无限模式","Arial",20);
        var b3 = new cc.LabelTTF("设置","Arial",20);
        var b4 = new cc.LabelTTF("帮助","Arial",20);
        var menu1 = new cc.MenuItemLabel(b1,function(){
            cc.log("普通模式");
        });
        var menu2 = new cc.MenuItemLabel(b2,function(){
            cc.log("无限模式");
        });
        var menu3 = new cc.MenuItemLabel(b3,function(){
            cc.log("设置");
        });
        var menu4 = new cc.MenuItemLabel(b4,function(){
            cc.log("帮助");
        });
        var cocos2dMenu = new cc.Menu(menu1,menu2,menu3,menu4);
        cocos2dMenu.alignItemsVerticallyWithPadding(10);
        cocos2dMenu.x = 160;
        cocos2dMenu.y = 80;
        this.addChild(cocos2dMenu);

    },

    onPlayAgain:function (pSender) {
        cc.log("11");
    }
});

