(function(window){
	function Progress($progressBar,$progressWidth,$progressDot)
	{
		return new Progress.prototype.init($progressBar,$progressWidth,$progressDot);
	}
	Progress.prototype = {
		constructor: Progress,
		isMove: false,
		isMouseDown: false,
		isVoice: true,
		init: function($progressBar,$progressWidth,$progressDot){
			this.$progressBar = $progressBar;
			this.$progressWidth = $progressWidth;
			this.$progressDot = $progressDot;
		},
		progressClick: function(callBack){
			var $this = this,
				barWidth = this.$progressBar.width();
			var offset;
			this.$progressBar.click(function(event){
				//获取进度条左侧距离页面的距离
				var normalLeft = $(this).offset().left;
				//获取点击位置处距离页面左侧的距离
				var currentLeft = event.pageX;
				offset = currentLeft - normalLeft;
				var value;
				if(offset >= 0 && offset <= barWidth - 5 )
				{
					//设置进度条当前的宽度
					$this.$progressWidth.css("width",offset);
					$this.$progressDot.css("left",offset);
					//计算进度条的比例
					value = offset / barWidth;
				}
				
				callBack(value,offset);
			})
		},
		progressDrag: function(callBack){
			var $this = this,
				normalLeft = this.$progressBar.offset().left,
				barWidth = this.$progressBar.width();
			var value,offset;
			//监听鼠标按下事件
			this.$progressBar.mousedown(function(){
					$this.isMouseDown = true;
				//监听鼠标移动事件
				$(document).mousemove(function(event){
					$this.isMove = true;
					//获取鼠标当前位置距页面组左侧的距离
					var currentLeft = event.pageX;
					offset = currentLeft - normalLeft;

					if(offset >= 0 && offset <= barWidth )
					{
						//设置进度条当前的宽度
						$this.$progressWidth.css("width",offset);
						$this.$progressDot.css("left",offset);
						//计算进度条的比例
						value = offset / barWidth;
						if($this.isVoice) callBack(value,offset);
						
						
					}
				})
				
			})
			//监听鼠标抬起事件
			$(document).mouseup(function(){
				$this.isMove = false;
				//移出鼠标移动事件
				$(this).off("mousemove");
				if($this.isMouseDown) callBack(value,offset);
				$this.isMouseDown = false;
			})
			
		},
		updateProgress: function(value){
			if(this.isMove) return;
			if(value < 0 || value > 100) return;
			this.$progressWidth.css("width",value + "%");
			this.$progressDot.css("left",value + "%");
		}
		
	};
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window)
