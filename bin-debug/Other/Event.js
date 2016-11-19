var GetToEvent = (function (_super) {
    __extends(GetToEvent, _super);
    function GetToEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=GetToEvent,p=c.prototype;
    //构造自定义到达目标事件
    GetToEvent.getTo = "Get";
    return GetToEvent;
}(egret.Event));
egret.registerClass(GetToEvent,'GetToEvent');
var taskAccept = (function (_super) {
    __extends(taskAccept, _super);
    function taskAccept(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=taskAccept,p=c.prototype;
    //构造自定义接受任务事件
    taskAccept.accept = "taskAccept";
    return taskAccept;
}(egret.Event));
egret.registerClass(taskAccept,'taskAccept');
var taskFinish = (function (_super) {
    __extends(taskFinish, _super);
    function taskFinish(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=taskFinish,p=c.prototype;
    //构造自定义接受任务事件
    taskFinish.finish = "taskFinish";
    return taskFinish;
}(egret.Event));
egret.registerClass(taskFinish,'taskFinish');
//# sourceMappingURL=Event.js.map