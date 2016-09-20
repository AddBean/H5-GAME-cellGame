/**
 * Created by Administrator on 14-10-10.
 */
var BorderDetect = {
    x:null,
    y:null,
    w:null,
    h:null,
    layer:null,
    ctor:function(layer,x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.layer=layer;
    },
    detectDeletByX:function(obj){
        if(obj.x>x){
            this.Layer.removeChild(obj);
        }
    },
    detectDeletByY:function(obj){
        if(obj.y>y){
            this.Layer.removeChild(obj);
        }
    }
};