var Bullets = cc.Sprite.extend({
    ship: null,
    actualX: null,
    actualY: null,
    minDuration: 4.5,
    maxDuration: 6,
    rangeDuration: null,
    actualDuration: null,
    actionMoveDone: null,
    actionMove: null,
    endX: null,
    endY: null,
    layer: null,
    ctor: function (layer, x, y) {
        // this.ship = new cc.this("#E1.png");
        this._super(res.bullet);
        this.tag = this.zOrder;
        this.scale = 1;
        this.x = x;
        this.y = y;

        this.layer = layer;
    },
    shoot: function () {
        this.actionMoveDone = new cc.CallFunc(this.spriteMoveFinished, this);
        this.actionMove = cc.moveTo(2, cc.p(this.x, 500));
        this.runAction(cc.sequence(this.actionMove, this.actionMoveDone));
    },
    moveToPoint: function (endX, endY) {
        this.endX = endX;
        this.endY = endY;
        this.actionMoveDone = new cc.CallFunc(this.spriteMoveFinished, this);
        this.actionMove = cc.moveTo(2, cc.p(this.endX, this.endY));
        this.runAction(cc.sequence(this.actionMove, this.actionMoveDone));
       // this.destorySelf();
    },
    destorySelf: function () {
       // this.layer.removeChild(this);
        this._borderDetect = BorderDetect(this.layer,0,0,100,300);
        this._borderDetect.detectDeletByY(this);
        this.destroy;
    }
});
