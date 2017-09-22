//敏感字符串过滤
function strfilter(target) {
	var words = ["SB", "TMD", "WQNMLGB", "89.64"];
	for(var i in words) {
		var tihuan = "";
		var Exp = new RegExp(words[i], 'gi');
		for(var j = 0; j < words[i].length; j++) {
			tihuan += "*";
		}
		return target = target.replace(Exp, tihuan);
	}  
}
   
//从min到max之间的随机数
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
 
//随机验证码
function identifyingCode(len) {
	var str = "";
	for(var i = 0; i < len; i++) {
		do {
			var ran = Math.round(Math.random() * 74 + 48);
		} while ((ran >= 58 && ran <= 64) || (ran >= 91 && ran <= 96));
		str += String.fromCharCode(ran);
	}
	return str;
}
 
//控制台输出
function log(str) {
	return console.log(str);
}

//document.wirte输出
function print(str) {
	return document.write(str);
}

//判断某年份是否为闰年
function isLeapYear(y) {
	if(y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) {
		return true;
	}
	return false;
}

//将日期格式化输出  "2015-08-24"     有问题
function dateFormat(str) {
	var Exp = new RegExp(/\D/, 'g');
	str = str.replace(Exp, '-');
	return str;
}

//获得 某个月份的天数
function getDayInMonth(m, y) {
	switch(m) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31;
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		case 2:
			{
				if(isLeapYear(y)) {
					return 29;
				}
				return 28;
			}
	}
}

//将字符串转换为日期
function strToDate(str) {
	return new Date(dateFormat(str));
}

//判断两个日期相差的天数
function countButweenDays(d1, d2) {
	if(typeof d1 == "string" && typeof d2 == "string") {
		var newd1 = strToDate(d1);
		var newd2 = strToDate(d2);
		return Math.abs(newd1 - newd2) / (1000 * 3600 * 24);
	} else {
		return Math.abs(d1 - d2) / (1000 * 3600 * 24);
	}
}

//睡眠时间毫秒数
function sleep(Millisec) {
	var now = new Date();
	var exitTime = now.getTime() + Millisec;
	while(true) {
		now = new Date();
		if(now.getTime() >= exitTime)
			return;
	}
}

//获得N天以后的日期
function daysLater(n) {
	var now = new Date();
	var date1 = new Date(now.setDate(now.getDate() + n));
	return date1;
}

//解决getElementByClassName()在IE浏览器中的兼容性问题的通用方法
if(!document.getElementsByClassName) {
	document.getElemnetsByClassName = function(classname) {
		var allelements = document.getElementByTagName("*");
		var temp = [];
		for(var i = 0; i < allelements.length; i++) {
			var list = [];
			list = allelements[i].className.split(" ");
			for(var j = 0; j < list.length; j++) {
				if(list[j] === classname) {
					temp.push(list[j]);
				}
			}
		}
		return temp;
	}
}

//获取元素的非行内元素的样式属性值
function getStyle(object, attribute) {
	return getComputedStyle ? window.getComputedStyle(object)[attribute] : (object).currentStyle[attribute];
}

//获取一个dom对象距离html的左侧距离
function getOffsetPage(obj) {
	var _left = obj.offsetLeft;
	var _top = obj.offsetTop;
	while(obj.offsetParent) {
		_left += obj.offsetParent.offsetLeft;
		_top += obj.offsetParent.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		"left": _left,
		"top": _top
	};
}

//伪数组变数组
function toArray(list) {
	var temp = [];
	for(var i = 0; i < list.length; i++) {
		temp.push(list[i]);
	}
	return temp;
}

//监听事件的兼容   这叫函数的柯里化
var addEvent = (function() {
	if(window.VBArray) {
		return function(obj, eventname, func) {
			obj.attachEvent("on" + eventname, func);
		};
	} else {
		return function(obj, eventname, func, isCapture) {
			obj.addEventListener(eventname, func, !!isCapture);
		};
	}
})();

//关于cookie的封装

var Cookie = {
	get: function(key) {
		var getcook = document.cookie;
		var arr = getcook.split("; ");
		for(var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split("=");
			if(arr2[0] == key) {
				return arr2[1];
			}
		}
		return null;
	},
	set: function(name, cont, date, path) {
		if(name) {
			var name = name;
		}
		if(cont) {
			var cont = cont;
		}
		if(date) {
			var d = new Date();
			d.setDate(d.getDate() + date);
		}
		if(path) {
			var path = path;
		}
		document.cookie = (name + "=" + cont + ";expires=" + d + ";path=" + path);
	}
}

