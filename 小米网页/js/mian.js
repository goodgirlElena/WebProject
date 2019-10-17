//轮播图效果制作
var images = {
	1: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1c6280fb90ad60b4a94fc43ca67485a3.jpg?thumb=1&w=1226&h=460",
	2:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bf2f06a3b16b37c83a5991838e3e4c7.jpg?thumb=1&w=1226&h=460",
	3:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e5eb22993da3755a6792f501e749fd78.jpg?w=2452&h=920",
	4:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/64070c0d2b1e6b69316c7b9fc9d3ec50.jpg?thumb=1&w=1226&h=460",
	5:"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e52c3e98602b90f198ec316dce253cba.jpg?thumb=1&w=1226&h=460"
}
var advPicBox = document.getElementById("adv-pic");
var pic = document.getElementById("pic");
var left = document.getElementById("left");
var right = document.getElementById("right");
var pictures = advPicBox.getElementsByTagName("li");
//设置第一个li为选中状态
pictures[0].style.backgroundColor = "rgba(255,242,242,.6)";
pictures[0].style.borderColor = "rgba(153,145,145,0.6)";

//启用一个定时器去更换pic中的src属性
var currentPage = 1;
var timer = setInterval(loop,3000);
function loop(){
	currentPage++;
	changePage();
}
function changePage()
{
	if(currentPage === 6)
	{
		currentPage = 1;
	}
	if(currentPage === 0)
	{
		currentPage = 5;
	}
	pic.src = images[currentPage];
	//清除所有小圆点的颜色
	for(var i = 0; i < pictures.length; i++)
	{
		pictures[i].style.backgroundColor = "rgba(153,140,140,.4)"
		pictures[i].style.borderColor = "rgba(183,174,174,.4)"
	}
	pictures[currentPage - 1].style.backgroundColor = "rgba(255,242,242,.6)";
	pictures[currentPage - 1].style.borderColor = "rgba(153,145,145,0.6)";
	
}

//鼠标进入adv-box
advPicBox.addEventListener("mouseover",overFunc,false);
function overFunc()
{
	clearInterval(timer);
}
//鼠标移出adv-box
advPicBox.addEventListener("mouseout",outFunc,false);
function outFunc()
{
	timer = setInterval(loop,3000);
}

//鼠标移入移出左右按钮
left.addEventListener("mouseover",deep,false);
right.addEventListener("mouseover",deep,false);
function deep()
{
	this.style.backgroundColor = "rgba(0,0,0,.4)";
	this.style.color = "white";
}
left.addEventListener("mouseout",light,false);
right.addEventListener("mouseout",light,false);
function light()
{
	this.style.backgroundColor = "rgba(0,0,0,0)";
	this.style.color = "#d6d2d2";
}

//鼠标点击左右按钮
left.addEventListener("click",function(){
	currentPage--;
	changePage();
},false);
right.addEventListener("click",function(){
	currentPage++;
	changePage();
},false);

//鼠标进入小圆点
for(var i = 0; i < pictures.length; i++)
{
	pictures[i].index = i + 1;
	pictures[i].addEventListener("mouseover",function(){
		currentPage = parseInt(this.index);
		changePage();
	},true)
}


//小米闪购倒计时
var timeInterval;
function countTime()
{
	var date = new Date();
	var now = date.getTime();
	//设置截止的时间
	var str = "2019/10/9 9:42:00";
	var endDate = new Date(str);
	var end = endDate.getTime();
	//时间差
	timeInterval = end - now;
	var h = 0, m = 0, s = 0;
	if(timeInterval >= 0)
	{
		h = Math.floor(timeInterval/1000/60/60%24);
		m = Math.floor(timeInterval/1000/60%60);
		s = Math.floor(timeInterval/1000%60);
	}
	if(h < 10)
	{
		document.getElementById("h").innerHTML = "0" + h;
	}
	else
	{
		document.getElementById("h").innerHTML = h;
	}
	if(m < 10)
	{
		document.getElementById("m").innerHTML = "0" + m;
	}
	else
	{
		document.getElementById("m").innerHTML = m;
	}
	if(s < 10)
	{
		document.getElementById("s").innerHTML ="0" + s;
	}
	else
	{
		document.getElementById("s").innerHTML = s;
	}
	
	if(timeInterval < 0)
	{
		clearInterval(timer);
		var actText = document.getElementById("flash").getElementsByClassName("desc");
		actText[0].innerHTML = "本场已结束";
	}
}

//$(function(){
	var timer;
	//递归每秒调用countTime方法，显示动态时间效果
	timer = setInterval(countTime,1000);
//})

