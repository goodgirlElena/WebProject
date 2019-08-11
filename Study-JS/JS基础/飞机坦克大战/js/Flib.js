//随机数
function randomNum(min,max)
{
	return parseInt(Math.random() * (max - min + 1) + min);
}
//随机颜色
function randomColor()
{
	var r = parseInt(Math.random() * 256);
	var g = parseInt(Math.random() * 256);
	var b = parseInt(Math.random() * 256);
	
	var colorString = "rgb(" + r + "," + g + "," + b + ")";
	return colorString;
}
