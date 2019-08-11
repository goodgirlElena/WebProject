var mainScreen;
var jsBg1;
var jsBg2;
var grade = 0; //定义一个变量用来存储游戏得分情况
var allTanks; //用来获取class为tank的元素节点
var len; //用来存放获取到的class为tank的元素节点的个数
var allBullets;//用来获取class为bullet的元素节点
var bullen;//用来存放获取到的class为bullet的元素节点的个数
function main()
{
	//获取主屏幕的标签节点
	mainScreen = document.getElementById("mainScreen")
//让背景动起来
	//获取背景图的标签节点
	jsBg1 = document.getElementById("bg1");
	jsBg2 = document.getElementById("bg2");
	
	//定义一个定时器，每10ms让背景图往下移动
	var timer = setInterval(screenScroll,10);
	
	//获取飞机的标签节点
	var airplane = document.getElementById("airplane");
	
	//给飞机添加鼠标按下事件
	airplane.addEventListener("click",clickFunc,false);
	

	//发射子弹
	var timerBullet = setInterval(shoot,1000);
	
	
	
	//射击敌人
	var timerpzjc = setInterval(shootEnemy,50);
	
	
	
	//死亡检测
	var timerDie = setInterval(function(){
		allTanks = document.getElementsByClassName("tank");
		len = allTanks.length;
		allBullets = document.getElementsByClassName("bullet");
		bullen = allBullets.length;
		for(var i = 0; i < allTanks.length; i++)
		{
			//判断飞机和坦克是否碰撞，碰撞就关闭所有的定时器让所有事件都停止运行
			if(pzjcFunc(allTanks[i],airplane))
			{
				for(var j = 0; j < 100; j++)
				{
					clearInterval(j);//关闭所有的定时器
//					console.log("碰撞后屏幕中有的坦克数量" + allTanks.length)
				}
				mainScreen.removeEventListener("mousemove",mMove);//移出鼠标移动事件
				airplane.removeEventListener("click",clickFunc);//移出鼠标点击事件
				//飞机回到原来的位置
				airplane.style.left = 107 +"px";
				airplane.style.top = 380 +"px";
				//显示Restart按钮
				var Butt1 = document.getElementById("butt1");
				Butt1.style.display = "block";
				break;
			}
		}
	},50)
}

//背景滚动函数
function screenScroll()
{
	jsBg1.style.top = jsBg1.offsetTop + 1 + "px";
	jsBg2.style.top = jsBg2.offsetTop + 1 + "px";
	//当背景图超出主屏幕的高度就让它上移 -480px
	if(jsBg1.offsetTop >= 480)
	{
		jsBg1.style.top = "-480px";
	}
	if(jsBg2.offsetTop >= 480)
	{
		jsBg2.style.top = "-480px";
	}
}

function clickFunc(e)
{
	var ev = e || windows.event;
	basex = ev.pageX;
	basey = ev.pageY;
	
	movex = 0;
	movey = 0;
	//给主屏幕添加鼠标移动事件
	mainScreen.addEventListener("mousemove",mMove,false);
}
function mMove(e)
{
	var en = e || windows.event;
		movex = en.pageX - basex;
		basex = en.pageX;
		movey = en.pageY - basey;
		basey = en.pageY;
		airplane.style.left = airplane.offsetLeft + movex + "px";
		airplane.style.top = airplane.offsetTop + movey + "px";
}

//子弹发射函数
function shoot()
{
	//创建子弹
	var bullet = document.createElement("div");
	bullet.className = "bullet";
	bullet.style.left = airplane.offsetLeft + 51 + "px";
	bullet.style.top = airplane.offsetTop - 10 + "px";
	mainScreen.appendChild(bullet);
	//让子弹飞起来
	var timerBulletFly = setInterval(function(){
		bullet.style.top = bullet.offsetTop  - 10 + "px";
		//如果子弹超出主屏幕就让它消失
		if(bullet.offsetTop <= -10)
		{
			clearInterval(timerBulletFly);
			mainScreen.removeChild(bullet);	
		}
	},50)
	bullet.timer = timerBulletFly;//给bullet添加timer属性
}
//敌人
function enemy()
{
	//创建敌人
	
	var tank = document.createElement("div");
	mainScreen.appendChild(tank);
	tank.className = "tank";
	tank.style.left = randomNum(0,280) + "px";
	tank.style.top = "0 px";
	//让敌人飞起来
	var timerTankFly = setInterval(function(){
		tank.style.top = tank.offsetTop  + 10 + "px";
		
		if(tank.offsetTop >= 480)
		{
			clearInterval(timerTankFly);
			mainScreen.removeChild(tank);	
		}
	},50)
	tank.timer = timerTankFly;//给tank添加timer属性
}

//射击敌机函数
function shootEnemy()
{
	allTanks = document.getElementsByClassName("tank");
	allBullets = document.getElementsByClassName("bullet");
	for(var i = 0; i < allBullets.length; i++)
	{
		for(var j = 0; j < allTanks.length; j++)
		{
			var b = allBullets[i];
			var t = allTanks[j];
			if(pzjcFunc(b,t))
			{
				grade++;
				//此处写显示分数的代码
				var score = document.getElementById("Grade");
				score.innerText = "分数：" + grade;
				clearInterval(b.timer);
				clearInterval(t.timer);
				mainScreen.removeChild(b);
				mainScreen.removeChild(t);
				break;
			}
		}
	}
}

//碰撞检测
function pzjcFunc(obj1,obj2)
{
	var obj1left = obj1.offsetLeft;
	var obj1width = obj1.offsetWidth + obj1left;
	var obj1Top = obj1.offsetTop;
	var obj1Height = obj1Top + obj1.offsetHeight;
	
	var obj2left = obj2.offsetLeft;
	var obj2width = obj2.offsetWidth + obj2left;
	var obj2Top = obj2.offsetTop;
	var obj2Height = obj2Top + obj2.offsetHeight;
	
	if(!(obj1left > obj2width || obj1width < 
	     obj2left || obj1Top > obj2Height ||
	     obj1Height < obj2Top))
	{
		return true;
	}
	else
	{
		return false;	
	}
}



main();

//开始游戏
var startLabel = 1;
function start()
{
	var Butt1 = document.getElementById("butt1");
	Butt1.style.display = "none";
	var Butt = document.getElementById("butt");
	Butt.style.display = "none";
	if(startLabel == 1)
	{
		startLabel = 0;
		var timerTank = setInterval(enemy,1000);
	}
}

//重启游戏
function Restart()
{
//	console.log(tankArray.length);
//	console.log(bulletArray.length);
	if(allTanks)//这里的allTank值好像有问题，我的原意是如果检测到主屏幕上面有tank就进入for循环，删除屏幕上所有的tank元素，但是好像没有tank的时候还是会进入该循环
	{
		for(var i = 0; i < len; i++)
		{
			mainScreen.removeChild(allTanks[0]);
		}
	}
	if(allBullets)
	{
		for(var j = 0; j < bullen; j++)
		{
			mainScreen.removeChild(allBullets[0]);
		}
	}
	
	var Butt1 = document.getElementById("butt1");
	Butt1.style.display = "none";
	var Butt = document.getElementById("butt");
	Butt.style.display = "none";
	grade = 0;
	var score = document.getElementById("Grade");
	score.innerText = "分数：" + grade;
	main();
	var timerTank = setInterval(enemy,1000);
} 