//对象的copy     这里的copy可以将对象内部的除了方法之外的都复制一份 但是方法不能被复制 只会复制方法的地址
function copyObj(obj) {
	if(typeof obj != "object") {
		throw new Error("传入的参数不是对象!");
	}
	var dest = (obj instanceof Array) ? [] : {};
	for(var val in obj) {
		if(typeof obj[val] == "object") {
			dest[val] = copyObj(obj[val]);
		} else {
			dest[val] = obj[val];
		}
	}
	return dest;
}

//封装获取元素的方法
function $(str) {
	var matcharr = null;
	if(matcharr = str.match(/^#(.+)/)) {
		return document.getElementById(matcharr[1]);
	}
	if(matcharr = str.match(/^\.([a-zA-Z0-9]+)$/)) {
		return Array.from(document.getElementsByClassName(matcharr[1]));
	}
	if(matcharr = str.match(/^[a-zA-Z0-9]+$/)) {
		return Array.from(document.getElementsByTagName(matcharr[0]));
	}

	if(matcharr = str.match(/^([^\.#]+)\[([a-zA-Z0-9]+)=['|"]?([a-zA-Z0-9]+)['|"]?\]$/)) {
		var tagname = matcharr[1];
		var attrname = matcharr[2];
		var attrvalue = matcharr[3];
		var listname = Array.from(document.getElementsByTagName(tagname));
		var newlist = listname.filter(function(item, index) {
			log("我是自定义")
			return item.getAttribute(attrname) == attrvalue;
		});
		return newlist;
	}
}



//更改背景颜色函数 定时器
function changeBackground(obj, state, time) {
	var _obj = obj.style.background;
	var t = setInterval(
		function() {

		}
	)
}

//改变背景颜色
function changeBackground(obj, interval) {
	var red = randomInt(0, 255);
	var green = randomInt(0, 255);
	var blue = randomInt(0, 255);
	var deg = 0;
	var count = 1;
	var _obj = obj.style.background;
	var t = setInterval(
		function() {
			var ranr = randomInt(0, 1);
			var ran2 = (Math.round(Math.random() * 1) / 10) * Math.pow(-1, randomInt(1, 2));
			red = (ranr + red) % 255;
			green = Math.abs(Math.round(220 * Math.sin(deg * Math.PI / 180)));
			if(blue >= 255) {
				count++;
			}
			if(blue <= 0) {
				count++;
			}
			blue += 1 * Math.pow(-1, count)
			obj.style.background = "rgba(" + red + "," + green + "," + blue + "," + 1 + ")";
			deg++;
		}, interval);
}

//随机颜色
function randomColor(){
	return "rgba(" + randomInt(0,255) + "," + randomInt(0,255) + "," + randomInt(0,255) + "," + 1 + ")";
}

//自定义动画
function animation(obj, target, time,cb) {
	if(!!obj.t){
		clearInterval(obj.t);
	}
//	log("清除本元素的上个动画事件")
	var _obj = {};
	var cb=!!cb?cb:function(){};
	for(var val in target) {
		if(val == "opacity") {
			_obj[val] = parseInt(getStyle(obj, val));
		} else if(val=="transform"){
			_obj[val]="scale(1)";
		}else{
			_obj[val] = parseInt(getStyle(obj, val));
		}
	}
	var deg = 0;
	obj.t = setInterval(
		function() {
			for(var val in _obj) {
				if(val == "opacity") {           //渐变的是透明度
					obj.style[val] = +_obj[val] + (target[val] - _obj[val]) * Math.sin(deg * Math.PI / 180);
				} else if(val=="transform"){                    //渐变的是大小 scale
					var index_left=target[val].indexOf("(");
					var index_right=target[val].indexOf(")");
					var target_scale=target[val].slice(index_left+1,index_right);
					var cha=target_scale-1;
					obj.style[val]="scale("+(cha>=0?1+ cha*Math.sin(deg*Math.PI/180):1- cha*Math.sin(deg*Math.PI/180))+ ")";
				}else{
					obj.style[val] = _obj[val] + (parseInt(target[val]) - _obj[val]) * Math.sin(deg * Math.PI / 180) + "px";
				}
			}
			deg++;
			if(deg > 90) {
				clearInterval(obj.t);
				cb();
			}
		}, time / 90)
}

