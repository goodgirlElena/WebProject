//随机数
function randomNum(min,max)
{
	return parseInt(Math.random() * (max - min + 1) + min);
}
//随机颜色
function randomColor()
{
	var r = parseInt(Math.random() * 256);
	var g = parseInt(Math.random() * 256);
	var b = parseInt(Math.random() * 256);
	
	var colorString = "rgb(" + r + "," + g + "," + b + ")";
	return colorString;
}

//将输入的数据倒序输出，包括有符号数据
/*
	输入：-123  输出：-321
		120		21	
		parseInt()方法能够自动将第一个数字为0的数字以正确的形式显示
		即：parseInt("012")----> 12  parseInt("-012")-----> -12
		
*/
function reverseNum(num)
{
	var res,arr1,str;
	var arr = num.toString().split("");
	if(arr[0] === "-")
	{
		arr1 = arr.slice(1);
		res = arr1.reverse();
		res.unshift("-")
	}
	else
	{
		res = arr.reverse();
	}
	str = res.join("");
	result = parseInt(str);
	return result;
}

/**
  * 函数功能：规范命名，将命名转换为驼峰命名
  * 参数说明：x：要转换的变量名
  */
function changeTool(x)
{

    var arr = [],str,str1,str2;

    if( x.indexOf("-") != -1)

    {

        arr = x.split("-");
		if(arr.length > 2)
		{
			arr.shift();
		}

        str1 = arr[0].slice(0,1).toUpperCase() + arr[0].slice(1);

        str2 = arr[1].slice(0,1).toUpperCase() + arr[1].slice(1);

    }

    return str = str1 + str2;

}

function chanTool(x)

{

    var A = "A",Z = "Z",str;

    for(let i = 1; i < x.length; i++)

    {

        if(A.charCodeAt() <= x[i].charCodeAt() && x[i].charCodeAt()  <= Z.charCodeAt())

        {

            var index = x.indexOf(x[i])

            var str1 = x.slice(0,index);

            var str2 = x.slice(index);

        }

    }
        str1 = str1.toLowerCase();

        str2 = str2.toLowerCase();

        return str = str1 + "-" + str2;

}

/**
  * 函数功能 cookie的运用(添加,修改,删除cookie)
  * 参数说明:key:要保存数据的键名,value:要保存数据的键值,path:cookie的存储路径,
  *       domain:cookie所在的域名,day:cookie有效时间
  * 
  */
function cookieAdd(key,value,path,domain,day)
{
	// 1. 处理默认保存路径
	var index = window.location.pathname.lastIndexOf("/");
	var curPage = window.location.pathname.slice(0,index);
	path = path || curPage;
	// 2. 处理默认保存的domain
	domian = domain || document.domain;
	// 3. 处理默认的过期时间
	if(!day)
	{
		document.cookie = key + "=" + value + ";path = " + path + ";domain = " + domain;
	}
	else
	{
		var date = new Date();
		date.setDate(date.getDate() + day);
		document.cookie = key + "=" + value + ";path = " + path + 
		";domain = " + domain + ";expires = " + date.toUTCString() + ";";
	}
}






