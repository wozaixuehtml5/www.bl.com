require(["../minjs/common_js/config"], function() {
	require(["jquery", "common"], function($) {
		$("#footer_load").load("footer.html");
		$(function() {
			var inputs = document.getElementsByTagName("input");
			var username = inputs[0];
			var password = inputs[1];
			var psdcon = inputs[2];
			var email = inputs[6];
			var duanxin = inputs[5];
			var phoneNum = inputs[3];
			var codeStr = inputs[4]
			var input_tit=$(".input-left");
			username.oninput = function() {
				var usernamevalue = inputs[0].value;
				$(".username").find(input_tit).css("display","block");
				if(usernamevalue.length < 6 || usernamevalue.length > 20) {
					$(".username").find(input_tit).find("p").text("用户名长度不正确")
					$(".username").find(input_tit).find("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
					$(".username").addClass("has-error").removeClass("has-success");
					$(".username").find("input").attr("is_pass",false);
				} else{
					for(var i = 0; i < usernamevalue.length; i++) {
						if(/[^\w]+/.test(usernamevalue)) {
							input_tit.find("p").text("包含非法字符")
							$(".username").find(input_tit).find("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
							$(".username").addClass("has-error").removeClass("has-success");
							$(".username").find("input").attr("is_pass",false);
						}else{
							input_tit.find("p").text("")
							$(".username").find(input_tit).find("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
							$(".username").addClass("has-success").removeClass("has-error")
							$(".username").find("input").attr("is_pass",true);
						}
					}
				}
			}
			var safe = document.getElementsByClassName("psd_btn");
			password.oninput = function() {
				$(".password").find(".input-left").css("display","block")
				var psd = password.value;
				var isNum = 0;
				var isStr = 0;
				var isSign = 0;
				if(/.*\d+.*/.test(psd)) {
					isNum = 1;
				}
				if(/.*[a-zA-Z]+.*/.test(psd)) {
					isStr = 1;
				}
				if(/.*[^a-zA-Z0-9]+.*/.test(psd)) {
					isSign = 1;
				}
				if(isNum + isStr + isSign == 1) {
					safe[0].style.background = "#C9302C";
					safe[1].style.background = "#CCCCCC";
					safe[2].style.background = "#CCCCCC";
				} else if(isNum + isStr + isSign == 2) {
					safe[0].style.background = "#C9302C";
					safe[1].style.background = "#EC971F";
					safe[2].style.background = "#CCCCCC";
				} else if(isNum + isStr + isSign == 3) {
					safe[0].style.background = "#C9302C";
					safe[1].style.background = "#EC971F";
					safe[2].style.background = "#286090";
				} else {
					safe[0].style.background = "#CCCCCC";
					safe[1].style.background = "#CCCCCC";
					safe[2].style.background = "#CCCCCC";
				}
				if(psd==""||isNum + isStr + isSign<2){
					$(".password").find("input").attr("is_pass",false);
					$(".password").addClass("has-error").removeClass("has-success");
					$(".password").find(".input-left").find("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
				}else{
					$(".password").find("input").attr("is_pass",true);
					$(".password").find(".input-left").find("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
					$(".password").addClass("has-success").removeClass("has-error");
				}
			}
			psdcon.onblur = function() {
				$(".password_con").find(".input-left").css("display","block");
				var psdc = psdcon.value;
				if(psdc != password.value) {
					$(".password_con").find(".input-left").find("p").text("输入密码不一致!");
					$(".password_con").find(".input-left").find("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
					$(".password_con").find("input").attr("is_pass",false);
					$(".password_con").addClass("has-error").removeClass("has-success");
				} else {
					$(".password_con").find(".input-left").find("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
					$(".password_con").find("input").attr("is_pass",true);
					$(".password_con").addClass("has-success").removeClass("has-error");
				}
			}
			
			phoneNum.onblur = function() {
				$(".phone_num").find(".input-left").css("display","block");
				var phone = phoneNum.value;
				if(phone.length != 11) {
					$(".phone_num").find(".input-left").find("p").text("手机号不正确!");
					$(".phone_num").find(".input-left").find("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
					$(".phone_num").addClass("has-error").removeClass("has-success");
					$(".phone_num").find("input").attr("is_pass",false);
				} else if(/\D+/.test(phone)) {
					$(".phone_num").find(".input-left").find("p").text("手机号不正确!");
					$(".phone_num").find(".input-left").find("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
					$(".phone_num").addClass("has-error").removeClass("has-success");
					$(".phone_num").find("input").attr("is_pass",false);
				} else {
					$(".phone_num").find(".input-left").find("p").text("手机号输入正确!");
					$(".phone_num").find(".input-left").find("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
					$(".phone_num").addClass("has-success").removeClass("has-error");
					$(".phone_num").find("input").attr("is_pass",true);
				}
			}
			
			
			//邮箱判断
			email.onblur=function(){
				if(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email.value)){
					$(email).attr("is_pass",true);
				}
			}
			//验证码验证
			duanxin.onblur=function(){
				if(duanxin.value!=null){
					$(duanxin).attr("is_pass",true);
				}
			}
			
			//短信验证码
			codeStr.onblur=function(){
				if(codeStr.value!=null){
					$(codeStr).attr("is_pass",true);
				}
			}
			
			
			//同意条款事件
			var is_tongyitiaokuan=false;
			$(".ok_dec").click(function(){
				$(this).find(".check_con").toggleClass("check_con_2");
				is_tongyitiaokuan=true;
			})
			
			//所有注册用户都保存在info_arr数组中
			if(!!Cookie.get("user")){
				var info_arr=JSON.parse(Cookie.get("user"))
			}else{
				var info_arr=[];
			}
			var ok_btn=$(".ok_btn");
			ok_btn.click(function(){
				var pass_con=true;
				for(var i=0;i<inputs.length;i++ ){
					if(inputs[i].getAttribute("is_pass")==null){
						pass_con= false;
					}
					if(inputs[i].getAttribute("is_pass")=="false"){
						pass_con= false;
						break;
					}
				}
				log(pass_con)
				log(is_tongyitiaokuan)
				if(pass_con&&is_tongyitiaokuan){
					var info={
						"username":inputs[0].value,
						"password":inputs[1].value,
						"phone_num":inputs[3].value,
						"email":inputs[6].value,
						"user_self":false,
						"shop_goods":{}
					}
					info_arr.push(info);
					Cookie.set("user",JSON.stringify(info_arr),2,"/");
					$(".ok_btn").parent().attr("href","login.html")
				}else{
					alert("请正确输入信息！");
				}
			})
		})
	})
})