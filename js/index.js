require(["config"], function() {
	require(["jquery","common_config","ajax_config","template_config"], function($) {
		$("#footer_load").load("html/footer.html");
		require(["head_config"],function(){  
			//左侧栏控制效果 barnav 
			var barnavs=$("#float_left").children();
			var main_con2=$(".main_con2");
			var body=$("body")
			$(barnavs).click(function(){
//				log(123123)
				var offset_top=$(main_con2).offset().top+$(this).index()*494-90;
				$(body).animate({scrollTop:offset_top});
//				log(!!$(body).animate({scrollTop:offset_top}))
			});
			
			$(window).scroll(function(){
				if(!!$(barnavs).mouseenter){
					$(barnavs).off("mouseenter mouseleave");
				}
				if($(this).scrollTop()>=$(main_con2).offset().top){
					$(barnavs).parent().css("display","block");
				}else{
					$(barnavs).parent().css("display","none");
				}
				barnavs.parent().css({"top":$(window).scrollTop()-$(main_con2).offset().top+570,"left":"-50px"});
				var index=parseInt((($(window).scrollTop()-$(main_con2).offset().top)+90)/494);
				index=index<0?0:index;
				index=index>7?7:index;
				var str="url(../img/main_img/barnav.png) no-repeat -45px "+(-index*41)+"px";
				barnavs.each(function(index,item){
					$(this).css("background","url(../img/main_img/barnav.png) no-repeat 0px "+(-index*41)+"px")
				})
				barnavs.eq(index).css("background","url(../img/main_img/barnav.png) no-repeat -45px "+(-index*41)+"px");
				$(barnavs).on(
					"mouseenter",function(){
						$(this).css("background","url(../img/main_img/barnav.png) no-repeat -45px "+(-$(this).index()*41)+"px");
					}
//					"mouseleave",function(){
//						if($(this).index()!=index){
//							$(this).css("background","url(../img/main_img/barnav.png) no-repeat 0px "+(-$(this).index()*41)+"px")
//						}
//					}
				);
				$(barnavs).on("mouseleave",function(){
					if($(this).index()!=index){
						$(this).css("background","url(../img/main_img/barnav.png) no-repeat 0px "+(-$(this).index()*41)+"px")
					}
				})
			});
			
			
			//右侧购物车页面
			
			
			//图片向左移动效果
			var imgs=$(".left_change").find("img");
			var timer=null;
			imgs.hover(function(){
				clearTimeout(timer);					
				timer=setTimeout(function(){
					$(this).stop().animate({"left":"-5px"},200);
				}.bind(this),200)
			},function(){
				clearTimeout(timer);
				$(this).stop().animate({"left":0},200);
			})
			
			//图片进度条加轮播图效果
			var jindu_lunbo_1=$(".main_con2_first").find(".left").css("position","relative");
			var jindu_lunbo_2=$(".main_con3").find(".left").css("position","relative");
			var jindu_lunbo_3=$(".main_con4").find(".left").css("position","relative");
			var jindu_lunbo_4=$(".main_con5").find(".left").css("position","relative");
			var jindu_lunbo_5=$(".main_con6").find(".left").css("position","relative");
			var jindu_lunbo_6=$(".main_con7").find(".left").css("position","relative");
			var jindu_lunbo_7=$(".main_con8").find(".left").css("position","relative");
			var jindu_lunbo_8=$(".main_con9").find(".left").css("position","relative");
			
			jindu_lunbo(jindu_lunbo_1,3,"1F_","#4DA920");
			jindu_lunbo(jindu_lunbo_2,3,"2F_","#CF5B05");
			jindu_lunbo(jindu_lunbo_3,3,"3F_","#D89100");
			jindu_lunbo(jindu_lunbo_4,3,"4F_","#853796");
			jindu_lunbo(jindu_lunbo_5,3,"5F_","#178FCD");
			jindu_lunbo(jindu_lunbo_6,3,"6F_","#EB3889");
			jindu_lunbo(jindu_lunbo_7,3,"7F_","#E54535");
			jindu_lunbo(jindu_lunbo_8,3,"8F_","#2B63E2");
			//定义  图片进度条加轮播图效果 函数
			function jindu_lunbo(jindu_lunbo,num,img_name_common,color){
				var imgs=[],btns=[];
				var tabs=$("<div></div>").css({"position":"absolute","bottom":"0","height":"35px","padding-top":"0px","width":"126px","text-align":"center"})
				var pause=false;
				jindu_lunbo.append(tabs);
				for(var i=0;i<num;i++){
					var a_imgs=$("<a href='###'></a>");
					imgs.push($("<img/>").attr("src","../img/main_img/"+img_name_common+(i+1)+".jpg").css("position","absolute"));
					a_imgs.append(imgs[i]);
					var btns_item=$("<div></div>").css({"z-index":99,"background":"white","display":"inline-block","width":"20px","height":"4px","margin":"0 4px 0 4px","position":"relative"});
					btns_item.append($("<div></div>").css({"width":"0px","height":"4px","background":color,"position":"absolute"}));
					btns.push(btns_item);
					jindu_lunbo.append(a_imgs);
					tabs.append(btns_item);
				}
				i=0;
				imgs[i].animate({"left":"-306px"},500);
				btns[i].children().animate({"width":"21px"},2000,function(){
					$(this).css("width",0);
				});
				setInterval(function(){
					if(pause){
					}else{
						i++;
						i=i==num?0:i;
						imgs[i].animate({"left":"-306px"},500);
						imgs[(i+1==num?0:i+1)].css("left","306px").animate({"left":0},500);
						btns[i].children().css("width",0).animate({"width":"21px"},2000,function(){
							$(this).css("width",0);
						});
					}
				},2000)
				
				imgs.forEach(function(item,index){
					item.parent().parent().hover(function(){pause=true;},function(){pause=false;})
				})
			}
			
		})     
	})
})

