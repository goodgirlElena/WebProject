//自定义一个工具函数
// Math.floor()向下取整,Math.floor(45.95) = 45
(function(){
	var Tools = {
	getRandom: function (min,max){
			return Math.floor((Math.random()*(max - min +1)) + min);  
		}
	}
	window.Tools = Tools;
})()

