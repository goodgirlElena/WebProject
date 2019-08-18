function showNumberWithAnimation(x,y,num)
{
	var numberCell = $("#number-cell-" + x + "-" + y);
	numberCell.css('background-color',getNumberBackgroundColor(num));
	numberCell.css('color',getNumberColor(num));
	numberCell.text(num);
	
	numberCell.animate({
		width: cellSideLength + 'px',
		height: cellSideLength + 'px',
		top: getPosTop(x,y),
		left: getPosLeft(x,y)
	},10)
}

function showMoveAnimation(fromx,fromy,tox,toy)
{
	var numberCell = $("#number-cell-" + fromx + "-" + fromy);
	numberCell.animate({
		top: getPosTop(tox,toy),
		left: getPosLeft(tox,toy)
	},200)
	
}

function updateScore(score)
{
	var scoreNumber = $("#score");
	scoreNumber.text(score);
	scoreNumber.fadeIn(400);
}


