(function(window){
	function Lyrics(path)
	{
		return new Lyrics.prototype.init(path);
	}
	Lyrics.prototype = {
		constructor: Lyrics,
		lyrics: [],
		times: [],
		timesArr: [],
		index: -1,
		init: function(path){
			this.path = path;
		},
		loadLyrics: function(callBack){
			var $this = this;
			//从本地拿到歌词信息
			$.ajax({
				url: $this.path,
				dataType: "text",
				success: function(data){
					//解析歌词
					$this.parseLyrics(data);
					callBack();
//					console.log(data);
				},
				error: function(err)
				{
					console.log(err);
				}
			});
		},
		parseLyrics: function(lyrics){
			var $this = this;
			//清空上一首歌曲的歌词信息
			$this.lyrics = [];
			$this.times = [];
			var arr = lyrics.split("\n");
			//定义一个正则表达式用来匹配时间 [00:00.92]
			var timeReg = /\[(\d*:\d*\.\d*)\]/;
			//遍历取出每一条歌词
			$.each(arr,function(index,ele){
				//处理歌词
				//拿到歌词
				var lrc = ele.split("]")[1];
				//排除空字符串（没有歌词的）
				if(lrc.length == 1) return true;
				$this.lyrics.push(lrc);
				
				//处理时间
				var res = timeReg.exec(ele);
				if(res == null) return true;
				var timeStr = res[1];
				var res2 = timeStr.split(":");
				var min = parseInt(res2[0]) * 60;
				var sec = parseFloat(res2[1]);
				var time = parseFloat(Number(min + sec).toFixed(2));
				$this.times.push(time);
				
			})
		},
		updateLyrics: function(currentTime){
			for(let i = 0; i < this.times.length; i++)
			{
				if(this.times[i] >= currentTime) return i - 1;
			}
		}
	};	
	Lyrics.prototype.init.prototype = Lyrics.prototype;
	window.Lyrics = Lyrics;
})(window)
