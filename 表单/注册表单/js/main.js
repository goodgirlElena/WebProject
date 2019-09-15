//文本框的验证封装成一个函数
//elementId:元素ID reg：正则表达式对象  tip：提示文本
function check(elementId,reg,tip)
{
	var element = document.getElementById(elementId);
	//onblur当光标离开文本框时，验证用户输入的内容是否正确
	element.onblur = function(){
		var span = this.nextElementSibling;
		//检测用户输入的文本是否匹配指定的模式（正则表达式）
		if(!reg.test(this.value))
		{
			//不匹配 在文本框后面的span中进行相应的提示
			
			span.innerText = tip;
			span.style.color = "red";
			span.style.fontSize = "14px";
			return false;
		}
		else
		{
			span.style.display = "inline-block";
			return true;
		}
	}
}
var form = document.forms[0];
var ele = document.getElementById("txtScode");
form.elements[form.length - 1].onclick = function()
{
	//验证 验证码
	if(check("txtScode",/^\d{4}$/,"请输入正确的验证码"))
	{
		form.submit();
	}
	else
	{
		ele.focus();
	}
}

//验证邮箱
check("mail",/^\w+@\w+(\.\w+)+$/,"请输入正确的电子邮箱")
console.log(location.href);