var Task = (function () {
    function Task(str, sta) {
        this.targetNumber = 0;
        this.targetNumberNeed = 0;
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
    var d = __define,c=Task,p=c.prototype;
    p.taskOngoing = function (add) {
        if (this.status == TaskStatus.DURING) {
            if (add == true) {
                this.targetNumber++;
                console.log(this.targetNumber);
                if (this.targetNumber == this.targetNumberNeed) {
                    this.status = TaskStatus.CAN_SUBMIT;
                }
                this.taskService.notify();
            }
            return this.targetNumber + " / " + this.targetNumberNeed;
        }
    };
    return Task;
}());
egret.registerClass(Task,'Task');
//# sourceMappingURL=Task.js.map