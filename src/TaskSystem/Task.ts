class Task {

    tasktype:string;
    id:string;
    name:string;
    desc:string;
    status:TaskStatus;

    fromNpcId:string;
    toNpcId:string;
    nextTaskId:string;
    taskService:TaskService;

    targetNumber = 0;
    targetNumberNeed = 0;

    constructor(str:string[],sta:TaskStatus) {
        this.tasktype = str[0];
        this.id = str[1];
        this.name = str[2];
        this.desc = str[3];
        this.fromNpcId = str[4];
        this.toNpcId = str[5];
        this.nextTaskId = str[6];
        this.targetNumberNeed = Number(str[7]);
        this.status = sta;    
    }

    taskOngoing(add:boolean):string {
        if(this.status == TaskStatus.DURING) {
            if(add == true) {
                this.targetNumber++;
                console.log(this.targetNumber);
                if(this.targetNumber == this.targetNumberNeed) {
                    this.status = TaskStatus.CAN_SUBMIT;
                }
                this.taskService.notify();
            }
            return this.targetNumber + " / " + this.targetNumberNeed;
        }
    }
}