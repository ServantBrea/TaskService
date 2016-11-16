class Task {

    id:string;
    name:string;
    desc:string;
    status:TaskStatus;
    fromNpcId:string;
    toNpcId:string;

    constructor(str:string[],sta:TaskStatus) {
        this.id = str[0];
        this.name = str[1];
        this.desc = str[2];
        this.fromNpcId = str[3];
        this.toNpcId = str[4];
        this.status = sta;    
    }
}