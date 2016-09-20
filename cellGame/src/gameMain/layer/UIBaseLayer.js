

var UIBaseLayer = cc.Layer.extend({
    _mainNode:null,
    _topDisplayText:null,
    ctor: function () {
        this._super();
        var winSize = cc.director.getWinSize();

        //add main node
        var mainNode = cc.Node.create();
        var scale = winSize.height / 320;
        mainNode.attr({anchorX: 0, anchorY: 0, scale: scale, x: (winSize.width - 480 * scale) / 2, y: (winSize.height - 320 * scale) / 2});
        this.addChild(mainNode);

        var topDisplayText = ccui.Text.create();
        topDisplayText.attr({
            string: "",
            font: "20px Arial",
            x: 240,
            y: 320-50
        });
        mainNode.addChild(topDisplayText,100);

        this._mainNode = mainNode;
        this._topDisplayText = topDisplayText;
    },
    backEvent: function (sender, type) {
        if (type == ccui.Widget.TOUCH_ENDED) {
            runGuiTestMain();
        }
    }
});