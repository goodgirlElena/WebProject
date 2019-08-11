window.onload = function(){
    //调用背景
   background();
    //调用飞机
    plan();
}
//背景函数
function background(){
    //创建一个div
    bgDiv = document.createElement("div");
    //命名div的id
    bgDiv.id = "bj";
    //给body里的Div添加元素
    document.body.appendChild(bgDiv);
    bgDiv.style.cssText = "overflow:hidden;position:relative;width:800px; height:100%; background:#ccc;margin:0 auto;"
}
//飞机函数
function plan(){
    let bgDiv = document.getElementById("bj");
    //创建飞机
    var myPlan = document.createElement("div");
    //给与属性
    myPlan.id = 'plan';
    myPlan.style.cssText = "z-index:999;position:absolute;background:#f00;left:360px;top:660px;width:66px;height:80px;";
    //选择飞机
    bgDiv.appendChild(myPlan);
   
    
    //鼠标操作
    bgDiv.onmousemove = function(event){
        let evt = event || window.event;
        //获取x轴坐标 鼠标指针的坐标减去对于父级左边距
        p_left = evt.clientX - bgDiv.offsetLeft;
        //获取y轴坐标
        p_top = evt.clientY - bgDiv.offsetTop;
        if(p_left < 30 ){//据左边
            p_left = 30;
        }else if( p_left >(bgDiv.offsetWidth-myPlan.offsetWidth/2)){
            p_left = (bgDiv.offsetWidth-myPlan.offsetWidth/2);
        }
        if(p_top > 860){
            p_top = 860;
        }
        myPlan.style.left = p_left-33 +"px";
        myPlan.style.top = p_top-40 +"px";


    }
            setInterval(function(){
                zd =  new Bullet(p_left,p_top);
                zd.myBullet();
            },500)
    }
class Bullet{
    constructor(x,y){
        this.width = 10;
        this.height = 20;
        this.timer = null;
        this.a = x;
        this.b = y;
    }
    //创建子弹
    myBullet(){
        let myBullet = document.createElement("div");
        myBullet.style.cssText = "border-radius:50%;background:blue"+";position:absolute; width:"+ this.width +"px;height:"+this.height+"px;"
        bgDiv.appendChild(myBullet);
        myBullet.style.left = this.a +"px";
        let currenttop = 0;
        //速度
        this.timer = setInterval(()=>{
            currenttop+=10;
            // console.log(this.a);
            myBullet.style.top = this.b - currenttop +"px";
            if( currenttop > this.b){
                currenttop = this.b;
                myBullet.parentNode.removeChild(myBullet);
                window.clearInterval(this.timer);
            }
            ;
        },10)
       //zd = new Panduan(this.a,this.b);
       // zd.pz();

    }
}
