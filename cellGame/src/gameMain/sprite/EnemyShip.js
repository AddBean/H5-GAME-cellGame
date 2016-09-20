var EnemyShip = cc.Sprite.extend({

    ship: null,
    actualX: null,
    actualY: null,
    minDuration: 4.5,
    maxDuration: 6,
    rangeDuration: null,
    actualDuration: null,
    actionMoveDone: null,
    actionMove: null,
    ctor: function (x,y) {
       // this.ship = new cc.Sprite("#E1.png");
        this._super("#ship03.png");
        this.tag = this.zOrder;
        this.scale=1;
        //this.addMouse();
        //this.setPosition(cc.p(x,y));
        this.x=x;
        this.y=y;
    },
    Run:function(x,y){
        this.actualX = x;
        this.actualY = y;
        this.minDuration = 4.5;//最小持续时间；
        this.maxDuration = 6;//最大持续时间；
        this.rangeDuration = this.maxDuration - this.minDuration;//时间持续范围；
        this.actualDuration = Math.random() * this.rangeDuration + this.minDuration;//实际持续时间；
        this.actionMoveDone = new cc.CallFunc(this.spriteMoveFinished, this);//移动完成；
        this.actionMove = cc.moveTo(this.actualDuration, cc.p(this.x, this.actualY));//将持续时间、随机Y坐标封装；
        this.runAction(cc.sequence(this.actionMove, this.actionMoveDone));
    },
//    addMouse: function () {
//        if ('mouse' in cc.sys.capabilities) {
//            cc.eventManager.addListener({
//                event: cc.EventListener.MOUSE,
//                onMouseDown: function (event) {
//                    cc.log("SHIP MOUSE DOWN EVENT");
//                },
////                onMouseMove: function (event) {
////                    cc.log("SHIP MOUSE DOWN MOVE");
////                    var pos = event.getLocation();
////                    cc.log("x:"+pos.x+"y:"+pos.y);
////                   // this.setPosition(cc.p(pos.x,pos.y));
////                    super..x=pos.x;
////                    this.y=pos.y;
////                    //this.setPosition(cc.p(pos.x,pos.y));
////                },
//                onMouseUp: function (event) {
//                    cc.log("SHIP MOUSE UP EVENT");
//                }
//            }, this);
//            cc.log("ADD SHIP MOUSE");
//        } else {
//            cc.log("MOUSE Not supported");
//        }
//    },
    addTouch:function(){

    },
    //销毁自己；
    DestorySelf: function () {
        this.remove;
    }
});
