// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlMapItemManager extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    nodePos:cc.Vec2;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    // this.node 是需要移动的节点
    onLoad () {
        //节点初始位置,每次触摸结束更新
        this.nodePos = this.node.getPosition();
        //触摸监听(this.node.parent是屏幕)
        //想达到按住节点，节点才能移动的效果，将监听函数注册到 this.node 上，去掉  .parent 即可
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    //触摸移动；
    onTouchMove (event) {
        var self = this;
        var touches = event.getTouches();
        //触摸刚开始的位置
        var oldPos = self.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        //触摸时不断变更的位置
        var newPos = self.node.parent.convertToNodeSpaceAR(touches[0].getLocation());
        
        //var subPos = cc.pSub(oldPos,newPos); 1.X版本是cc.pSub

        var subPos = oldPos.sub(newPos); // 2.X版本是 p1.sub(p2);

        self.node.x = self.nodePos.x - subPos.x;
        self.node.y = self.nodePos.y - subPos.y;
        
        // 控制节点移不出屏幕; 
        var minX = -self.node.parent.width/2 + self.node.width/2; //最小X坐标；
        var maxX = Math.abs(minX);
        var minY = -self.node.parent.height/2 + self.node.height/2; //最小Y坐标；
        var maxY = Math.abs(minY);
        var nPos = self.node.getPosition(); //节点实时坐标；

        if (nPos.x < minX) {
            nPos.x = minX;
        };
        if (nPos.x > maxX) {
            nPos.x = maxX;
        };
        if (nPos.y < minY) {
            nPos.y = minY;
        };
        if (nPos.y > maxY) {
            nPos.y = maxY;
        };
        self.node.setPosition(nPos);
    }
    onTouchEnd () {
        this.nodePos = this.node.getPosition(); //获取触摸结束之后的node坐标；
    }
    onTouchCancel() {
        this.nodePos = this.node.getPosition(); //获取触摸结束之后的node坐标；


    }
}
