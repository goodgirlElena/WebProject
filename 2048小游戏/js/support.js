/*
 window.screen.availWidth 返回当前屏幕宽度(空白空间) 
 window.screen.availHeight 返回当前屏幕高度(空白空间) 
 window.screen.width 返回当前屏幕宽度(分辨率值) 
 window.screen.height 返回当前屏幕高度(分辨率值) 
 window.document.body.offsetHeight; 返回当前网页高度 
 window.document.body.offsetWidth; 返回当前网页宽度
 * */
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(x,y)
{
	return cellSpace + x * (cellSpace + cellSideLength) + 'px' ;
}

function getPosLeft(x,y)
{
	return cellSpace + y * (cellSpace + cellSideLength) + 'px' ;
}

function getNumberBackgroundColor(num)
{
	switch(num)
	{
		case 2: return "#eee4da";break;
		case 4: return "#edeac8";break;
		case 8: return "#f2b179";break;
		case 16: return "#f59563";break;
		case 32: return "#f67c5f";break;
		case 64: return "#f65e3b";break;
		case 128: return "#edcf72";break;
		case 256: return "#9c0";break;
		case 512: return "#33b5e5";break;
		case 1024: return "#09c";break;
		case 2048: return "#edec61";break;
		case 4096: return "#a6c";break;
		case 8192: return "#93c";break;
		
	}
	return 'black';
}

function getNumberColor(num)
{
	if(num <= 4)
	{
		return "#776e65";
	}
	return "white";
}

function nospace()
{
	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j <4; j++)
		{
			if(board[i][j] === 0)
			{
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft(board)
{
	for(var i = 0; i < 4; i++)
	{
		for(var j = 1; j < 4; j++)
		{
			if(board[i][j] === 0 || board[i][j-1] === board[i][j] || board[i][j-1] === 0)
				return true;
		}
	}
	return false;
}

function canMoveUp(board)
{
	for(var j = 0; j < 4; j++)
	{
		for(var i = 1; i < 4; i++)
		{
			if(board[i][j] === 0 || board[i-1][j] === board[i][j] || board[i-1][j] === 0)
				return true;
		}
	}
	return false;
}

function canMoveRight(board)
{
	for(var i = 3; i >= 0; i--)
	{
		for(var j = 2; j >= 0; j--)
		{
			if(board[i][j] === 0 || board[i][j+1] === board[i][j] || board[i][j+1] === 0)
				return true;
		}
	}
	return false;
}

function canMoveDown(board)
{
	for(var j = 3; j >= 0; j--)
	{
		for(var i = 2; i >= 0; i--)
		{
			if(board[i][j] === 0 || board[i+1][j] === board[i][j] || board[i+1][j] === 0)
				return true;
		}
	}
	return false;
}

//判断一个方块移动到另一个方块位置时，它们之间是否有障碍物
function noBlockHorizontal(row,col1,col2,board)
{
	for(var i = col1 + 1; i < col2; i++)
	{
		if(board[row][i] !== 0)
			return false;
	}
	return true;
}

function noBlockVertical(col,row1,row2,board)
{
	for(var i = row1 + 1; i < row2; i++)
	{
		if(board[i][col] !== 0)
			return false;
	}
	return true;
}

function nomove()
{
	if(canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveRight(board))
	{
		return false;
	}
	return true;
}


