class KillMosterDemo extends egret.DisplayObjectContainer {
    private kill:egret.Bitmap = this.createBitmapByName("killmonster_png");
	taskId = "002";
	private task:Task;

	public constructor() {
		super()
		this.addChild(this.kill);	
		this.kill.touchEnabled = true;
		this.kill.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=> {
			this.task.taskOngoing(true);
		},this); 
	}

	setTask(task:Task) {
        this.task = task;
	}

	private createBitmapByName(name: string): egret.Bitmap {
        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }//读入位图文件
}