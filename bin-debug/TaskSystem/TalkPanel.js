var TalkPanel = (function (_super) {
    __extends(TalkPanel, _super);
    function TalkPanel() {
        _super.call(this);
        this.panelBitmap = this.createBitmapByName("missionblank_png");
        this.exit = this.createBitmapByName("missionblank_exit_png");
        this.taskName = this.createText(60, 40, 25);
        this.taskDesc = this.createText(60, 70, 25);
        this.taskButton = new egret.Bitmap();
        this.createtaskBlank();
    }
    var d = __define,c=TalkPanel,p=c.prototype;
    p.createtaskBlank = function () {
        this.addChild(this.panelBitmap);
        this.exit.x = 447;
        this.exit.touchEnabled = true;
        this.exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveDown, this);
        this.addChild(this.exit);
        this.addChild(this.taskButton);
        this.taskName.width = 350;
        this.addChild(this.taskName);
        this.taskDesc.width = 350;
        this.addChild(this.taskDesc);
    };
    p.setTaskIn = function (task, str) {
        var _this = this;
        this.taskName.text = task.name;
        this.taskDesc.text = task.desc;
        this.removeChild(this.taskButton);
        if ((str == 0 || str == 2) && task.status == 1) {
            this.taskButton = this.createBitmapByName("button_accept_png");
            this.addChild(this.taskButton);
            this.taskButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.ownNpc.taskService.accept(task.id);
                _this.moveDown();
            }, this);
        }
        else if ((str == 1 || str == 2) && task.status == 3) {
            this.taskButton = this.createBitmapByName("button_finish_png");
            this.addChild(this.taskButton);
            this.taskButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.ownNpc.taskService.finish(task.id);
                _this.moveDown();
            }, this);
        }
        else {
            this.taskButton = new egret.Bitmap();
            this.addChild(this.taskButton);
        }
        this.taskButton.x = 155;
        this.taskButton.y = 200;
        this.taskButton.touchEnabled = true;
        this.addChild(this.taskButton);
    };
    p.moveUp = function () {
        egret.Tween.get(this).to({ y: 800 }, 500, egret.Ease.sineIn);
    };
    p.moveDown = function () {
        egret.Tween.get(this).to({ y: 1136 }, 500, egret.Ease.sineIn);
    };
    //其他函数
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }; //读入位图文件
    p.createText = function (x, y, s) {
        var nomalText = new egret.TextField();
        nomalText.textColor = 0xffffff;
        nomalText.bold = true;
        nomalText.fontFamily = "Microsoft YaHei";
        nomalText.x = x;
        nomalText.y = y;
        nomalText.size = s;
        return nomalText;
    }; //格式化生成文字（具有相同特点）
    return TalkPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TalkPanel,'TalkPanel');
//# sourceMappingURL=TalkPanel.js.map