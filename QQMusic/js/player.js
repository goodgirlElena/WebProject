(function(window){
	function Player($autio)
	{
		return new Player.prototype.init($autio);
	}
	Player.prototype = {
		constructor: Player,
		musicList: [],
		currentIndex: -1,
		voiceValue: 80,
		voiceValueRatio: 0,
		preIndex: function(){
			var index = this.currentIndex - 1;
			if(index < 0)
			{
				index = this.musicList.length - 1;
			}
			return index;
		},
		nextIndex: function(){
			var index = this.currentIndex + 1;
			if(index > this.musicList.length - 1)
			{
				index = 0;
			}
			return index;
		},
		init: function($autio){
			this.$audio = $autio;
			this.audio = $autio.get(0);
		},
		playMusic: function(index,music){
			//判断是否为同一首歌
			if(this.currentIndex == index)
			{
				//判断当前歌曲是否为暂停状态
				if(this.audio.paused)
				{
					this.audio.play();
				}
				else
				{
					this.audio.pause();
				}
			}
			else
			{
				this.$audio.attr("src",music.link_url);
				this.audio.play();
				this.currentIndex = index;
			}
			
		},
		updateMusicList: function(index){
			//删除后台对应的数据
			this.musicList.splice(index,1)
			
			//判断要删除的对象是否在正在播放歌曲之前
			if(this.currentIndex > index)
			{
				this.currentIndex = this.currentIndex - 1;
			}
		},
		musicTimeUpdate: function(callBack){
			var $this = this;
			//监听音频时间更新事件
			this.$audio.on("timeupdate",function(){
				//获取音频的总时长  获得的值是以秒计算的
				var duration = $this.audio.duration;
				//获取当前已经播放的时长
				var currentTime = $this.audio.currentTime;
//				var timeStr = formateTime(currentTime,duration);
				var timeStr = $this.formateTime(currentTime);
				callBack(currentTime,duration,timeStr);
			});
		},
		formateTime: function(currentTime){
			var currentMin = parseInt(currentTime / 60),
				currentSec = parseInt(currentTime % 60);
			if(currentMin < 10)
			{
				currentMin = "0" + currentMin;
			}
			if(currentSec < 10)
			{
				currentSec = "0" + currentSec;
			}
			return currentMin + ":" + currentSec;
		},
		musicSeekTo: function(value){
			if(isNaN(value)) return;
			if(value > 0.9) return;
			//调整当前播放时长
			this.audio.currentTime = this.audio.duration * value;
		},
		musicVoiceSeekTo: function(value,offset){
			if(isNaN(value)) return;
			//调整音量大小
			if(value < 0 || value > 1) return;
//					console.log(value)
			this.audio.volume = value;
			this.voiceValueRatio = value;
			this.voiceValue = offset;
			
		}
		
	};
	Player.prototype.init.prototype = Player.prototype;
	window.Player = Player;
})(window)
