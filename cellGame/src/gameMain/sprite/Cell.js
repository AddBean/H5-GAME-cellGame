/**
 * Created by jd on 2014/10/13.
 */
var Cell = cc.Sprite.extend({
    _form: 0,
    _layer:null,
    _tag:null,
    _scale:null,
    _draw:null,
    _line_cell_count_def:GC.w/64-1,
    _cell:null,
    ctor: function (layer, x, y, form) {
        this._super();
        this.tag = this.zOrder;
        this._layer = layer;
        this._form = form;
        this._line_cell_count=GC.w/GC.GRID_W;
        var cell =this.sprite= cc.Sprite.create();
        switch(this._form) {
            case 0:
                cell= new cc.Sprite(res.cell1);
                this.addChild(cell);
                this.scale = this._line_cell_count_def/this._line_cell_count;
                break;
            case 1:
                cell= new cc.Sprite(res.cell2);
                this.addChild(cell);
                this.scale = this._line_cell_count_def/this._line_cell_count;
                break;
            case 2:
                cell= new cc.Sprite(res.cell3);
                this.addChild(cell);
                this.scale = this._line_cell_count_def/this._line_cell_count;
                break;
            case 3:
                cell.setColor(cc.color(255, 255, 255, 100));
                this.addChild(cell, 10, 1);
                break;
        }
        this.x = x+GC.GRID_W/2;
        this.y = y+GC.GRID_H/2;
    },
    onFadeIn:function(){
        //----start14----onEnter
        var delay = cc.delayTime(0.25);
        var action1 = cc.fadeIn(1.0);
        var action1Back = action1.reverse();

        var action2 = cc.fadeOut(1.0);
        var action2Back = action2.reverse();
        this.runAction(cc.sequence(action1, delay, action1Back));
        //this.runAction(cc.sequence(action2, delay.clone(), action2Back));
    }

});
