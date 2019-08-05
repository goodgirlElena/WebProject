###### 这是一个自己制作jQuery插件的代码

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<!--<style type="text/css">
			div {
				width: 50px;
				height: 50px;
				background-color: pink;
				animation: cartoon 2s ease 0s infinite alternate;
			}
			@keyframes cartoon{
				from{
					transform: translateX(0) translateY(0);
				}
				to{
					transform: translate(600px) translateY(200px);
				}
			}
		</style>-->
		<style type="text/css">
			.cls {
				width: 200px;
				height: 100px;
				background-color: pink;
				margin-top: 10px;
				margin-left: 10px;
				float: left;
			}
		</style>
		<script src="js/jquery-1.8.0.min.js"></script>
		<script type="text/javascript">
			//自己做jQuery插件的时候直接将下面的代码写在一个单独的js文件里，然后用link标签将其引入到html中就可以了
			$.fn.changeBgColor=function(color){
					$(".cls").css("backgroundColor",color);
				

			}
			
			//以下代码还是写在自己的js文件中
			$(function(){
				$("input[type='button']").click(function(){
//					$(".cls").css("backgroundColor",$(this).val());
//					changeBgColor($(this).val());
					$(".cls").changeBgColor($(this).val());
				})
			})
//			function changeBgColor(color)
//			{
//					$(".cls").css("backgroundColor",color);
//				
//			}
		</script>
	</head>
	<body >
		<input type="button" id="btn" value="green" />
		<input type="button" id="btn1" value="blue" />
		<input type="button" id="btn2" value="red" />
		<div id="dv">
			<div class="cls"></div>
			<div class="cls"></div>
			<div class="cls"></div>
			<div class="cls"></div>
			<div class="cls"></div>
			<div class="cls"></div>
		</div>
	</body>
</html>