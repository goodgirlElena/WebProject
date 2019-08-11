//该文件将之前写的snake.js food.js 等等文件 整合在一起
//--------------------------Tools----------------------
//自调用函数传入window的目的是让变量名可以被压缩
//在老版本浏览器中undefined 可以被重新赋值 因此传入undefined的目的是防止undefined被改变
;(function(window,undefined){
	var Tools = {
	getRandom: function (min,max){
			return Math.floor((Math.random()*(max - min +1)) + min);  
		}
	}
	window.Tools = Tools;
})(window,undefined)
//--------------------------Parent----------------------
;(function(){
	function Parent(options){
		options = options || {};
		this.width = options.width || 20;
		this.height = options.height || 20;
		
	}
	window.Parent = Parent;
})()
//--------------------------Food----------------------
//所有的js文件中书写的代码，都是全局作用域

//使用自调用函数解决全局作用域，避免命名冲突
;(function(){
	var position = "absolute"
	//记录上一次创建的食物，为删除做准备
	var elements = [];
	//创建一个Food构造函数，用来创建food对象
	function Food(options)
	{
		options = options || {};
//		食物在地图中的位置
		this.x = options.x || 0;
		this.y = options.y || 0;
		
//		食物的大小
      //this.width = options.width || 20;
	  //this.height = options.height || 20;
//		借用构造函数
		Parent.call(this,options);
//		食物的颜色
		this.color = options.color || "white";
	}


	//将食物渲染到地图里面
	Food.prototype.render = function(map){
		//调用该函数之前删除之前创建的食物
		remove();
		
		//随机设置x和y值  即食物出现的位置随机
		this.x = Tools.getRandom(0,map.offsetWidth / this.width - 1) * this.width;
		this.y = Tools.getRandom(0,map.offsetHeight / this.height - 1) * this.height;		
//		this.x = Tools.getRandom(0,map.offsetWidth - this.width);  //这两个式子与上面两个式子的等价，为什么程序跑出来的效果不一样？
//		this.y = Tools.getRandom(0,map.offsetHeight - this.height);
		//动态创建食物
		var div = document.createElement("div");
		map.appendChild(div);
		//用于记录创建的食物以便以后操作（删除）
		elements.push(div);
		
		//设置食物样式
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		div.style.width = this.width + "px";
		div.style.height = this.height + "px";
		div.style.backgroundColor =  this.color;
		div.style.position = position;
	}
	
	function remove()
	{
		for(var i = elements.length - 1; i >= 0; i--)
		{
			//删除div
			elements[i].parentNode.removeChild(elements[i]);
			//删除数组中的元素
			elements.splice(i,1);
			
		}
	}

	//给window增加Food属性，让Food的构造函数可以被外部访问
	window.Food = Food;

})()

//--------------------------Snake----------------------
//创建蛇对象
//属性:
//	width 蛇节的宽度 默认20
//	height 蛇节的高度 默认20
//	body  数组   蛇的头部和身体  第一个位置是蛇头
//	direction  蛇运动的方向  默认right 可以是left top  bottom 
//方法:
//	render 把蛇渲染到map上

;(function(){
	var position = "absolute";
	var elements = [];
	function Snake(options)
	{
		options = options || {};
		
//		蛇节的大小
		//this.width = options.width || 20;
		//this.height = options.height || 20;
//		借用构造函数
		Parent.call(this,options);
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
//			this.body.push(
//				{
//					x: last.x,
//					y: last.y,
//					color: last.color
//				
//			});
//		用继承的方式来写 蛇节的增加
			var object = {};
			extend(last,object);
			this.body.push(object);
			//随机生成食物
			food.render(map);
		}
		
	}
	
	function extend(parent,child)
	{
		for(var key in parent)
		{
			if(child[key])
			{
				continue;
			}
			child[key] = parent[key];
		}
	}
	

	window.Snake = Snake;
	
})()

//--------------------------Game----------------------
;(function(){
	var that;//记录当前游戏对象
	function Game(map)
	{
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}
	
	
	Game.prototype.start = function(){
		//把蛇和食物渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		//开始游戏逻辑
		//1.让蛇移动起来
		//2.蛇碰到边缘
		runSnake();
		//3.键盘可以控制移动方向
		blindKey();
		//4.蛇吃到食物 做相应的响应
		
	}
	
	function runSnake()
	{
		var timerId = setInterval(function(){
			//让蛇走一格
			//定时器的function中this指向window
//			that.snake.move(that.food,that.map);
//			that.snake.render(that.map);
			this.snake.move(that.food,that.map);
			this.snake.render(that.map);
			//2.蛇碰到边缘
			//获取蛇头的坐标
//			var maxX = that.map.offsetWidth / that.snake.width;
//			var maxY = that.map.offsetHeight / that.snake.height;
//			var headX = that.snake.body[0].x;
//			var headY = that.snake.body[0].y;
			var maxX = this.map.offsetWidth / this.snake.width;
			var maxY = this.map.offsetHeight / this.snake.height;
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;

			if(headX < 0 || headX >= maxX || headY < 0 || headY >= maxY)
			{
				
				clearInterval(timerId);
				alert("Game Over");
			}
			
		}.bind(that),150)
	}
	
	function blindKey()
	{
//		document.onkeydown = function(){};
		document.addEventListener("keydown",function(e){
//			console.log(typeof(e.keyCode));
			//37 - left 38 - top 39 - right 40 - bottom
			switch(e.keyCode)
			{
//				case 37: that.snake.direction = 'left';break;
//				case 38: that.snake.direction = 'top';break;
//				case 39: that.snake.direction = 'right';break;
//				case 40: that.snake.direction = 'bottom';break;
				case 37: this.snake.direction = 'left';break;
				case 38: this.snake.direction = 'top';break;
				case 39: this.snake.direction = 'right';break;
				case 40: this.snake.direction = 'bottom';break;
				
			}
			
			
		}.bind(that),false);
	}
	


	
	window.Game = Game;
	
})()

//--------------------------主函数----------------------
;(function(){
	var map = document.getElementById("map");
	var game = new Game(map);
	game.start();
})()

