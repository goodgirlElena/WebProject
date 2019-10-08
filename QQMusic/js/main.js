$(function(){
	//自定义滚动条
	 $(".music-list").mCustomScrollbar();
	 var $audio = $("audio");
	 var player = new Player($audio);
	 var progress,//定义一个控制音乐播放时长的进度条变量
	 	 progressVoice,//定义一个控制音量的进度条变量
	 	 lyrics; 
	// 1、加载歌曲列表
	creatMusicList();
	//从本地拿到歌曲信息并创建歌曲列表
	function creatMusicList(){
		$.ajax({
			url:"./source/musiclist.json",
			dataType: "json",
			success: function(data){
				player.musicList = data;
				var $musicList = $(".music-list ul");
				$.each(data, function(index,ele) {
					//将歌曲添加到页面上显示
					var $item = creatMusicItem(index,ele);
					$musicList.append($item);
				});
				//初始化歌曲信息
				initMusicInfo(data[0]);
				//初始化歌词信息
				initMusicLyrics(data[0]);
			},
			error: function(err)
			{
				console.log(err);
			}
		});
	}
	
	//初始化歌曲信息
	function initMusicInfo(music)
	{
		//获取歌曲信息的各个元素
		var $musicImg = $(".song_info_pic img"),
			$musicName = $(".music-name a"),
			$musicSigner = $(".music-singer a"),
			$musicAlbum = $(".music-album a"),
			$musicProgressName = $(".song_info_name"),
			$musicProgressSigner = $(".song_info_singer"),
			$musicProgressTime = $(".end_time"),
			$musicBg = $(".mask_bg");
			
		//初始化各个歌曲信息
		$musicImg.attr("src",music.cover);
		$musicName.text(music.name);
		$musicSigner.text(music.singer);
		$musicAlbum.text(music.album);
		$musicProgressName.text(music.name);
		$musicProgressSigner.text(music.singer);
		$musicProgressTime.text(music.time);
		
		//初始化页面背景
		$musicBg.css("background","url('" + music.cover + "')")
	}
	
	//初始化歌词信息
	function initMusicLyrics(music)
	{
		lyrics = new Lyrics(music.link_lrc);
		var $lyricsContainer = $(".music_container");
		//清空上一首歌曲的歌词信息
		$lyricsContainer.html("");
		lyrics.loadLyrics(function(){
			//创建歌词列表
			$.each(lyrics.lyrics, function(index,ele){
				var $item = $("<p>" + ele + "</p>");
				$lyricsContainer.append($item);
			});
		});
	}
	
	//初始化进度条信息
	initProgress();
	function initProgress()
	{
		//获取操作音乐进度条的各个元素
		var $progressBar = $(".progress_bar"),
			$progressWidth = $(".progress_width"),
			$progressDot = $(".progress_dot");
			
		progress = new Progress($progressBar,$progressWidth,$progressDot);
		progress.progressClick(function(value){
			player.musicSeekTo(value);
		});
		progress.progressDrag(function(value){
			progress.isVoice = false;
			player.musicSeekTo(value);
		});
		
		//获取操作音乐音量进度条的各个元素
		var $progressVoiceBar = $(".voice_progress_bar"),
			$progressVoiceWidth = $(".voice_progress_width"),
			$progressVoiceDot = $(".voice_progress_dot");
			
		progressVoice = new Progress($progressVoiceBar,$progressVoiceWidth,$progressVoiceDot);
		progressVoice.progressClick(function(value,offset){
//			progressVoice.isVoice = true;
			player.musicVoiceSeekTo(value,offset);
		});
		progressVoice.progressDrag(function(value,offset){
			player.musicVoiceSeekTo(value,offset);
		});
		
		
	}
	
	// 2、初始化事件监听
	initEvents();
	 function initEvents()
	 {
	 	// 1、监听歌曲列表的悬停事件
		$(".music-list").delegate(".music","mouseenter",function(){
			//鼠标移入事件
			//显示歌曲操作菜单
			$(this).find(".operationMenu").css("display","block");
			$(this).find(".list-time a").css("display","block");
			//隐藏时长
			$(this).find(".list-time span").css("display","none");
		});
		
		$(".music-list").delegate(".music","mouseleave",function(){
			//鼠标移出事件
			//显示时长
			$(this).find(".list-time span").css("display","block");
			//隐藏歌曲操作菜单
			$(this).find(".operationMenu").css("display","none");
			$(this).find(".list-time a").css("display","none");
		});
		
		// 2、监听选中点击事件
		$(".music-list").delegate(".list-selcet","click",function(){
			$(this).toggleClass("list-selected");
		})
		
		// 3、监听title下的选中点击事件
		$(".title>.list-selcet").click(function(){
			$(this).toggleClass("list-selected");
			$(".list-selcet").toggleClass("list-selected");
		})
		
		// 4、添加监听本首歌曲播放按钮点击事件
		var $musicPlayer = $(".footer .music_play");//获取底部播放按钮
		$(".music-list").delegate(".player","click",function(){
			//找到当前歌曲的 li
			var $item = $(this).parents(".music")
			var $items = $item.siblings();
			
			//切换播放图标
			$(this).toggleClass("playing");
			//复原其它的播放图标
			$items.find(".player").removeClass("playing");
			//同步底部播放按钮
			if($(this).hasClass("playing"))
			{
				$musicPlayer.addClass("music_playing");
				//使当前播放歌曲信息高亮
				$item.find("span").css("color","#fff");
				$items.find("span").css("color", "rgba(255,255,255,0.5)");
				//使当前歌曲显示播放图标
				$item.find(".list-number").addClass("list-number-icon");
				$items.find(".list-number").removeClass("list-number-icon");
			}
			else
			{
				$musicPlayer.removeClass("music_playing");
				//取消歌曲信息高亮
				$item.find("span").css("color","rgba(255,255,255,0.5)");
				//隐藏歌曲播放图标
				$item.find(".list-number").removeClass("list-number-icon");
			}
			
			//播放歌曲
			player.playMusic($item.get(0).index,$item.get(0).music);
		
			//初始化当前播放歌曲信息
			initMusicInfo($item.get(0).music);
			//初始化当前播放歌曲的歌词信息
			initMusicLyrics($item.get(0).music);
		})
	 	
	 	// 5、添加监听底部播放按钮点击事件
	 	$musicPlayer.click(function(){
	 		//判断是否播放过音乐
	 		if(player.currentIndex == -1)
	 		{
	 			//没有播放过音乐
	 			//默认播放音乐列表的第一首歌
	 			$(".music").eq(0).find(".player").trigger("click");
	 		}
	 		else
	 		{
	 			//曾经播放过音乐
	 			$(".music").eq(player.currentIndex).find(".player").trigger("click");
	 		}
	 	})
	 	
	 	// 6、添加监听底部上一首按钮点击事件
	 	$(".music_pre").click(function(){
	 		$(".music").eq(player.preIndex()).find(".player").trigger("click");
	 	})
	 	
	 	// 7、添加监听底部下一首按钮点击事件
	 	$(".music_next").click(function(){
	 		$(".music").eq(player.nextIndex()).find(".player").trigger("click");
	 	})
	 	
	 	// 8、添加监听删除按钮点击事件
	 	$(".music-list").delegate(".del","click",function(arg){
	 		console.log(arg);
	 		//拿到当前要删除歌曲的  li 
	 		var $item = $(this).parents(".music");
	 		//判断当前要删除的对象是否正在播放
	 		if($item.get(0).index == player.currentIndex)
	 		{
	 			//自动播放下一首
	 			$(".music_next").trigger("click")
	 		}
	 		
	 		
	 		//从当前页面移出歌曲
	 		$item.remove();
	 		player.updateMusicList($item.get(0).index);
	 		
	 		//更新歌曲列表的序号
	 		$(".music").each(function(index,ele){
	 			ele.index = index;
	 			$(ele).find(".list-number").text(index + 1)
	 		})
	 	})
	 	
	 	//监听播放进度
	 	player.musicTimeUpdate(function(currentTime,duration,timeStr){
	 		//同步时间
	 		$(".start_time").text(timeStr)
	 		//同步进步条
	 		//计算播放比例
	 		var value = currentTime / duration * 100;
	 		progress.updateProgress(value);
	 		
	 		//同步歌词信息
	 		var index = lyrics.updateLyrics(currentTime);
	 		var $item = $(".music_container p").eq(index);
	 		$item.addClass("cur");
	 		$item.siblings().removeClass("cur");
	 		//实现歌词滚动
	 		if(index <= 0) return;
	 		$(".music_container").css({
	 			marginTop: -index * 30
	 		})
	 		
	 		//如果当前是循环播放模式
	 		if($(".music_mode").hasClass("music_mode"))
	 		{
	 			//本首播完自动播放下一首
		 		if(currentTime == duration)
		 		{
		 			setTimeout($(".music_next").trigger("click"),1000);
		 		}
	 		}
	 		//如果当前是顺序播放模式
	 		else if($(".music_mode").hasClass("music_mode2"))
	 		{
//	 			console.log(player.currentIndex,player.musicList.length -1)
	 			//音乐播完音乐列表的最后一首歌，不再播放
	 			if(player.currentIndex == (player.musicList.length -1))
	 			{
	 				if(currentTime == duration)
	 				{
//	 					player.audio.pause();
	 					var $item = $(".playing").parents(".music")
	 					$(".playing").removeClass("playing");
	 					$musicPlayer.removeClass("music_playing");
						//取消歌曲信息高亮
						$item.find("span").css("color","rgba(255,255,255,0.5)");
						//隐藏歌曲播放图标
						$item.find(".list-number").removeClass("list-number-icon");
	 				}
	 			}
	 			else
	 			{
	 				//本首播完自动播放下一首
			 		if(currentTime == duration)
			 		{
			 			setTimeout($(".music_next").trigger("click"),1000);
			 		}
	 			}
	 		}
	 		//如果当前是随机播放模式
	 		else if($(".music_mode").hasClass("music_mode3"))
	 		{
	 			
	 			if(currentTime == duration)
	 			{
	 				//随机生成歌曲序号
	 				var index = randomNum(0,player.musicList.length -1);
	 				$(".music").eq(index).find(".player").trigger("click");
	 			}
	 			
	 		}
	 		//如果当前是单曲循环播放模式
	 		else if($(".music_mode").hasClass("music_mode4"))
	 		{
	 			if(currentTime == duration)
	 			{
	 				player.audio.play();
	 			}
	 			
	 		}
	 		
	 		
	 	})
	 	
	 	// 9、监听音量按钮
	 	$(".voice_icon").click(function(){
	 		//切换音量图标
	 		$(this).toggleClass("voice_icon2")
	 		//判断是否当前为静音模式
	 		if($(this).hasClass("voice_icon2"))
	 		{
	 			//无声音
	 			player.audio.volume = 0;  
	 			$(".voice_progress_width").width(0);
	 			$(".voice_progress_dot").css("left",0)
	 		}
	 		else
	 		{
	 			player.audio.volume = player.voiceValueRatio || 1;
	 			$(".voice_progress_width").width(player.voiceValue);
	 			$(".voice_progress_dot").css("left",player.voiceValue)
	 		}
	 	});
	 	
	 	// 10、监听音乐模式转换按钮
 		var index = 1; //用来存储音乐模式序号的变量
	 	$(".music_mode").click(function(){
			index++;
			if(index <= 4 )
			{
				$(this).addClass("music_mode" + index);
	 			$(this).removeClass("music_mode" + (index - 1));
			}
			else
			{
				$(this).removeClass("music_mode4")
				index = 1;
			}
	 	});
	 	
	 	// 11、监听顶部删除按钮
	 	$(".topDel").click(function(){
			var listArr = $(".list-selcet");
			$.each(listArr, function(index,ele) {
				//判断是否有歌曲被选中
		 		if($(ele).hasClass("list-selected"))
		 		{
		 			var $item = $(ele).parents(".music")
		 			//判断当前要删除的对象是否正在播放
			 		if($item.get(0).index == player.currentIndex)
			 		{
			 			//自动播放下一首
			 			$(".music_next").trigger("click")
			 		}
			 		
			 		//从当前页面移出歌曲
			 		$item.remove();
			 		player.updateMusicList($item.get(0).index);
			 		
			 		//更新歌曲列表的序号
			 		$(".music").each(function(index,ele){
			 			ele.index = index;
			 			$(ele).find(".list-number").text(index + 1)
			 		});
		 		}
			});
	 	})
	 }
	
	
	
	
	
	//创建一首音乐
	function creatMusicItem(index,music)
	{
		var $item = $("<li class=\"music\">\n" + 
						"<span class=\"list-selcet\"></span>\n" +
						"<span class=\"list-number\">" + (index + 1) + "</span>\n" +
						"<span class=\"list-music\">\n" + 
							"<span>" + music.name + "</span>\n" +
							"<span class=\"operationMenu\">\n" +
								"<a href=\"javascript:;\" title=\"播放\" class=\"player\"></a>\n" +
								"<a href=\"javascript:;\" title=\"添加到歌单\" class=\"add\"></a>\n" +
								"<a href=\"javascript:;\" title=\"下载\" class=\"down\"></a>\n" +
								"<a href=\"javascript:;\" title=\"分享\" class=\"share\"></a>\n" +
							"</span>\n" +
						"</span>\n" +
						"<span class=\"list-singer\">" + music.singer + "</span>\n" +
						"<span class=\"list-time\">\n" +
							"<span>" + music.time + "</span>\n" +
							"<a href=\"javascript:;\" title=\"删除\" class=\"del\"></a>\n" +
						"</span>\n" +
					"</li>");
		$item.get(0).index = index;
		$item.get(0).music = music;
		return $item;
	}
})
