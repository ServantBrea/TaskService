class Pnode {
//声明构造	
	x:number;//格子x坐标
	y:number;//格子y坐标
	F:number;
	G:number;
	H:number;
	walkable:Boolean = true;
	parent:Pnode;//父节点
	costMultipier = 1;//消耗

	constructor(x:number,y:number) {
		this.x = x;
		this.y = y;
	}//构造函数
}