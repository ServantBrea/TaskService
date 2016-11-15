class Player {

    animate: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

    constructor() {
        this.getMoveDown();
    }

//人物动画
    private animationMode = 0;

    private setAnimationMode(n: number) {
        this.animationMode = n;
        switch (this.animationMode) {
            case 0: this.getMoveUp(); break;
            case 1: this.getMoveDown(); break;
            case 2: this.getMoveLeft(); break;
            case 3: this.getMoveRight(); break;
        }
    }

    turnOver(n: number) {
        this.setAnimationMode(n);
    }//外部使然的转向

    private frameRate = 200;

    private getMoveUp() {
        var str = ["u1_png", "u2_png", "u3_png", "u4_png", "u5_png", "u6_png"];
        var up = this.createBitmapByName("u1_png");
        this.animate.removeChildren();
        this.animate.addChild(up);
        this.playAnimation(up, str, this.frameRate);
    }

    private getMoveDown() {
        var str = ["d1_png", "d2_png", "d3_png", "d4_png", "d5_png", "d6_png"];
        var down = this.createBitmapByName("d1_png");
        this.animate.removeChildren();
        this.animate.addChild(down);
        this.playAnimation(down, str, this.frameRate);
    }

    private getMoveRight() {
        var str = ["r1_png", "r2_png", "r3_png", "r4_png", "r5_png", "r6_png"];
        var right = this.createBitmapByName("r1_png");
        this.animate.removeChildren();
        this.animate.addChild(right);
        this.playAnimation(right, str, this.frameRate);
    }

    private getMoveLeft() {
        var str = ["l1_png", "l2_png", "l3_png", "l4_png", "l5_png", "l6_png"];
        var left = this.createBitmapByName("l1_png");
        this.animate.removeChildren();
        this.animate.addChild(left);
        this.playAnimation(left, str, this.frameRate);
    }

    private playAnimation(bit: egret.Bitmap, s: string[], t: number) {
        var i = 1;
        var change: Function = function () {
            var tw = egret.Tween.get(bit);
            tw.wait(t);
            tw.call(function changetex(): void {
                bit.texture = RES.getRes(s[i]);
            }, this);
            i++;
            if (i == s.length) {
                i = 1;
            }
            tw.call(change);
        };
        change();
    }//播放帧动画

//人物移动
    private targetX: number;
    private targetY: number;
    private xMove: number;
    private yMove: number;
    private ifLeftRight = 0;
    private timeOnEnterFrame = 0;
    private speed = 0.15;//像素每毫秒

    moveTo(x: number, y: number) {
        this.targetX = x;
        this.targetY = y;
        var lengthX = this.targetX - this.animate.x;
        var lengthY = this.targetY - this.animate.y;

        if (lengthX >= 0) {
            if (lengthX >= Math.abs(lengthY)) {
                this.setAnimationMode(3);
            } else {
                if (lengthY >= 0) {
                    this.setAnimationMode(1);
                } else {
                    this.setAnimationMode(0)
                }
            }
        } else {
            if (Math.abs(lengthX) >= Math.abs(lengthY)) {
                this.setAnimationMode(2);
            } else {
                if (lengthY >= 0) {
                    this.setAnimationMode(1);
                } else {
                    this.setAnimationMode(0)
                }
            }
        }//人物朝向判断

        var pathLength = 0;
        pathLength = Math.pow(lengthX * lengthX + lengthY * lengthY, 1 / 2);
        this.xMove = lengthX / pathLength;
        this.yMove = lengthY / pathLength;//帧位移量

        this.animate.addEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
        this.timeOnEnterFrame = egret.getTimer();
    }//移动调用

    private onMove(e: egret.Event) {
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        var getToTarget: GetToEvent = new GetToEvent(GetToEvent.getTo);

        this.animate.x += this.speed * pass * this.xMove;
        this.animate.y += this.speed * pass * this.yMove;
        this.timeOnEnterFrame = egret.getTimer();

        if (this.animate.x - this.targetX < 3 && this.animate.x - this.targetX > -3 &&
            this.animate.y - this.targetY < 3 && this.animate.y - this.targetY > -3) {
            this.animate.removeEventListener(egret.Event.ENTER_FRAME, this.onMove, this);
            this.animate.dispatchEvent(getToTarget);
        }  //!!!!!!!!!!!!!!!!该停止移动方法存在可能溢出问题，根本停不下来......
    }//位移计算

//其他函数
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width * (19 / 96);
        result.anchorOffsetY = result.height * (7.5 / 96);
        return result;
    }//读入位图文件
}

