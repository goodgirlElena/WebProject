$(function() {
	//启动一个定时器去更换图片
	var currentPage = 1;
	var timer = setInterval(startLoop, 1000)

	function startLoop()
	{
		currentPage++;
		changePage();
	}

	function changePage() 
	{
		if(currentPage == 6) 
		{
			currentPage = 1;
		}
		else if(currentPage == 0)
		{
			currentPage = 5;
		}
		var $list = $("#list>li").eq(currentPage - 1);
		$list.addClass("current");
		//清除除当前圆点以外的圆点的背景色
		$list.siblings().removeClass("current");
		var $pic = $("#pic>li").eq(currentPage - 1);
		$pic.addClass("show");
		//隐藏除当前图片的其它所有图片
		$pic.siblings().removeClass("show");
	}
	
	//鼠标进入box
	$("#box").hover(function(){
		//停止定时器
		clearInterval(timer);
		$("#left,#right").addClass("bt");
//		$("#right").addClass("bt");
	},function(){
		//重启定时器
		timer = setInterval(startLoop,1000);
		$("#left,#right").removeClass("bt");
//		$("#right").removeClass("bt");
	})
	
	
	//鼠标移出左右按钮
	$("#box>div").hover(function(){
//		$(this)[0].style.backgroundColor = "rgba(0,0,0,0.6)";
		$(this).css("background-color","rgba(0,0,0,0.6)");
		
	},function(){
//		$(this)[0].style.backgroundColor = "rgba(0,0,0,0.2)";
		$(this).css("background-color","rgba(0,0,0,0.2)");
	})
	
	//点击左右按钮
	$("#left").click(function(){
		currentPage--;
		changePage();
	})
	$("#right").click(function(){
		currentPage++;
		changePage();
	})
		
	$("#list>li").mouseenter(function() {
		$(this).addClass("current");
		$(this).siblings().removeClass("current")
		var index = $(this).index();
		var $li = $("#pic>li").eq(index);
		$li.addClass("show");
		$li.siblings().removeClass("show")
	})
})
