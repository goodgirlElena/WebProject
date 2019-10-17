var board = new Array();//用来记录方块的位置
var score = 0;
var hasConflicted = new Array();//只允许一次相同数值的叠加
//以下四个变量是用来记录手指滑动屏幕时的起始坐标和终点坐标
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(function(){
	//移动端的初始化代码
	prepareForMobile();
	//开始游戏
	newGame();
});

function prepareForMobile()
{
	if(documentWidth > 500)
	{
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	
	$("#grid-container").css('width',gridContainerWidth - 2 * cellSpace + 'px');
	$("#grid-container").css('height',gridContainerWidth - 2 * cellSpace + 'px');
	$("#grid-container").css('padding',cellSpace + 'px');
	$("#grid-container").css('border-radius',0.02 * gridContainerWidth + 'px');
	
	$(".grid-cell").css("width",cellSideLength + 'px');
	$(".grid-cell").css("height",cellSideLength + 'px');
	$(".grid-cell").css("border-radius",0.02 * cellSideLength + 'px');
}

function newGame()
{
	//初始化游戏面板
	init();
	//在随机两个格子生成数字
	creatOneNumber();
	creatOneNumber();
	
}
function init()
{
	//将各个方块放置在它们自己的位置上面
	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	//初始化方块上的值和该方块位置上叠加效果的标志符
	for(var i = 0; i < 4; i ++)
	{
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0; j < 4; j++)
		{
			board[i][j] = 0;
			hasConflicted[i][j] = false;//用来标志该位置上的数值是否可以叠加，如果为false则说明可以叠加
		}
	}
	updateBoardView();//更新游戏面板
	
	score = 0;
	updateScore(score);
}
function updateBoardView()
{
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j <  4; j++)
		{
			$("#grid-container").append('<div id="number-cell-' + i + '-' + j + '"class="number-cell"></div>');
			var theNumberCell = $("#number-cell-" + i + "-" + j);
			
			if(board[i][j] === 0)
			{
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",getPosTop(i,j) + cellSideLength/2);
				theNumberCell.css("left",getPosLeft(i,j) + cellSideLength/2);
			}
			else
			{
				theNumberCell.css("width",cellSideLength);
				theNumberCell.css("height",cellSideLength);
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	$(".number-cell").css("line-height",cellSideLength + 'px');
	$(".number-cell").css("font-size",0.6 * cellSideLength + 'px');
}
function creatOneNumber()
{
	if(nospace(board))
	{
		return false;
	}
	//随机一个位置
//	var randx = parseInt(Math.floor(Math.random() * 4));
//	var randy = parseInt(Math.floor(Math.random() * 4));
	var times = 0;
	do
	{
		var randx = parseInt(Math.floor(Math.random() * 4));
		var randy = parseInt(Math.floor(Math.random() * 4));
		if(board[randx][randy] === 0)
		{
			break;
		}
		times++;
	}while(times < 50)
	if(times === 50)
	{
		//设置50次循环为限是为了避免游戏玩到最后会有卡顿，因为如果一直检测是否有空位可以创建数字会很耗时
		//当循环到times = 50 次时如果还没有找到空位，则人为的找一个空位
		for(var i = 0; i < 4; i++)
		{
			for(var j = 0; j < 4; j++)
			{
				if(board[i][j] === 0)
				{
					randx = i;
					randy = j;
				}
				
			}
		}
	}
	//随机生成一个数字
	var randomNumber = Math.random() < 0.5 ? 2 : 4;
	//在随机位置里显示随机数字
	board[randx][randy] = randomNumber;
	showNumberWithAnimation(randx,randy,randomNumber);
	
	return true;
}
$(document).keydown(function(event){
	switch(event.keyCode)
	{
		case 37://left
			event.preventDefault();//取消按键按下时，默认的行为，即取消按键按下时，滚动滚动条行为
			if(moveLeft())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
			break;
		case 38://up
			event.preventDefault();
			if(moveUp())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
			break;
		case 39://right
			event.preventDefault();
			if(moveRight())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
			break;
		case 40://down
			event.preventDefault();
			if(moveDown())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
			break;
	}
})
//以下是手机移动端，触摸方式实现上下左右移动方块
document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	var daltax = endx - startx;
	var daltay = endy - starty;
	
	if(Math.abs(daltax) < 0.3 * documentWidth && Math.abs(daltay) < 0.3 * documentWidth)
		return;
		
	if(Math.abs(daltax) > Math.abs(daltay))
	{
		// 水平方向滑动
		if(daltax > 0)
		{
			//Move Right
			if(moveRight())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
		}
		else
		{
			//Move Left
			if(moveLeft())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
		}
	}
	else
	{
		//垂直方向移动
		if(daltay > 0)
		{
			//Move Down
			if(moveDown())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
		}
		else
		{
			//Move Up
			if(moveUp())
			{
				setTimeout(creatOneNumber,210);
				setTimeout(isgameover,300);
			}
		}
	}
});

