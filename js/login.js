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
						}else{
							is_pass=false;
						}
					}else{
						is_pass=false;
					}
				}
				if(is_pass){
					user_self=username;
				}
			})
		})
	})
})