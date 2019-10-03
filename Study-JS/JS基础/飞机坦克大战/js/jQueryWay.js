$(function(){
	var timerArr = [];//定义一个数组用来存放定时器变量
	//监听游戏开始按钮
	$(".start").click(function(event){
		var ev = event || windows.event;
		var basex = ev.pageX,
			basey = ev.pageY;
		var movex = 0,
			movey = 0;
		$(this).stop().fadeOut(100);
		$("#airplane").css({
				left: basex - $("#mainScreen").offset().left - $("#airplane").width()/2,
				top: basey - $("#mainScreen").offset().top
			})
		$("#mainScreen").mousemove(function(e){
			var en = e || windows.event;
			movex = en.pageX - basex;
			basex = en.pageX;
			movey = en.pageY - basey;
			basey = en.pageY;
			$("#airplane").css({
				left: parseInt($("#airplane").css("left")) + movex,
				top: parseInt($("#airplane").css("top")) + movey
			})
		})
		//分数清零
		$("#Grade>span").html("0");
		//让背景动起来
		gameInterface();
		//发射子弹
		shoot();
		//敌军出击
		enemyArmy();
	})
	
	//监听重新开始按钮
	$(".restart").click(function(){
		$(".over").css("display","none");
		//分数清零
		console.log($("#Grade>span").html())
		$("#Grade>span").html("0");
		//让背景动起来
		gameInterface();
		//发射子弹
		shoot();
		//敌军出击
		enemyArmy();
	})
	//处理背景图片的 函数（方法）
	function gameInterface()
	{
		var gameBoxH = 480;
		var timer = setInterval(function(){
			var $bg1Top = parseInt($("#bg1").css("top")),
				$bg2Top = parseInt($("#bg2").css("top"));
			$bg1Top++;
			$bg2Top++;
			$("#bg1").css({
				top: $bg1Top
			})
			$("#bg2").css({
				top: $bg2Top
			})
			if($bg1Top >= gameBoxH)
			{
				$("#bg1").css({
					top: -gameBoxH
				})
			}
			if($bg2Top >= gameBoxH)
			{
				$("#bg2").css({
					top: -gameBoxH
				})
			}
		},10);
		timerArr.push(timer)
	}
	
	//生产子弹的方法
	function shoot()
	{
		var bulletTimer = setInterval(function(){
			var $bulletW = 6,$bulletH = 22,$bullet;
			var top = parseInt($("#airplane").css("top")) - $bulletH / 2,
				left = parseInt($("#airplane").css("left")) + parseInt($("#airplane").css("width"))/2 - $bulletW / 2;
			$bullet = $("<img src='img/bullet.png' class='bullet' />");
//			console.log(left)
			$bullet.css({
				position: "absolute",
				top: top,
				left: left
			})
			$("#mainScreen").append($bullet);
			var btimer = setInterval(function(){
				if(parseInt($bullet.css("top")) <= -$bulletH)
				{
					clearInterval(btimer);
					$bullet.remove();
				}
				$bullet.css("top",function(index,value){
					return parseInt(value) - 10;
				});
			},13)
			timerArr.push(btimer);
		},200);
		timerArr.push(bulletTimer);
	}
	
	//敌军军队
	function enemyArmy()
	{
		var enmtimer = setInterval(function(){
			var $enmy = $("<img src='img/enemy.png' class='enemy' />")
			var pos = randomNum(2,295);
			$enmy.css({
				position: "absolute",
				top: 0,
				left: pos
			});
			var enmoveT = setInterval(function(){
				$enmy.css("top",function(index,value){
					return parseInt(value) + 10;
					if(parseInt($enmy.css("top")) >= 480)
					{
						clearInterval(enmoveT);
						$enmy.remove();
					}
				});
			},100)
			timerArr.push(enmoveT);
			$("#mainScreen").append($enmy);
		},500);
		timerArr.push(enmtimer);
		//敌军和子弹发生碰撞
		var score = 0;
		var pzBEtimer = setInterval(function(){
			window.$Enemy = $(".enemy");
			var $Bullet = $(".bullet");
			$Enemy.each(function(){
				var $E = $(this);
				$Bullet.each(function(){
					if(pzjcFunc($E,$(this)))
					{
						score++;
						$("#Grade>span").text(score);
						$E.attr("src","img/boom.png");
						setTimeout(function(){
							$E.remove();
						},300);
						$(this).remove();
						return false;
					}
				})
			})
		},50)
		timerArr.push(pzBEtimer);
		//敌军和战机发生碰撞
		var $pzEP = setInterval(function(){
			$Enemy.each(function(){
				if(pzjcFunc($(this),$("#airplane")))
				{
					$(".bullet").remove();
					$(".enemy").remove();
					$(".over .score").text(score);
					$(".over").css("display","block")
					for(let i = 0; i < timerArr.length; i++)
					{
						clearInterval(timerArr[i]);
					}
					clearInterval($pzEP);
				}
			})
		},50)
		
	}
	//碰撞检测
	function pzjcFunc(obj1,obj2)
	{
		var obj1left = parseInt(obj1.css("left"));
		var obj1width = obj1.outerWidth() + obj1left;
		var obj1Top = parseInt(obj1.css("top"));
		var obj1Height = obj1Top + obj1.outerHeight();
		var obj2left = parseInt(obj2.css("left"));
		var obj2width = obj2.outerWidth() + obj2left;
		var obj2Top = parseInt(obj2.css("top"));
		var obj2Height = obj2Top + obj2.outerHeight();
		
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
})
