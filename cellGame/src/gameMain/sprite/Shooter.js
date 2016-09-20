/**
 * Created by Administrator on 2014/9/30.
 */

var Shooter = cc.Sprite.extend({
    HP: 5,
    layer: null,
    ctor: function (layer, x, y) {
        this._super("#ship03.png");
        this.tag = this.zOrder;
        this.x = x;
        this.y = y;
        this.scale = 1;
        this.layer = layer;
        this.addMouse();
        this.addTouch();
        // this.init();
    },
    init:function(){
        this.startBullet(this.x,this.y,1);
        this.reBorn;
    },
    reBorn:function(){
        this.runAction(cc.blink(5, 10));
    },
    addMouse: function () {
        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    cc.log("shoot MOUSE DOWN EVENT");
                    var x = event.getCurrentTarget().getLocX();
                    var y = event.getCurrentTarget().getLocY();
                    event.getCurrentTarget().shootBullet(x, y);
                    var batch = this.getChildByTag(1);

                    //We have a 64x64 sprite sheet with 4 different 32x32 images.  The following code is
                    //just randomly picking one of the images
                    var idx = (Math.random() > .5 ? 0 : 1);
                    var idy = (Math.random() > .5 ? 0 : 1);
                    var sprite = new cc.Sprite(batch.texture, cc.rect(32 * idx, 32 * idy, 32, 32));
                    batch.addChild(sprite);

                },
                onMouseMove: function (event) {
                    var pos = event.getLocation();
                    event.getCurrentTarget().setLoction(pos.x, pos.y);

                },
                onMouseUp: function (event) {
                    cc.log("shoot MOUSE UP EVENT");
                }
            }, this);
            cc.log("ADD shoot MOUSE");
        } else {
            cc.log("MOUSE Not supported");
        }
    },
    addTouch: function () {
        if ('touches' in cc.sys.capabilities) {
            // this is the default behavior. No need to set it explicitly.
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan: function (event) {

                },
                onTouchesMoved: function (event) {

                },
                onTouchesEnded: function (event) {

                },
                onTouchesCancelled: function (event) {

                }
            }, this);
        } else {
            cc.log("TOUCHES not supported");
        }
    },
    //开始射击；
    startBullet: function (x, y, timeout) {
        this.schedule(this.shootBullet(this.x, this.y), timeout);
        //this.schedule.cancel();
    },
    //添加子弹，并且向上移动；
    shootBullet: function (x, y) {
        cc.log("Bullet shooted");
        var Bullet = new Bullets(this.layer,x, y);
        Bullet.setTag(1);
        Bullet.moveToPoint(x,450);                   //子弹发射；
        Bullet.setTag(6);
        this.layer.addChild(Bullet, 2); //将子弹添加入父容器；
        this.layer._bullets.push(Bullet); //将子弹装入父容器数组；
    },
    setLoction: function (x, y) {
        this.x = x;
        this.y = y;
    },
    getLocX: function () {
        return this.x;
    },
    getLocY: function () {
        return this.y;
    },

    isOverBorder: function () {

    }

});