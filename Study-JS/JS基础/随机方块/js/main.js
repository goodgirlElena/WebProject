//随机生成10个方块，随机生成颜色

//获取容器
var container = document.getElementById("container");
var arr = [];
for (var i = 0; i < 10; i++)
{
	var  r = Tools.getRandom(0,255);
	var  g = Tools.getRandom(0,255);
	var  b = Tools.getRandom(0,255);
	
	var box = new Box(container,{
		backgroundColor:"rgb(" + r + "," + g + "," + b +")"
	});
	arr.push(box);
}

//设置随机位置
setInterval(randomBox,500);
randomBox();
function randomBox()
{
	for(var i = 0; i < arr.length; i++)
	{
		var box = arr[i];
		box.random();
	}
}

