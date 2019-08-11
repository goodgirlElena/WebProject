(function(){
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
	
})();



