/**
 * Created by jd on 2014/10/20.
 */
/**
 * Created by jd on 2014/10/13.
 */
/*帮助场景*/
var testLayer = cc.Layer.extend({
    _bg: null,
    ctor: function () {
        this._super();
        this.init();
    },
    /* 初始化添加游戏对象、事件监听*/
    init: function () {
        this.addBg();
        this.addBackButton();
        this.addHelpText();

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
        cocos2dMenu1.x = 30;
        cocos2dMenu1.y = GC.h - 30;
        this.addChild(cocos2dMenu1, 2, 1);

    },
    addBg: function () {
        var draw = new cc.DrawNode();
        draw.drawRect(cc.p(0, 0), cc.p(GC.w,GC.h), cc.color(250, 100, 100, 150), 1, cc.color(250, 100, 100, 50));
        this.addChild(draw);
    },






    addHelpText: function () {
        // this._super();
        var root = ccs.uiReader.widgetFromJsonFile("res/pageView/ui_pageview_editor_1.json");
        var ub=new UIBaseLayer;
        ub._mainNode.addChild(root);
        this.addChild(ub);
        var back_label =ccui.helper.seekWidgetByName(root, "back");
        back_label.addTouchEventListener(ub.backEvent,ub);

        var pageView =ccui.helper.seekWidgetByName(root, "PageView_1269");
        pageView.addEventListenerPageView(ub.pageViewEvent, ub);
    },

    pageViewEvent: function (sender, type) {
        switch (type) {
            case ccui.PageView.EVENT_TURNING:
                var pageView = sender;
                this._topDisplayText.setString("page = " + (pageView.getCurPageIndex() + 1));
                break;
            default:
                break;
        }
    }
});
testLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new testLayer();
    scene.addChild(layer);
    return scene;
};