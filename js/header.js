require(["config"], function() {
	require(["jquery", "common_config","template_config","ajax_config"], function($) {
		log("我是header，我被加载了")
		$(function() {
			
			//定义用户名
			var user_self="";
			if(user_self!=""){
				
			} 
			
			//浮动框的控制
			var float_header=$("#float_header_up");
			var body=$("body");
			$(window).scroll(function(){
				if($(window).scrollTop()>=140){
					float_header.css("display","block");
				}else{
					float_header.css("display","none");
				}
			})
			
			//右侧购物车二级菜单变化
//			var side_bar=$(".side_bar_chage");
//			log(side_bar)
//			side_bar.hover(function(){
//				$(this).siblings().css({"display":"block"}).stop().animate({left:"-88px",},500,function(){
//					var new_p=$("<p></p>")
//					new_p.css({
//						position:"absolute",
//						left:$(this).css("left"),
//						top:$(this).css("top"),
//						width:$(this).css("width"),
//						height:$(this).outerHeight(true),
//						overflow:"hidden",
//						background:"red"
//					});
//					side_bar.parent().append(new_p)
//					new_p.append($(this));
//					log(000)
//				})
//			},function(){
//				$(this).siblings().css("display","block").stop().animate({left:"0px",},500)
//			})
			
			//header中的有二级菜单的变化
			var li_change=$(".header_lists_con");
			$(li_change).each(function(){
				$(this).hover(function(){
					$(this).children("ul,div:not('.tianchong'),dl").not(".header_left_nav").stop().slideDown(100,"swing").css("z-index",999).parent().css("z-index",9999);
				},function(){
					$(this).children("ul,div:not('.tianchong'),dl").not(".header_left_nav").slideUp(50,"swing").css("z-index",999).parent().css("z-index",9999);
				})
			})
			
			//search中的input搜索关键字
			var con=$(".search_input_guanjianci");
			$(con).keyup(function(e){
				e.stopPropagation();
//				log(e.target)
				var con_new=$(e.target);
				var ul=con_new.siblings(".search_data_con");
				if(con_new.val()!=""){
					ajax({
						type:"jsonp",
						url:"http://search.bl.com/autoComputele.html?callback=test&kw="+con_new.val()+"&count=11&channel=3&_=1505543086304",
						jsonpcallback:"test",
						success:function(data){
							var str=template("search_datas",data.result.resultInfo.showKeywords)
							$(ul).html(str);
							click_data($(ul).find("li"),ul);
						}
					})
				}else{
					$(ul).remove();
					con_new.val("");
				}
			})
			function click_data(lis,ul){
				$(lis).click(function(){
					var only_li_text=$(this).clone();
					only_li_text.find("span").remove();
					$(con).val(only_li_text.text())
					$(ul).remove();
				})
			}
			
			//search 中的豆豆出现和消失，还有底部边框的变化
			var lists = $(".banner_top").children("ul").children().not(".banner_top_first");
			lists.each(function(index,item) {
				var doudou=$("<img/>").attr({
					"src":"../img/banner_img/doudou.png",
					"width":"22",
					"height":"24",
				});
				var border_div=$("<div></div>").css({
					width:$(this).children("a").css("width"),
					height:0,
					background:"red"
				})
				$(this).append(doudou,border_div)
				$(doudou).css({
					"position":"absolute",
					"left":"50%",
					"top":0,
					"margin-left":-11,
					"z-index":-1
				})
				var timer=null;
				$(this).children("a").mouseover(function(){
					clearTimeout(timer);
					timer=setTimeout(function(){
						$(doudou).stop().animate({top:-12},200);
						$(border_div).stop().animate({
							height:3,
							marginTop:-3
						},200)
					}.bind(this),100)
				});
				$(this).children("a").mouseout(function(){
					clearTimeout(timer)
					$(doudou).animate({top:0},200);
					$(border_div).animate({
							height:0,
							marginTop:0
						},200)
				})
			}) 
			
			//banner中的轮播图
			var banner=$(".banner_main_lunbo").css("overflow","hidden");
			var banner_main_up=$(".banner_main_up");
			var imgs=[],btns=[];
			var colors=["#FFF5F3","#EDC2DE","#FAC5E1","#FCEFFF","#F9E7DD","#D2F7FD","#FCEEE3","#FCDBB8","#FED7DA","#FFB8CA"];
			var tabs=$("<p></p>").css({"z-index":998,"width":"100%","height":"50px","padding-top":"25px","position":"absolute","left":0,"bottom":0,"text-align":"center"});
			for(var i=0;i<10;i++){
				imgs.push($("<img/>").attr("src","../img/banner_img/lunbo"+(i+1)+".jpg").css({"position":"absolute","z-index":1})); 
//				var a_s=$("<a href='###'></a>");
				btns.push($("<div></div>").css({"width":"14px","height":"14px","margin":"0 4px","background":"#222222","display":"inline-block","border-radius":"50px"}));
				tabs.append(btns[i]);
//				a_s.append(imgs[i]);
				banner.append(imgs[i])
			}
			banner.append(tabs)
			imgs[0].fadeIn(500).siblings().not(tabs).fadeOut();
			banner_main_up.css("background",colors[0]);
			btns[0].css({"width":"30px","background":"#E6133C"}).siblings().css({"width":"14px","background":"#222222"});
			i=0;
			var banner_timer=setInterval(function(){
				i++;
				i=i==10?0:i;
				imgs[i].fadeIn(500).siblings().not(tabs).fadeOut();
				banner_main_up.css("background",colors[i]);
				btns[i].animate({"width":"30px"}).css("background","#E6133C").siblings().animate({"width":"14px"}).css("background","#222222");
			}.bind(this),1500)
			
			
			//banner中的二级菜单
			var lis_parent=$(".banner_top_first_lists").children("li");
			var lis_children=$(lis_parent).children("div");
			$(lis_parent).each(function(index,item){
				$(this).hover(function(){
					$(this).children("div").css({"display":"block","left":"180","z-index":999}).animate({
						left:190,
						opacity:0.96
					},200)
				},function(){
					$(this).children("div").fadeOut(200);
				})
			})
			
			
			//banner_main_right 的生活服务动态
			var as_change=$(".banner_main_right_center_imgs").children();
			$(as_change).each(function(){
				$(this).mouseenter(function(e){
					e.stopPropagation()
					$(this).children("img").animate({"top":"-40px","opacity":0},100,function(){
						$(this).css({"opacity":1,"top":"20px"}).animate({"top":"0"},50)
					})
				})
			})
			log("header全部加载完毕输出")
		})       
})  
})