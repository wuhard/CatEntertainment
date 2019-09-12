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
export default class MapManager extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    public  GetCanRemovePos(posValues:number[],row:number, line:number):number[]
    {
        var canRemovePos : number[] = [];
        var removeflag = true;
        for(var i = 0; i < row; i++)
        {
            removeflag = true;
            for(var j = 0; j < line; j++)
            {
                if(posValues[i*line + j] < 0)
                {
                    removeflag = false;
                    break;
                }
            }
            if(removeflag)
            {
                for(var k = 0; k < line; k++)
                {
                    canRemovePos.push(i * line + k);
                }
            }
        }

        for (var i = 0; i < line; i++)
        {
            removeflag = true;
            for (var j = 0; j < row; j++)
            {
                if (posValues[j * line + i] < 0)
                {
                    removeflag = false;
                    break;
                }
            }
            if (removeflag)
            {
                for (var k = 0; k < row; k++)
                {
                    canRemovePos.push(k * line + i);
                }
            }
        }

        return canRemovePos;
    }



     GetNearAnchorPos(pos:cc.Vec2, mapPos:cc.Vec2[]):cc.Vec2
    {
        var nearestDis = 1000;
        var nearIndex = -1;
        for(var i = 0; i < mapPos.length; i++)
        {
            if(cc.pDistance(pos,mapPos[i]) < nearestDis)
            {
                nearIndex = i;
                nearestDis = cc.pDistance(pos, mapPos[i]);
            }
        }

        return mapPos[nearIndex];
    }
    // update (dt) {}
}
