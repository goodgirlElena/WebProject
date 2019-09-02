var mycanvas = document.getElementById("myCanvas");
var ctx = mycanvas.getContext("2d");


//秒针刻度的制作
function hourScaleFunc()
{
	for(var i = 0; i < 60; i++)
	{
		ctx.beginPath();
		ctx.moveTo(0,-180);
		ctx.lineTo(0,-190);
		ctx.rotate(2*Math.PI/60);
		ctx.strokeStyle = "#a71";
		ctx.lineWidth = 4;
		ctx.stroke();
	}
	
}

//分针刻度的制作
function minuScaleFunc()
{
	for(var i = 0; i < 12; i++)
	{
		ctx.beginPath();
		ctx.moveTo(0,-170);
		ctx.lineTo(0,-190);
		ctx.rotate(2*Math.PI/12);
		ctx.strokeStyle = "#a71";
		ctx.lineWidth = 6;
		ctx.stroke();
	}
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "green";
	ctx.font = "25px 微软雅黑";
	for(var j = 1; j < 13; j++)
	{
		ctx.fillText(j,Math.sin(2*Math.PI/12*j)*140,Math.cos(2*Math.PI/12*j)*(-140));
	}
	
}

//表盘的制作
function biaopan()
{
	ctx.beginPath();
	ctx.arc(0,0,200,0,2*Math.PI);
	ctx.strokeStyle = "#5A5A5A";
	ctx.lineWidth = 6;
	ctx.stroke();
	hourScaleFunc();
	minuScaleFunc();
}

var now, h, m, s;

var minuRotateAngle,
	secRotateAngle,
 	hourRotateAngle;

//秒针的制作
function secFunc()
{
	secRotateAngle = 2*Math.PI/60*s;
	ctx.save();
	ctx.rotate(secRotateAngle)
	ctx.beginPath();
	ctx.moveTo(0,30);
	ctx.lineTo(0,-140);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#f00";
	ctx.stroke();
	ctx.restore();
}

//分针的制作
function minuFunc()
{
	minuRotateAngle = 2*Math.PI/60*m + secRotateAngle/60;
	ctx.save();
	ctx.rotate(minuRotateAngle);
	ctx.beginPath();
	ctx.moveTo(0,30);
	ctx.lineTo(0,-130);
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#EEB422";
	ctx.stroke();
	ctx.restore();
}

//时针的制作
function hourFunc()
{
	hourRotateAngle = 2*Math.PI/12*h + minuRotateAngle/12;
	ctx.save();
	ctx.rotate(hourRotateAngle);
	ctx.beginPath();
	ctx.moveTo(0,20);
	ctx.lineTo(0,-100);
	ctx.lineWidth = 7;
	ctx.strokeStyle = "#CDCD00";
	ctx.stroke();
	ctx.restore();
}

//表心的制作
function coreFunc()
{
	ctx.beginPath();
	ctx.arc(0,0,10,0,2*Math.PI);
	ctx.strokeStyle = "#FF0";
	ctx.stroke();
	ctx.fillStyle = "#666666";
	ctx.fill();
}

function time()
{
	secFunc();
	minuFunc();
	hourFunc();
	coreFunc();
}

(function timeRun()
{
	now = new Date();
	h = now.getHours();
	m = now.getMinutes();
	s = now.getSeconds();
	ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
	ctx.save();
	//设置画布的中心点
	ctx.translate(mycanvas.width/2,mycanvas.height/2);
	biaopan();
	time();
	ctx.restore();
	requestAnimationFrame(timeRun);
})();