//该事件解决了Android系统上 如果没有正确使用默认事件 即e.preventDefault，则触摸效果失效的bug，即touchstart、touchend失效
document.addEventListener("touchmove",function(event){
	event.preventDefault();
})

function isgameover()
{
	if(nospace(board) && nomove(board))
	{
		gameover();
	}
}

function gameover()
{
	alert("Game Over!")
}

function moveLeft()
{
	//flag用来标志是否找到了可以移动的元素，找到了则flag值置为1
	var flag = 0;
	if(!canMoveLeft(board))
	{
		return false;
	}
	//moveleft
	for(var i = 0; i < 4; i++)
	{
		for(var j = 1; j < 4; j++)
		{
			if(board[i][j] !== 0)
			{
				for(var k = 0; k < j; k++)
				{
					if(board[i][k] === 0 && noBlockHorizontal(i,k,j,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						flag = 1;
						continue;
					}
					else if(board[i][k] === board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][j])
					{
						//move
						//add
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//Add Score
						score += board[i][k];
						setTimeout("updateScore(score)",400);
						hasConflicted[i][k] = true;
						flag = 1;
						continue;
					}
				}
			}
		}
		
	}
	//nospace(board)条件解决了不能右移但还是产生随机数字方块的问题
	if(flag === 1 || nospace(board))
	{
		setTimeout(updateBoardView,200)
		return true;
	}
	else
	{
		return false;
	}
	
}

function moveUp()
{
	var flag = 0;
	if(!canMoveUp(board))
	{
		return false;
	}
	//moveup
	for(var j = 0; j < 4; j++)
	{
		for(var i = 1; i < 4; i++)
		{
			if(board[i][j] !== 0)
			{
				for(var k = 0; k < i; k++)
				{
					if(board[k][j] === 0 && noBlockVertical(j,k,i,board))
					{
						//move
						showMoveAnimation(i,j,k,j); 
						board[k][j] = board[i][j];
						board[i][j] = 0;
						flag = 1;
						continue;
					}
					else if(board[k][j] === board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[i][j])
					{
						//move
						//add
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//Add Score
						score += board[k][j];
						setTimeout("updateScore(score)",400);
						hasConflicted[k][j] = true;
						flag = 1;
						continue;
					}
				}
			}
		}
	}
	if(flag === 1 || nospace(board))
	{
		setTimeout(updateBoardView,200)
		return true;
	}
	else
	{
		return false;
	}
}

function moveRight()
{
	var flag = 0;
	if(!canMoveRight(board))
	{
		return false;
	}
	//moveright
	for(var i = 0; i < 4; i++)
	{
		for(var j = 2; j >= 0; j--)
		{
			if(board[i][j] !== 0)
			{
				for(var k = 3; k > j; k--)
				{
					if(board[i][k] === 0 && noBlockHorizontal(i,j,k,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						flag = 1;
						continue;
					}
					else if(board[i][k] === board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][j])
					{
						//move
						//add
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//Add Score
						score += board[i][k];
						setTimeout("updateScore(score)",400);
						hasConflicted[i][k] = true;
						flag = 1;
						continue;
					}
				}
			}
		}
	}
	if(flag === 1 || nospace(board))
	{
		setTimeout(updateBoardView,200)
		return true;
	}
	else
	{
		return false;
	}
}

function moveDown()
{
	var flag = 0;
	if(!canMoveDown(board))
	{
		return false;
	}
	//movedown
	for(var j = 0; j < 4; j++)
	{
		for(var i = 2; i >= 0; i--)
		{
			if(board[i][j] !== 0)
			{
				for(var k = 3; k > i; k--)
				{
					if(board[k][j] === 0 && noBlockVertical(j,i,k,board))
					{
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						flag = 1;
						continue;
					}
					else if(board[k][j] === board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[i][j])
					{
						//move
						//add
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//Add Score
						score += board[k][j];
						setTimeout("updateScore(score)",400);
						hasConflicted[k][j] = true;
						flag = 1;
						continue;
					}
				}
			}
		}
	}
	if(flag === 1 || nospace(board))
	{
		setTimeout(updateBoardView,200)
		return true;
	}
	else
	{
		return false;
	}
}