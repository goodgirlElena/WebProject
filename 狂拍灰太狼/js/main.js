$(function(){
	//监听开始按钮
	$(".start").on("click",function(){
		//隐藏开始按钮
		$(this).stop().fadeOut(100);
		//调用处理时间进度条的函数
		progressHandler();
		//随机出现灰太狼和小灰灰
		startWolfAnimation();
		
	})
	
	//监听重新开始按钮
	$(".restart>button").click(function(){
		$(".restart").stop().fadeOut(100);
		//调用处理时间进度条的函数
		progressHandler();
		startWolfAnimation();
	})
	//定义一个函数用来处理时间进度条
	function progressHandler()
	{
		$(".progress").css({
			width: 180
		});
		var timer = setInterval(function(){
			var proWidth = $(".progress").width();
			proWidth -= 2;
			$(".progress").css({
				width: proWidth
			});
			//游戏时间结束后显示重新开始游戏界面
			if(proWidth <= 0)
			{
				clearInterval(timer);
				$(".restart").stop().fadeIn(100);
				//关闭动画
				stopWolfAnimation();
			}
		},100);
	}
	var wolftimer;//定义一个变量用来存放动画定时器返回的ID
	//定一个函数用来随机生成灰太狼、小灰灰动画
	function startWolfAnimation()
	{
		// 1、分别用两个数组来存放灰太狼和小灰灰的图片
		var wolfD = ['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png',
					 './images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
					 
		var wolfS = ['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png',
					 './images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
		// 2、定义一个数组用来存放狼出现的位置
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
		// 3、创建一张图片
		var $wolf = $("<img src='' class = 'wolf' >");
		// 4、随机获取图片出现的位置
		var pos = Math.floor(Math.random()*9);
		$wolf.css({
			position: "absolute",
			left: posIndex[pos].left,
			top: posIndex[pos].top
		})
		// 5、随机决定是出现小灰灰还是灰太狼
		var wolfType = Math.random() > 0.5 ? wolfD : wolfS;
		window.wolfIndex = 0;
		window.wolfIndexEnd = 5;
		wolftimer = setInterval(function(){
			if(wolfIndex > wolfIndexEnd)
			{
				$wolf.remove();
				clearInterval(wolftimer);
				startWolfAnimation();
			}
			$wolf.attr("src",wolfType[wolfIndex]);
			wolfIndex++;
		},150);
		// 6、将图片添加到页面上
		$(".container").append($wolf);
		// 7、调用处理游戏规则的方法
		gameRules($wolf);
	}
	
	//关闭小灰灰、灰太狼生成动画
	function stopWolfAnimation()
	{
		clearInterval(wolftimer);
		$(".wolf").remove();
	}
	
	//游戏规则
	function gameRules(arg)
	{
		//为wolf图片添加一次性点击事件
		$(arg).one("click",function(){
			//修改wolf图片的索引
			wolfIndex = 5;
			wolfIndexEnd = 9;
			var $src = $(this).attr("src");
			//判断图片是否为灰太狼
			var flag = $src.indexOf("h") >= 0;
			if(flag)
			{
				$(".score").text(parseInt($(".score").text()) + 10);
			}
			else
			{
				$(".score").text(parseInt($(".score").text()) - 10);
			}
		});
	}
})
