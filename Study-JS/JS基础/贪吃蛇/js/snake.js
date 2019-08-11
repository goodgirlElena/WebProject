//创建蛇对象
//属性:
//	width 蛇节的宽度 默认20
//	height 蛇节的高度 默认20
//	body  数组   蛇的头部和身体  第一个位置是蛇头
//	direction  蛇运动的方向  默认right 可以是left top  bottom 
//方法:
//	render 把蛇渲染到map上

(function(){
	var position = "absolute";
	var elements = [];
	function Snake(options)
	{
		options = options || {};
		//蛇节的大小
		this.width = options.width || 20;
		this.height = options.height || 20;
		//蛇移动的方向
		this.direction = options.direction || "right";
		//蛇的身体（蛇节） 第一个元素是蛇头
		this.body = [
			{x: 3, y: 2, color: "red"},
			{x: 2, y: 2, color: "blue"},
			{x: 1, y: 2, color: "blue"}
		];
	}
	
	Snake.prototype.render = function(map)
	{
		//删除之前的创建的蛇节
		remove();
		//把每一个蛇节渲染到地图上
		for(var i = 0, len = this.body.length; i < len; i++)
		{
			var obj = this.body[i];
			
			var div = document.createElement("div");
			map.appendChild(div);
			
			//记录当前蛇节
			elements.push(div);
			
			
			//设置样式
			div.style.position = position;
			div.style.width = this.width + "px";
			div.style.height = this.height + "px";
			div.style.left = obj.x * this.width +"px";
			div.style.top = obj.y *this.height + "px";
			div.style.backgroundColor = obj.color;
			
		}
	}
	function remove()
	{
		for(var i = elements.length - 1; i >= 0; i--)
		{
			elements[i].parentNode.removeChild(elements[i]);
			
			elements.splice(i,1);
		}
	}
		
	//控制蛇移动的方法
	Snake.prototype.move = function(food,map)
	{
		//控制蛇身体移动 (当前蛇节 移动到上一个蛇节的位置)
		for(var i = this.body.length - 1; i > 0; i--)
		{
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
			
		}
		//控制蛇头的移动 移动方向
		var head = this.body[0];
		switch(this.direction)
		{
			case 'right': head.x += 1;break;
			case 'left': head.x -= 1;break;
			case 'top': head.y -= 1;break;
			case 'bottom': head.y += 1;break;
		}
		
		//判断食物和蛇是否相碰   4.蛇吃到食物 做相应的响应
		var headX = head.x * this.width;
		var headY = head.y *this.height;
		if(headX === food.x && headY === food.y)
		{
			//让蛇增加一节 并随机生成食物
			//获取蛇的最后一节
			var last = this.body[this.body.length - 1];
			this.body.push(
				{
					x: last.x,
					y: last.y,
					color: last.color
				
			});
			//随机生成食物
			food.render(map);
		}
		
	}
	

	window.Snake = Snake;
	
})()
	
//var map = document.getElementById("map");	
//var snake = new Snake();
//snake.render(map);
