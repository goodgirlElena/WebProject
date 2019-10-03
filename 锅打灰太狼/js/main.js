$(function(){
	/**
	  * 函数功能：
	  * 参数说明：
	  */
	 
	 //监听开始游戏按钮
	$(".start").click(function(){
		$(this).stop().fadeOut(100);
		//时间进度条开始运动
		progressHandler();
		//页面随机出现灰太狼或者小灰灰
		startWolfAnimation()
	})
	
	//监听重新开始游戏按钮
	$(".restart>button").on("click",function(){
		$(".restart").stop().fadeOut(100);
		//时间进度条开始运动
		progressHandler();
		//页面随机出现灰太狼或者小灰灰
		startWolfAnimation()
	})
	
	//监听游戏规则按钮
	$(".rules").click(function(){
		$(".rule").stop().fadeIn(100);
	})
	
	//监听关闭游戏规则的按钮
	$(".close").click(function(){
		$(".rule").stop().fadeOut(100);
	})
	
	/**
 	  * 函数功能： 用来控制时间进度条
 	  * 
	  */
	function progressHandler()
	{
		$(".progress").width(180);
		var timer = setInterval(function(){
			var $width = $(".progress").width();
			$width -= 5;
			$(".progress").width($width);
			if($width <= 0)
			{
				clearInterval(timer);
				stopWolfAnimation(); //游戏结束，不再生产狼
				$(".restart").stop().fadeIn(100);
			}
		},1000)
	}
	
	/**
	  * 函数功能：生产小灰灰或灰太狼
	  * 参数说明：无
	  */
	function startWolfAnimation()
	{
		// 1、分别用两个数组来存放灰太狼和小灰灰的图片
		var wolfD = ['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png',
					 './images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
					 
		var wolfS = ['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png',
					 './images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
		// 2、定义一个数组用来存放狼可能出现的位置
		var posIndex = [
	            {left:"100px",top:"115px"},
	            {left:"20px",top:"160px"},
	            {left:"190px",top:"142px"},
	            {left:"105px",top:"193px"},
	            {left:"19px",top:"221px"},
	            {left:"202px",top:"212px"},
	            {left:"120px",top:"275px"},
	            {left:"30px",top:"295px"},
	            {left:"209px",top:"297px"}
	        ];
	    // 3、 生产一只狼
	    var $wolf = $("<img src='' class='wolf' />");
	    // 4、随机生成一个位置
	    var pos = Math.floor(Math.random()*9) ; //随机生成一个0到8的数字
	    $wolf.css({
	    	position: "absolute",
	    	left: posIndex[pos].left,
	    	top: posIndex[pos].top
	    })
	    // 5、 决定生产灰太狼还是小灰灰
	    var $wolfType = Math.random() > 0.5 ? wolfD : wolfS;
	    // 6、 设置狼来啦动画
	    window.wolfImgIndex = 0;
	    window.wolfImgIndexE = 5;
	    window.wolfTimer = setInterval(function(){
	    	if(wolfImgIndex > wolfImgIndexE)
	    	{
	    		clearInterval(wolfTimer);
	    		$wolf.remove();
	    		startWolfAnimation();
	    	}
	    	$wolf.attr("src",$wolfType[wolfImgIndex]);
	    	wolfImgIndex++;
	    },150)
    	$(".container").append($wolf);
    	gameRules($wolf);
	}
	
	/**
	  * 函数功能：停止生产小灰灰或灰太狼
	  * 参数说明：无
	  */
	function stopWolfAnimation()
	{
		clearInterval(wolfTimer);
		$(".wolf").remove();
	}
	
	/**
	  * 函数功能：制定游戏规则
	  * 参数说明：arg 游戏中被点击的对象，即小灰灰或者是灰太狼
	  * 函数说明：砸到灰太狼 得 10 分，砸到小灰灰  扣 10 分
	  */
	function gameRules(arg)
	{
		//给生产出来的狼添加一次性点击事件
		$(arg).one("click",function(){
			//改变图片当前索引和结束索引
			wolfImgIndex = 5;
			wolfImgIndexE = 9;
			//判断被点击对象是否是灰太狼
			var $src = $(this).attr("src");
			var flag = $src.indexOf("h") >= 0;
			if(flag)
			{
				//砸到灰太狼得10分
				$(".score").text(parseInt($(".score").text()) + 10);
				//增加游戏时间
				$(".progress").width(function(index,value){
					return value += 10;
				})
			}
			else
			{
				//砸到小灰灰扣10分
				$(".score").text(parseInt($(".score").text()) - 10);
				//减少游戏时间
				$(".progress").width(function(index,value){
					return value -= 10;
				})
			}
		})
	}
})
