var TaskService = (function () {
    function TaskService() {
        this.task001 = ["001", "Ghost's Talking", "You need to talk to the ghost!", "npc_0", "npc_1"];
        this.npcPng001 = [
            "n1u1_png", "n1u2_png", "n1u3_png", "n1u4_png",
            "n1d1_png", "n1d2_png", "n1d3_png", "n1d4_png",
            "n1l1_png", "n1l2_png", "n1l3_png", "n1l4_png",
            "n1r1_png", "n1r2_png", "n1r3_png", "n1r4_png",];
        this.npcPng002 = [
            "n2u1_png", "n2u2_png", "n2u3_png", "n2u4_png",
            "n2d1_png", "n2d2_png", "n2d3_png", "n2d4_png",
            "n2l1_png", "n2l2_png", "n2l3_png", "n2l4_png",
            "n2r1_png", "n2r2_png", "n2r3_png", "n2r4_png",];
        this.npcList = new Array();
        this.taskPanel = new TaskPanel();
        this.observerList = new Array();
        this.taskList = new Array();
        var npc_0 = new Npc("npc_0", this.npcPng001);
        var npc_1 = new Npc("npc_1", this.npcPng002);
        this.npcList.push(npc_0);
        this.npcList.push(npc_1);
        this.observerList.push(npc_0);
        this.observerList.push(npc_1);
        this.observerList.push(this.taskPanel);
        this.taskList.push(new Task(this.task001, TaskStatus.ACCEPTABLE));
        for (var i = 0; i < this.taskList.length; i++) {
            for (var j = 0; j < this.npcList.length; j++) {
                if (this.taskList[i].fromNpcId == this.npcList[j].id) {
                    this.npcList[j].taskDo = "from";
                }
                if (this.taskList[i].toNpcId == this.npcList[j].id) {
                    this.npcList[j].taskDo = "to";
                }
            }
        }
        this.notify();
        this.npcList[0].taskTalk.addEventListener(taskAccept.accept, this.accept, this);
        this.npcList[1].taskTalk.addEventListener(taskFinish.finish, this.finish, this);
    }
    var d = __define,c=TaskService,p=c.prototype;
    ;
    p.finish = function (id) {
        var id = "001";
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITED;
                this.notify();
            }
        }
    };
    p.accept = function (id) {
        var id = "001";
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.CAN_SUBMIT;
                this.notify();
            }
        }
    };
    p.getTaskByCustomRole = function (rulesFunction) {
        return;
    };
    p.notify = function () {
        for (var i = 0; i < this.taskList.length; i++) {
            for (var j = 0; j < this.observerList.length; j++) {
                this.observerList[j].onChange(this.taskList[i]);
            }
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map