class Npc implements Observer {
  
    animate = new egret.DisplayObjectContainer();
    animateBitmap = new egret.Bitmap();
    emoji = new egret.Bitmap();
    taskTalk = new TalkPanel();
    
    taskDo:string; 
    id: string;
    png: string[];

    constructor(id:string,png: string[]) {
        this.id = id;
        this.png = png;
        this.animate.addChild(this.animateBitmap)
        this.getMoveDown();
        this.animate.addChild(this.emoji);
        this.animate.touchEnabled = true;
    }

    onChange(task: Task) {
        this.changeTaskStatus(task.status);
        this.taskTalk.setTaskIn(task,this.taskDo);
    }

    private changeTaskStatus(str:TaskStatus) {
        switch (str) {
            case TaskStatus.UNACCEPTABLE: this.taskUnacceptable(); break;
            case TaskStatus.ACCEPTABLE: 
                 if(this.taskDo == "from") {
                     this.taskAcceptable(); 
                 }break;
            case TaskStatus.DURING: this.taskDuring(); break;
            case TaskStatus.CAN_SUBMIT: 
                 this.noEmoji();
                 if(this.taskDo == "to") {
                     this.taskCanSubmit(); 
                 }break;
            case TaskStatus.SUBMITED: this.taskSubmited(); break;
        }
    }
    
    private noEmoji() {
        this.animate.removeChild(this.emoji);
        this.emoji = new egret.Bitmap();
        this.animate.addChild(this.emoji);
    }

    private taskUnacceptable() {
        this.noEmoji();
    }

    private taskAcceptable() {
        this.animate.removeChild(this.emoji);
        this.emoji = this.createBitmapByName("mission_acceptable_png");
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    }

    private taskDuring() {
        this.animate.removeChild(this.emoji);
        this.emoji = this.createBitmapByName("mission_ongoing_png");
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    }

    private taskCanSubmit() {
        this.animate.removeChild(this.emoji);
        this.emoji = this.createBitmapByName("mission_finish_png");
        this.emoji.x = 20;
        this.emoji.y = -50;
        this.animate.addChild(this.emoji);
    }

    private taskSubmited() {
        this.noEmoji();
    }

//NPC反应和人物面对面
    onNpcClick(characterX: number, characterY: number, rangeX: number, rangeY: number): number {
        var result: number;
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
    }

//npc动画    
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

    private getMoveUp() {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[0], this.png[1], this.png[2], this.png[3]];
        this.animateBitmap = this.createBitmapByName(this.png[0]); 
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    }

    private getMoveDown() {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[4], this.png[5], this.png[6], this.png[7]];
        this.animateBitmap = this.createBitmapByName(this.png[4]);  
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    }

    private getMoveLeft() {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[8], this.png[9], this.png[10], this.png[11]];
        this.animateBitmap = this.createBitmapByName(this.png[8]);
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    }

    private getMoveRight() {
        this.animate.removeChild(this.animateBitmap);
        var str = [this.png[12], this.png[13], this.png[14], this.png[15]];
        this.animateBitmap = this.createBitmapByName(this.png[12]);
        this.animate.addChild(this.animateBitmap);
        this.playAnimation(this.animateBitmap, str);
    }

    private animateFrame = 250

    private playAnimation(bit: egret.Bitmap, s: string[]): void {
        var t = this.animateFrame;
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