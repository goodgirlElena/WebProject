//所有的js文件中书写的代码，都是全局作用域

//使用自调用函数解决全局作用域，避免命名冲突
(function(){
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
		this.width = options.width || 20;
		this.height = options.height || 20;
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


//测试
//var map = document.getElementById("map");
// var food = new Food();
// food.render(map);