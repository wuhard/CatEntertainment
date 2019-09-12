import MapItem from "./MapItem";

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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    @property(cc.Prefab)
    mapBgItem: cc.Prefab ;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    public CreateMapPos(row:number,line:number,spriteWidth:number):cc.Vec2[]
    {
        var mapPos:cc.Vec2[] = []
        for(var i = 0; i < row; i++ )
        {
            for(var j = 0; j < line; j++)
            {
                var pos = new cc.Vec2((i - row * 0.5 + 0.5) * spriteWidth, (j - line * 0.5 + 0.5) * spriteWidth);
                mapPos.push(pos);

            }
        }

        return mapPos;
    }
    // update (dt) {}

    public  CreateMapSlot(pos:cc.Vec2[])
    {
        for(var i = 0; i < pos.length; i++)
        {
            var bgItem = cc.instantiate(this.mapBgItem);
            bgItem.parent = this.node;
            bgItem.position = pos[i];

        }
    }

    

    /// <summary>
    /// 创建一个方块
    /// </summary>
    /// <param name="item"></param>
    public  ProduceMapItem(item:MapItem,spriteWidth:number, startPos:cc.Vec2)
    {
        for(var i = 0; i < item.content.length; i++)
        {
            var low = i / item.lineNum;
            var line = i % item.lineNum;

            if(item.content[i] != '#')
            {
                var sp =  cc.loader.loadRes("MapItem/" + item.content[i]); 

                var bgItem = cc.instantiate(this.mapBgItem);
                bgItem.parent = this.node;
                bgItem.position  = new cc.Vec2(line * spriteWidth+startPos.x,low * spriteWidth+startPos.y);
            }
        }
    }

}
