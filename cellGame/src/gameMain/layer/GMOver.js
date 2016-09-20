/**
 * Created by jd on 2014/10/13.
 */
var GMOLayer = cc.Layer.extend({

    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,
    _enterflag:0,
    _score:0,
    _msg:"无消息",
    ctor:function (enterflag,scroe,msg) {
        this._super();
        this._enterflag=enterflag;
        GC.SCORE=scroe;
        this._score=scroe;
        this._msg=msg;
        this.init();
    },
    init:function () {
    /*重新开始按钮*/
        this.addBut();
        this.addOther();
        this.addAd();//添加广告;
    },
    addBut:function(){
        //重新开始按键；

        var paNormal = new cc.Sprite(res.start_btn);
        var paSelected = new cc.Sprite(res.start_btn);
        var paDisabled = new cc.Sprite(res.start_btn);

        var pa = new cc.MenuItemSprite(
            paNormal, paSelected, paDisabled,
            function(){
                cc.log("重新进入普通模式");
                var scene = new cc.Scene();
                scene.addChild(new GMLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
            },this);

        var shNormal = new cc.Sprite(res.share_btn);
        var shSelected = new cc.Sprite(res.share_btn);
        var shDisabled = new cc.Sprite(res.share_btn);

        var sh = new cc.MenuItemSprite(
            shNormal, shSelected, shDisabled,
            function(){
                cc.log("分享");
                var _share=cc.Sprite.create(res.sharebg);
                _share.setPosition(GC.w/2,GC.h/2);
                this.addChild(_share);

                //分享统计
                var share_get = new XMLHttpRequest();
                share_get.open("GET", "http://game.yoopoon.com/fxtj.html?from=DeathWarrant");    //get到分享统计页面，from后跟游戏名
                share_get.onreadystatechange = function () {
                };
                var cell_count=GC.SCORE;
                share(cell_count,this._msg,10);
            },this);
        var menu = new cc.Menu(pa,sh);
        menu.alignItemsHorizontallyWithPadding(10);
        this.addChild(menu, 1, 2);
        menu.x = GC.w/2;
        menu.y = GC.h*3/8;

    },
    addOther:function(){
        var Msg = new cc.LabelTTF(this._msg+"", "Arail", 20);
        Msg.x = GC.w/2;
        Msg.y = GC.h/2+60;
        this.addChild(Msg);

        var Score = new cc.LabelTTF(this._score+"", "Arail", 60);
        Score.x = GC.w/2;
        Score.y = GC.h/2;
        this.addChild(Score);

    },
    onPlayAgain:function () {
        switch(this._enterflag){
            case 0:
                cc.log("重新进入普通模式");
                var scene = new cc.Scene();
                scene.addChild(new GMLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
                break;
            case 1:
                cc.log("重新进入无限模式");
                var scene = new cc.Scene();
                scene.addChild(new SMLayer());
                cc.director.runScene(new cc.TransitionFade(1.2,scene));
                break;
            case 2:
                break;
            case 3:
                break;

        }
    },
    addAd:function(){
        var adNormal = new cc.Sprite(res.AD, cc.rect(0, 0, 320, 51));
        var adSelected = new cc.Sprite(res.AD, cc.rect(0, 0, 320,51));
        var adDisabled = new cc.Sprite(res.AD, cc.rect(0, 0, 320, 51));

        var play = new cc.MenuItemSprite(
            adNormal, adSelected, adDisabled,
            this.onAd,this);
        var admenu = new cc.Menu(play);
        this.addChild(admenu, 1, 2);
        admenu.x = 160;
        admenu.y = 25;
    },
    onAd:function(){
        cc.log("点击广告");
        window.location.href="http://114.215.191.133:9002/";
    },
    onShare:function () {
        cc.log("分享");
        var _share=cc.Sprite.create(res.sharebg);
        _share.setPosition(GC.w/2,GC.h/2);
        this.addChild(_share);

        //分享统计
        var share_get = new XMLHttpRequest();
        share_get.open("GET", "http://game.yoopoon.com/fxtj.html?from=cellGame");    //get到分享统计页面，from后跟游戏名
        share_get.onreadystatechange = function () {
        };
        var cell_count=GC.SCORE;
        share(cell_count,this._msg,10);
    }
});