/**
 * Created by Administrator on 2014/9/29.
 */

var GSSBGLayer = cc.Layer.extend({

    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        var bg_sp = new cc.Sprite(res.mainbg);
        this.addChild(bg_sp);
        bg_sp.x = GC.w/2;
        bg_sp.y = GC.h/2;
        return true;
    }
});

GSSBGLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GSSBGLayer();
    scene.addChild(layer);
    return scene;
};