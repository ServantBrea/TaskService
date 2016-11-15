class TalkPanel extends egret.DisplayObjectContainer {

    private panelBitmap = this.createBitmapByName("missionblank_png");
    private exit = this.createBitmapByName("missionblank_exit_png");
    private taskText = this.createText(60,40,25);
    private taskButton:egret.Bitmap = new egret.Bitmap();

    public constructor() {
        super();
        this.createMissionBlank();
    }

    private createMissionBlank() {
        this.addChild(this.panelBitmap);

        this.exit.x = 447;
        this.exit.touchEnabled = true;
        this.exit.addEventListener( egret.TouchEvent.TOUCH_TAP,this.moveDown,this); 
        this.addChild(this.exit);

        this.addChild(this.taskButton);
        
        this.taskText.width = 350;
        this.taskText.touchEnabled = true;
        this.addChild(this.taskText);
    }

    setTaskIn(task:Task,str:string) {
        this.taskText.text = task.name + "  " + task.desc;
        this.removeChild(this.taskButton);
        if(str == "from" && task.status == TaskStatus.ACCEPTABLE) {
            this.taskButton = this.createBitmapByName("button_accept_png");
            this.addChild(this.taskButton);
            this.taskButton.addEventListener( egret.TouchEvent.TOUCH_TAP,this.taskAccept,this);
        }else if(str == "to" && task.status == TaskStatus.CAN_SUBMIT) {
            this.taskButton = this.createBitmapByName("button_finish_png");
            this.addChild(this.taskButton);
            this.taskButton.addEventListener( egret.TouchEvent.TOUCH_TAP,this.taskFinish,this);
        }else {
            this.taskButton = new egret.Bitmap();
            this.addChild(this.taskButton);
        }
        this.taskButton.x = 155;
        this.taskButton.y = 200;
        this.taskButton.touchEnabled = true;
        this.addChild(this.taskButton);
    }

    private taskAccept() {
        var acc: taskAccept = new taskAccept(taskAccept.accept);
        this.dispatchEvent(acc);
    }

    private taskFinish() {
        var fin: taskFinish = new taskFinish(taskFinish.finish);
        this.dispatchEvent(fin);
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