//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

//前面部分    
    //加载进度界面
    private loadingView: LoadingUI;
    private textfield: egret.TextField;

    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    //配置文件加载完成,开始预加载preload资源组。  
    private onConfigComplete(event: RES.ResourceEvent) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    //preload资源组加载完成
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    //资源组加载出错
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    //资源组加载出错
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }

    //preload资源组加载进度
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

// 创建游戏场景
    private createGameScene() {
        var map: CreateMap = new CreateMap();
        
        var Character = new Player();
        Character.animate.x = map.getGridX();
        Character.animate.y = map.getGridY();

        var task:TaskService = new TaskService();

        task.npcList[0].animate.x = 8 * map.getGridX();
        task.npcList[0].animate.y = 11 * map.getGridY();
        task.npcList[0].taskTalk.x = 80;
        task.npcList[0].taskTalk.y = 1136;

        task.npcList[1].animate.x = 5 * map.getGridX();
        task.npcList[1].animate.y = 5 * map.getGridY();
        task.npcList[1].taskTalk.x = 80;
        task.npcList[1].taskTalk.y = 1136;

        task.taskPanel.panel.x = 460;

        this.addChild(map);
        this.addChild(Character.animate);
        this.addChild(task.npcList[0].animate);
        this.addChild(task.npcList[0].taskTalk);
        this.addChild(task.npcList[1].animate);
        this.addChild(task.npcList[1].taskTalk);
        this.addChild(task.taskPanel.panel);       

//点击NPC事件

        task.npcList[0].animate.addEventListener(egret.TouchEvent.TOUCH_TAP, npc1Reaction, this);
        task.npcList[1].animate.addEventListener(egret.TouchEvent.TOUCH_TAP, npc2Reaction, this);

        function npc1Reaction() {
            Character.turnOver(
                task.npcList[0].onNpcClick(Character.animate.x, Character.animate.y, map.getGridX(), map.getGridY())
            );
        }

        function npc2Reaction() {
            Character.turnOver(
                task.npcList[1].onNpcClick(Character.animate.x, Character.animate.y, map.getGridX(), map.getGridY())
            );
        }
        
//移动事件
        var path: Pnode[];
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, moveEvent, this);
        function moveEvent(evt: egret.TouchEvent) {
            var i = 1;//从路径数组的第二个节点开始
            path = map.countPath(Character.animate.x, Character.animate.y, evt.localX, evt.localY);
            startMove();
            function startMove(): void {
                Character.moveTo(path[i].x * map.getGridX(), path[i].y * map.getGridY());
                Character.animate.addEventListener(GetToEvent.getTo, nextTarget, this);
                function nextTarget(evt: Event) {
                    i++;
                    if (i < path.length) {
                        startMove();
                    } else { ; }
                    Character.animate.removeEventListener(GetToEvent.getTo, nextTarget, this);//貌似这里移除监听后效果更好......
                }
            }
        }//按路径移动 
    }
}



