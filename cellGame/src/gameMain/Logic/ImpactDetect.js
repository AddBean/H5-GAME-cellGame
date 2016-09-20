var ImpactDetect = {
    Layer   : null,
    boxList1: null,
    boxList2: null,
    Detect: function (Layer, boxList1, boxList2) {
        this.Layer = Layer;
        this.boxList1 = boxList1;
        this.boxList2 = boxList2;
        var targets2Delete = [];
        var i;
        cc.log("test impact");
        //遍历屏幕上的每个敌机
        for (i in this.boxList1) {
            //  cc.log("test impact0");
            //获取碰撞盒子
            var target = this.boxList1[ i ];
            var targetRect = target.getBoundingBox();
            var bullets2Delete = [];
            // 对于每个敌机，遍历每个屏幕上的子弹，判断是否碰撞
            for (i in this.boxList2) {
                // cc.log("test impact1");
                var bullet = this.boxList2[ i ];
                var bulletRect = bullet.getBoundingBox();
                // 判断两个矩形是否碰撞
                if (cc.rectIntersectsRect(bulletRect, targetRect)) {
                    // 碰撞则将子弹加入待删除列表
                    bullets2Delete.push(bullet);
                    // cc.log("test impact2");
                }
            }
            // 如果待删除的子弹数组的内容大于零，说明敌机碰到了子弹，将敌机加入待删除数组
            if (bullets2Delete.length > 0) {
                targets2Delete.push(target);
            }
            this.Delete(targets2Delete, bullets2Delete);
        }
        ;
    },
    Delete: function (targets2Delete, bullets2Delete) {
        var i;
        //删除发生碰撞的mu
        for (i in targets2Delete) {
            var targets = targets2Delete[ i ];
            var index = this.boxList1.indexOf(targets);
            if (index > -1) {
                this.boxList1.splice(index, 1);
            }
            this.Layer.removeChild(targets);
        }
        //删除发生碰撞的每个子弹
        for (i in bullets2Delete) {
            var bullet = bullets2Delete[ i ];
            var index = this.boxList2.indexOf(bullet);
            if (index > -1) {
                this.boxList2.splice(index, 1);
            }
            this.Layer.removeChild(bullet);
        }
        targets2Delete = null;
        bullets2Delete = null;
    }
};