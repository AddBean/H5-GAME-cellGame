/**
 * Created by Administrator on 2014/9/22.
 */

var GC=GC ||{};

GC.winSize=cc.size(320,480);
GC.h=GC.winSize.height;
GC.w=GC.winSize.width;
GC.w_2=GC.winSize.width/2;
GC.h_2=GC.winSize.height/2;

//keys
GC.KEYS=[];

//state
GC.STATE=0; //0关闭，1开火
GC.FILE=true;   //开火开关

GC.BulletNumber=1;  //子弹初始数量为1，每次碰撞+1，最高20个
//定义得分
GC.SCORE=0;
//定义网格宽度；
GC.GRID_W=20;
GC.GRID_H=20;
//定义进化时间；
GC.EV_TIME=1;
//定义上帝模式步骤;
GC.GOD_COUNT=15;
//培养皿显示标志；
GC.GRID_FLAG=1;
//细胞形态;
GC.CELL_FROM=0;
//培养皿大小；
GC.PANLE_W=250;
GC.PANLE_H=300;