var KillMosterDemo = (function (_super) {
    __extends(KillMosterDemo, _super);
    function KillMosterDemo() {
        var _this = this;
        _super.call(this);
        this.kill = this.createBitmapByName("killmonster_png");
        this.taskId = "002";
        this.addChild(this.kill);
        this.kill.touchEnabled = true;
        this.kill.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.task.taskOngoing(true);
        }, this);
    }
    var d = __define,c=KillMosterDemo,p=c.prototype;
    p.setTask = function (task) {
        this.task = task;
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }; //读入位图文件
    return KillMosterDemo;
}(egret.DisplayObjectContainer));
egret.registerClass(KillMosterDemo,'KillMosterDemo');
//# sourceMappingURL=KillMosterDemo.js.map