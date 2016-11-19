var TaskService = (function () {
    function TaskService() {
        this.task001 = ["talk", "001", "Ghost's Talking", "You need to talk to the ghost!", "npc_0", "npc_1", "002", ""];
        this.task002 = ["kill", "002", "Killing Monsters", "You need to kill 10 monsters!", "npc_1", "npc_1", "", "10"];
        this.npcList = new Array();
        /*private*/ this.taskPanel = new TaskPanel();
        this.observerList = new Array();
        this.taskList = new Array();
        this.observerList.push(this.taskPanel);
        this.addTasks(this.task001, TaskStatus.ACCEPTABLE);
        this.addTasks(this.task002, TaskStatus.UNACCEPTABLE);
    }
    var d = __define,c=TaskService,p=c.prototype;
    ;
    p.finish = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITED;
                for (var j = 0; j < this.taskList.length; j++) {
                    if (this.taskList[j].id == this.taskList[i].nextTaskId) {
                        this.taskList[j].status = TaskStatus.ACCEPTABLE;
                    }
                }
                this.notify();
            }
        }
    };
    p.accept = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                if (this.taskList[i].tasktype == "talk") {
                    this.taskList[i].status = TaskStatus.CAN_SUBMIT;
                }
                else {
                    this.taskList[i].status = TaskStatus.DURING;
                }
                this.notify();
            }
        }
    };
    p.addTasks = function (str, sta) {
        var task = new Task(str, sta);
        this.taskList.push(task);
        task.taskService = this;
    };
    p.getTasks = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (id == this.taskList[i].id) {
                return this.taskList[i];
            }
        }
    };
    p.addNpc = function (npc) {
        npc.setTaskService(this);
        this.npcList.push(npc);
        this.observerList.push(npc);
        for (var i = 0; i < this.taskList.length; i++) {
            for (var j = 0; j < this.npcList.length; j++) {
                if (this.taskList[i].fromNpcId == this.npcList[j].id) {
                    this.npcList[j].addTask(this.taskList[i]);
                }
                if (this.taskList[i].toNpcId == this.npcList[j].id) {
                    this.npcList[j].addTask(this.taskList[i]);
                }
            }
        }
        this.notify();
    };
    p.notify = function () {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].status != TaskStatus.UNACCEPTABLE) {
                for (var j = 0; j < this.observerList.length; j++) {
                    this.observerList[j].onChange(this.taskList[i]);
                }
            }
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map