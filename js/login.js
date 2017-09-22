require(["../minjs/common_js/config"], function() {
	require(["jquery", "common","header"], function($) {
		$("#footer_load").load("footer.html");
		$(function() {
			var users=JSON.parse(Cookie.get("user"));
			var login_btn=$(".login_btn");
			login_btn.click(function(){
				var username=$(".username").val();
				var pas=$(".password").val();
				var is_pass=true;
				for(var val in users){
					if(users[val].username==username){
						if(users[val].password==pas){
							users[val].user_self=true;
							Cookie.set("user",JSON.stringify(users),2,"/");
							is_pass=true;
							break;
						}else{
							is_pass=false;
						}
					}else{
						is_pass=false;
					}
				}
				if(is_pass){
					window.user_self=username;
					alert("恭喜你！登陆成功了！")
					log(users)
					log(Cookie.get("user"))
					$(".login_a").attr("href","../index.html")
				}else{
					alert("很遗憾，你登录失败了！");
				}
			})
		})
	})
})