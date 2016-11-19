class TalkPanel extends egret.DisplayObjectContainer {
    
    ownNpc:Npc;
    private panelBitmap = this.createBitmapByName("missionblank_png");
    private exit = this.createBitmapByName("missionblank_exit_png");
    private taskName = this.createText(60,40,25);
    private taskDesc = this.createText(60,70,25);
    private taskButton:egret.Bitmap = new egret.Bitmap();

    public constructor() {
        super();
        this.createtaskBlank();
    }

    private createtaskBlank() {
        this.addChild(this.panelBitmap);

        this.exit.x = 447;
        this.exit.touchEnabled = true;
        this.exit.addEventListener( egret.TouchEvent.TOUCH_TAP,this.moveDown,this); 
        this.addChild(this.exit);

        this.addChild(this.taskButton);
        
        this.taskName.width = 350;
        this.addChild(this.taskName);
        this.taskDesc.width = 350;
        this.addChild(this.taskDesc);
    }

    setTaskIn(task:Task,str:TaskRelate) {
        this.taskName.text = task.name;
        this.taskDesc.text = task.desc
        this.removeChild(this.taskButton);
        if((str == 0 || str == 2) && task.status == 1) {
            this.taskButton = this.createBitmapByName("button_accept_png");
            this.addChild(this.taskButton);
            this.taskButton.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=> {
                this.ownNpc.taskService.accept(task.id);
                this.moveDown();
            },this);
        }else if((str == 1 || str == 2) && task.status == 3) {
            this.taskButton = this.createBitmapByName("button_finish_png");
            this.addChild(this.taskButton);
            this.taskButton.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=> {
                this.ownNpc.taskService.finish(task.id);
                this.moveDown();
            },this);
        }else {
            this.taskButton = new egret.Bitmap();
            this.addChild(this.taskButton);
        }
        this.taskButton.x = 155;
        this.taskButton.y = 200;
        this.taskButton.touchEnabled = true;
        this.addChild(this.taskButton);
    }

    moveUp() {
        egret.Tween.get(this).to({y:800},500,egret.Ease.sineIn);
    }
    
    private moveDown() {
        egret.Tween.get(this).to({y:1136},500,egret.Ease.sineIn);
    }

//其他函数
    private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }//读入位图文件

    private createText(x:number,y:number,s:number):egret.TextField{
        var nomalText = new egret.TextField();
        nomalText.textColor = 0xffffff;     
        nomalText.bold = true;
        nomalText.fontFamily = "Microsoft YaHei";
        nomalText.x = x;
        nomalText.y = y;
        nomalText.size = s; 
        return nomalText;
    }//格式化生成文字（具有相同特点）
}