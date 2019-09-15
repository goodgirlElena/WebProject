$(function(){
	var offset = 0;
	var timer;
	function moving()
	{
		timer = setInterval(function(){
			offset += -10;
			if(offset <= -468)
			{
				offset = 0;
			}
		$("ul").css("marginLeft",offset);
		},100);
	}
	moving();
	$("li").hover(function(){
		clearInterval(timer);
		$(this).siblings().stop().fadeTo(100,0.5);
		$(this).stop().fadeTo(100,1);
	},function(){
		moving();
		$("li").stop().fadeTo(100,1);
	})
})
