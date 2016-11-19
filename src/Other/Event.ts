class GetToEvent extends egret.Event {
//构造自定义到达目标事件
    public static getTo:string = "Get";

	public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false) {
		super(type,bubbles,cancelable);
	}
}

class taskAccept extends egret.Event {
//构造自定义接受任务事件
    public static accept:string = "taskAccept";

	public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false) {
		super(type,bubbles,cancelable);
	}
}

class taskFinish extends egret.Event {
//构造自定义接受任务事件
    public static finish:string = "taskFinish";

	public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false) {
		super(type,bubbles,cancelable);
	}
}