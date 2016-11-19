var Npc = (function () {
    //构造
    function Npc(id, png) {
        this.animate = new egret.DisplayObjectContainer();
        this.animateBitmap = new egret.Bitmap();
        this.emoji = new egret.Bitmap();
        /*private*/ this.taskTalk = new TalkPanel();
        this.taskRelate = new Array();
        this.ownTasks = new Array();
        //npc动画    
        this.animationMode = 0;
        this.animateFrame = 250;
        this.id = id;
        this.png = png;
        this.animate.addChild(this.animateBitmap);
        this.getMoveDown();
        this.animate.addChild(this.emoji);
        this.animate.touchEnabled = true;
        this.taskTalk.ownNpc = this;
    }
    var d = __define,c=Npc,p=c.prototype;
    //根据相关任务状态改变而改变
    p.onChange = function (task) {
        for (var i = 0; i < this.ownTasks.length; i++) {
            if (task.id == this.ownTasks[i].id) {
                this.changeTaskStatus(task.status, i);
                this.taskTalk.setTaskIn(task, this.taskRelate[i]);
            }
        }
    };
    //给NPC绑定相关TaskService（唯一？）
    p.setTaskService = function (taskService) {
        this.taskService = taskService;
    };
    //给NPC绑定相关任务
    p.addTask = function (task) {
        var sta;
        if (task.fromNpcId == this.id) {
            if (task.toNpcId == this.id) {
                sta = TaskRelate.BOTH;
            }
            else {
                sta = TaskRelate.PROMULGATOR;
            }
        }
        if (task.toNpcId == this.id && task.fromNpcId != this.id) {
            sta = TaskRelate.DELIVERYMAN;
        }
        this.ownTasks.push(task);
        this.taskRelate.push(sta);
    };
    //任务状态符号
    p.changeTaskStatus = function (str, i) {
        switch (str) {
            case TaskStatus.UNACCEPTABLE:
                this.taskUnacceptable();
                break;
            case TaskStatus.ACCEPTABLE:
                if (this.taskRelate[i] == 0 || this.taskRelate[i] == 2) {
                    this.taskAcceptable();
                }
                break;
            case TaskStatus.DURING:
                this.taskDuring();
                break;
            case TaskStatus.CAN_SUBMIT:
                this.noEmoji();
                if (this.taskRelate[i] == 1 || this.taskRelate[i] == 2) {
                    this.taskCanSubmit();
                }
                break;
            case TaskStatus.SUBMITED:
                this.taskSubmited();
                break;
        }
    };
    p.noEmoji = function () {
        this.animate.removeChild(this.emoji);
        this.emoji = new egret.Bitmap();
        this.animate.addChild(this.emoji);
    };
    p.taskUnacceptable = function () {
        this.noEmoji();
    };
    p.taskAcceptable = function () {
        this.animate.removeChild(this.emoji);
        this.emoji = this.createBitmapByName("mission_acceptable_png");
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    };
    p.taskDuring = function () {
        this.animate.removeChild(this.emoji);
        this.emoji = this.createBitmapByName("mission_ongoing_png");
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    };
    p.taskCanSubmit = function () {
        this.animate.removeChild(this.emoji);
        this.emoji = this.createBitmapByName("mission_finish_png");
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    };
    p.taskSubmited = function () {
        this.noEmoji();
    };
    //NPC反应和人物面对面
    p.onNpcClick = function (characterX, characterY, rangeX, rangeY) {
        var result;
        var lengthX = characterX - this.animate.x;
        var lengthY = characterY - this.animate.y;
        var pathLength = Math.pow(lengthX * lengthX + lengthY * lengthY, 1 / 2);
        if (Math.abs(pathLength) < (Math.max(rangeX, rangeY) + 5)) {
            if (lengthX > 5) {
                this.setAnimationMode(3);
                result = 2;
            }
            if (lengthX < -5) {
                this.setAnimationMode(2);
                result = 3;
            }
            if (lengthY > 5) {
                this.setAnimationMode(1);
                result = 0;
            }
            if (lengthY < -5) {
                this.setAnimationMode(0);
                result = 1;
            }
            this.taskTalk.moveUp();
            return result;
        }
    };
    p.setAnimationMode = function (n) {
        this.animationMode = n;
        switch (this.animationMode) {
            case 0:
                this.getMoveUp();
                break;
            case 1:
                this.getMoveDown();
                break;
            case 2:
                this.getMoveLeft();
                break;
            case 3:
                this.getMoveRight();
                break;
        }
    };
    p.getMoveUp = function () {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[0], this.png[1], this.png[2], this.png[3]];
        this.animateBitmap = this.createBitmapByName(this.png[0]);
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    };
    p.getMoveDown = function () {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[4], this.png[5], this.png[6], this.png[7]];
        this.animateBitmap = this.createBitmapByName(this.png[4]);
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    };
    p.getMoveLeft = function () {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[8], this.png[9], this.png[10], this.png[11]];
        this.animateBitmap = this.createBitmapByName(this.png[8]);
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    };
    p.getMoveRight = function () {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[12], this.png[13], this.png[14], this.png[15]];
        this.animateBitmap = this.createBitmapByName(this.png[12]);
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    };
    p.playAnimation = function (bit, s) {
        var t = this.animateFrame;
        var i = 1;
        var change = function () {
            var tw = egret.Tween.get(bit);
            tw.wait(t);
            tw.call(function changetex() {
                bit.texture = RES.getRes(s[i]);
            }, this);
            i++;
            if (i == s.length) {
                i = 1;
            }
            tw.call(change);
        };
        change();
    }; //播放帧动画 
    //其他函数
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width * (19 / 96);
        result.anchorOffsetY = result.height * (7.5 / 96);
        return result;
    }; //读入位图文件
    return Npc;
}());
egret.registerClass(Npc,'Npc',["Observer"]);
//# sourceMappingURL=Npc.js.map