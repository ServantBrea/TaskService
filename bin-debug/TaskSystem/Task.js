var Task = (function () {
    function Task(str, sta) {
        this.id = str[0];
        this.name = str[1];
        this.desc = str[2];
        this.fromNpcId = str[3];
        this.toNpcId = str[4];
        this.status = sta;
    }
    var d = __define,c=Task,p=c.prototype;
    p.accept = function () {
    };
    return Task;
}());
egret.registerClass(Task,'Task');
//# sourceMappingURL=Task.js.map