///**************************************************************************
// * @author Yang DingPeng
// * @versions 1.0
// * Created at:2014/08/25 12:05
// * Modified at:2014/09/06 15.52
// * 定义StartLoader场景，作为游戏开始前的载入场景
// * 在project.json中jsList添加次文件即可
// *
// * Copyright (C) U-Touch_Games,YooPoon Tech.
// * All rights reserved.
// **************************************************************************/

var logoData ="../../frameworks/UTouch/res/logo.gif";
/**
 * Used to display the loading screen
 * @class
 * @extends cc.Scene
 */
UtLoader = cc.Scene.extend(/** @lends cc.LoaderScene# */{
    _logo: null,
    _logoTexture: null,
    _texture2d: null,
    _bgLayer: null,
    _label: null,
    _winSize:null,
    _processLayer: null,
    _processLayerLength: null,
    _count:0,
    cb:null,
    /**
     * Constructor
     */
    ctor: function () {
        this._super();

    },
    init:function(){
        cc.Scene.prototype.init.call(this);
        this._winSize = cc.director.getWinSize();
        //logo
        var logoHeight = 200;
        var centerPos = cc.p(this._winSize.width / 2, this._winSize.height / 2);

        this._logoTexture = new Image();
        var _this = this;
        this._logoTexture.addEventListener("load", function () {
            _this._initStage(centerPos);
        });
        this._logoTexture.src = logoData;
        this._logoTexture.width = 126;
        this._logoTexture.height = 219;

        // bg
        this._bgLayer = cc.LayerColor.create(cc.color(255, 255, 255));
        this._bgLayer.setPosition(cc.p(0, 0));


        //loading percent
        this._label = new cc.LabelTTF("世界末日倒计时100...", "microsoft yahei", 14);
        this._label.setColor(cc.color(80, 80, 80));
        //this._label.setOpacity(0);
        this._label.setPosition(cc.p(centerPos.x,centerPos.y -100));
        //this._label.setPosition(centerPos);
        this._bgLayer.addChild(this._label, 11);

        //进度条
        this._processLayerLength = 200; //长度
        this._processLayer = cc.LayerColor.create(cc.color(234, 86, 31, 255), 2, 2); //色值，透明度，起始长度，宽度
        this._processLayer.setPosition(cc.p(60,centerPos.y -50));
        this._processLayer.ignoreAnchorPointForPosition(false);
        this._processLayer.setAnchorPoint(cc.p(0, 0.5));
        this._bgLayer.addChild(this._processLayer,1);

        var processBgLayer = cc.LayerColor.create(cc.color(204,204,204), this._processLayerLength, 2); //色值，透明度，起始长度，宽度
        processBgLayer.setPosition(cc.p(60,centerPos.y -50));
        processBgLayer.ignoreAnchorPointForPosition(false);
        processBgLayer.setAnchorPoint(cc.p(0, 0.5));
        this._bgLayer.addChild(processBgLayer,0);

        this.addChild(this._bgLayer, 0);
    },

    _initStage: function (centerPos) {
        if (cc._renderType === cc.CANVAS) {
            this._logo = cc.Sprite.create(this._logoTexture);
            //this._logo = cc.Sprite.create(logoData,cc.rect(0,0,480,800));
        } else {
            this._texture2d = new cc.Texture2D();
            this._texture2d.initWithElement(this._logoTexture);
            this._texture2d.handleLoadedTexture();
            this._logo = cc.Sprite.create(this._texture2d);
            //this._logo = cc.Sprite.create(logoData,cc.rect(0,0,480,800));
        }
        this._logo.setAnchorPoint(cc.p(0.5,0.5));
        this._logo.setPosition(cc.p(centerPos.x,centerPos.y+100));
        this._bgLayer.addChild(this._logo, 10);

        this._logoFadeIn();
    },

    onEnter: function () {
        cc.Node.prototype.onEnter.call(this);
        this.schedule(this._startLoading, 0.3);
    },

    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    initWithResources: function (resources, cb) {
        if(typeof resources == "string") resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        self._length = res.length;
        self._count = 0;
        cc.loader.load(res, function(result, count){ self._count = count; }, function(){
            if(self.cb)
                self.cb();
        });
        self.schedule(self._updatePercent);
    },

    _logoFadeIn: function () {
        var logoAction = cc.spawn(
            cc.EaseBounce.create(cc.moveBy(0.25, cc.p(0, 10))),
            cc.fadeIn(0.5));

        var labelAction = cc.sequence(
            cc.delayTime(0.15),
            logoAction.clone());

        this._logo.runAction(logoAction);
        this._label.runAction(labelAction);
    },

    _updatePercent: function () {
        var self = this;
        var count = self._count;
        var length = self._length;
        var percent = (count / length * 100) | 0;
        percent = Math.min(percent, 100);
        var tmpStr = "世界末日倒计时" + (100-percent) + "...";
        self._label.setString(tmpStr);

        this._processLayer.changeWidth(this._processLayerLength * percent / 100);
//        this._processLayer.setpo

        if (percent >= 100)
            this.unschedule(this._updatePercent);
    }
});

UtLoader.preload = function (resources, selector, target) {
    if (!this._instance) {
        this._instance = new UtLoader();
        this._instance.init();
    }

    this._instance.initWithResources(resources, selector, target);

    var director = cc.director;
    if (director.getRunningScene()) {
        director.runScene(this._instance);

    } else {
        director.runScene(this._instance);
    }

    return this._instance;
};