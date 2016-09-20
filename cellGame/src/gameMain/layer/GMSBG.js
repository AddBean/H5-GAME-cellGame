/**
 * Created by Administrator on 2014/9/30.
 */

var GMSBGLayer = cc.Layer.extend({

    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        var bg_sp = new cc.Sprite(res.bg);
        this.addChild(bg_sp);
        bg_sp.x = GC.w/2;
        bg_sp.y = GC.h/2;
        return true;
    }
});
GMSBGLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GMSBGLayer();
    scene.addChild(layer);
    return scene;
};
