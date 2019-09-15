$(function(){
	//监听实时内容
	/*
	 body是代理对象        #tex是被代理对象
	 propertychange input  是代理事件
	 * */
	$("body").delegate("#tex","propertychange input",function(){
		//判断输入框是否有内容
		if($(this).val().length > 0)
		{
			//让按钮可用
			$("button").prop("disabled",false);
		}
		else
		{
			//让按钮不可用
			$("button").prop("disabled",true);
		}
	});
	//监听发布按钮的点击事件
	$("button").click(function(){
		//拿到用户输入的内容
		var $text = $("#tex").val();
		//根据内容创建节点
		var $weibo = creatEle($text);
		//插入微博
		$("#comment").prepend($weibo);
		$("#tex").val("");
		$(this).prop("disabled",true);
	});
	//监听顶点击事件
	$("body").delegate(".infoTop","click",function(){
		$(this).text(parseInt($(this).text()) + 1);
	})
	//监听踩点击事件
	$("body").delegate(".infoDown","click",function(){
		$(this).text(parseInt($(this).text()) + 1);
	})
	//监听删除点击事件
	$("body").delegate(".infoDel","click",function(){
		$(this).parents(".info").remove();
	})
	//创建节点的方法
	function creatEle(text)
	{
		var $weibo = $("<div class=\"info\">\n" +
						"<p class=\"infoText\">"+text+"</p>\n" +
						"<p class=\"infoOperation\">\n" +
							"<span class=\"infoTime\">"+formatTime()+"</span>\n" +
							"<span class=\"infoHandle\">\n" +
								"<a class=\"infoTop\" href=\"javascript:;\">0</a>\n" +
								"<a class=\"infoDown\" href=\"javascript:;\">0</a>\n"+
								"<a class=\"infoDel\" href=\"javascript:;\">删除</a>\n" +
						"	</span>\n" +
						"</p>\n" +
					"</div>");
		return $weibo;
	}
	//生成时间的方法
	function formatTime()
	{
		var date = new Date();
		var arr = [date.getFullYear() + "-",
		date.getMonth() + 1 + "-",
		date.getDate() + " ",
		date.getHours() + ":",
		date.getMinutes() + ":",
		date.getSeconds()
		]
		return arr.join("");
	}
})
