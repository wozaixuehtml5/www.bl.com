require(["../minjs/common_js/config"], function() {
	require(["jquery", "common"], function($) {
		$("#footer_load").load("footer.html");
		require(["header"], function() {
			$(function() {
				//头部调整
				$(".img_a_1").text("全球购");
				$(".img_a_2").text("精品闪购");
				$(".banner_top_first").hover(function() {
					$(".banner_top_first_lists").stop().slideDown(200);
				}, function() {
					$(".banner_top_first_lists").stop().slideUp(200);
				})

				//放大镜效果
				var cursor = $(".cursor");
				var mag = $(".mag");
				var cav = $(".goods_display_top");
				var thumb = $(".goods_display_thumbnail");
				$(thumb).find(".goods_display_img").mouseenter(function(e) {
					var e = e || event;
					var target = e.target || e.srcElement;
					if(!!target.src) {
						$(cav).find("img").attr("src", target.src);
					}
					if(!!$(target).find("img")) {
						$(cav).find("img").attr("src", $(target).find("img").attr("src"));
					}
				})
				cav.mousemove(function(e) {
					var size = cursor.outerWidth(true);
					var times = mag.width() / size;
					var offset = {
						left: e.clientX + $(window).scrollLeft() - $(this).offset().left,
						top: e.clientY + $(window).scrollTop() - $(this).offset().top
					}
					if(offset.left >= size / 2 && offset.top >= size / 2 && offset.left <= $(this).width() - size / 2 && offset.top <= $(this).height() - size / 2) {
						cursor.css({
							"left": offset.left - size / 2,
							"top": offset.top - size / 2,
							"display": "block"
						});
						mag.stop().fadeIn(100);
						mag.find("img").css({
							"left": -(offset.left - size / 2) * times,
							"top": -(offset.top - size / 2) * times,
							"width": mag.width() * times,
							"height": mag.height() * times
						});
					} else {
						cursor.css("display", "none");
						mag.stop().fadeOut(50);
					}
				})

				//收藏按钮点击
				var user_collect = $(".user_collect");
				user_collect.click(function() {
					$(this).toggleClass("user_collect_active");
				})

				//购买数量按钮点击
				var purchase_add = $(".purchase_add");
				var purchase_del = $(".purchase_del");
				purchase_add.click(function() {
					$(this).siblings(".purchase_num2").text(parseInt($(this).siblings(".purchase_num2").text()) + 1)
					$(this).siblings(".purchase_del").css("background", "white");
				})
				purchase_del.click(function() {
					if(parseInt($(this).siblings(".purchase_num2").text()) == 0) {
						$(this).css("background", "#EEEEEE");
					} else {
						$(this).css("background", "white").siblings(".purchase_num2").text(parseInt($(this).siblings(".purchase_num2").text()) - 1)
					}
				})
				
				//获得城市数据
				var req = new XMLHttpRequest;
				var citys_main = $(".citys_main");
				var citys_lists=$(".citys_lists");
				var city_select=$(".citys");
				req.open("get", "/api/h5-web/ui/h5resource/js/newConfirmOrder/confirmOrder.js?v=170223", true);
				req.send();
				req.onload = function() {
					eval(req.response);
					var provice_index = 0;
					var city_index = 0;
					var district_index = 0;
					var provice = [];
					var city_arr = [];
					var city_item = [];
					var district_arr = [];
					var district_item = [];
					for(var val in areaData[0]) {
						provice.push(getCityName(areaData[0][val]));
					}
					for(var val in areaData[1]) {
						city_arr.push(getCityName(areaData[1][val]));
					}
					for(var val in areaData[2]) {
						district_arr.push(getCityName(areaData[2][val]));
					}
					//select按钮被点击事件  先加载一遍provice的数据
					city_select.click(function(e){
						e.stopPropagation()
						citys_lists.slideToggle(100);
						citys_lists.css("display","block");
						$(".citys_tit").find("li").eq(0).addClass("li_active").siblings().removeClass("li_active");
						citys_main.html(template("temp_city", provice));
						citys_main.find("li").eq(0).find("a").addClass("a_active");
						citys_main_li_click();
					})
					
					//去除空格函数
					function tirm(str){
						var arr=str.split("	");
						var newstr="";
						arr=arr.filter(function(item,index){
							return item!="";
						})
						for(var val in arr){
							newstr+=arr[val];
						}
						return newstr;
					}
					
					//citys_main 中的li被点击时执行的事件函数包装
					function citys_main_li_click(){
						$(citys_main).click(function(e) {
							var e=e||event;
							e.stopPropagation();
							var target=e.target||e.srcElement;
							if($(target).find("a")){
								if(provice.indexOf($(target).text())!=-1){
									provice_index =provice.indexOf($(target).text());
									sty(1);
									$(this).find("a").addClass("a_active").parent().siblings().find("a").removeClass("a_active")
									city_item = getAreaStr(city_item, getCityName(city_arr[provice_index]))
									citys_main.html(template("temp_city", city_item));
									citys_main.find("li").eq(0).find("a").addClass("a_active");
								}else if(city_item.indexOf($(target).text())!=-1){
									city_index=city_item.indexOf($(target).text());
									sty(2);
									$(this).find("a").addClass("a_active").parent().siblings().find("a").removeClass("a_active")
									district_item = getAreaStr(district_item, getCityName(district_arr[provice_index][city_index]))
									citys_main.html(template("temp_city", district_item));
									citys_main.find("li").eq(0).find("a").addClass("a_active");
								}else{
									district_index=district_item.indexOf($(target).text());
									var total_city_name=provice[provice_index]+city_item[city_index]+district_item[district_index];
									city_select.children("em").text(total_city_name);
									citys_main.find("li").eq(0).find("a").addClass("a_active");
									citys_lists.slideUp(100);
								}
							}
						})
					}
					//样式控制函数包装
					function sty(num){
						return	$(".citys_lists ul li").eq(num).addClass("li_active").siblings().removeClass("li_active");
					}
					$(".citys_tit").children().children("li").each(function(index, item) {
						$(this).click(function(e) {
							var e=e||event;
							var target=e.target||e.srcElement;
							
							var iscity_down=false;
							e.stopPropagation();
							$(this).addClass("li_active").siblings().removeClass("li_active");
							if($(this).text() == "省份") {
								citys_main.html(template("temp_city", provice));
								citys_main.find("li").eq(0).find("a").addClass("a_active");
								citys_main_li_click();
							} else if($(this).text() == "城市") {
								city_item = getAreaStr(city_item, getCityName(city_arr[provice_index]))
								citys_main.html(template("temp_city", city_item));
								citys_main.find("li").eq(0).find("a").addClass("a_active");
							}else{
								district_item = getAreaStr(district_item, getCityName(district_arr[provice_index][city_index]))
								citys_main.html(template("temp_city", district_item));
								citys_main.find("li").eq(0).find("a").addClass("a_active");
							}
						})
					})
				}

				function getAreaStr(pre_arr, target_arr) {
					pre_arr = [];
					for(var val in target_arr) {
						pre_arr.push(getCityName(target_arr[val]));
					}
					return pre_arr;
				}

				function getCityName(str) {
					if(str.indexOf(",") != -1) {
						var arr = str.split(",");
						return arr[1].slice(0, 4);
					}
					return str;
				}
				
				//获取从index传过来的商品id号
				var id=location.href.split("=")[1];
				var price=parseInt($(".goods_price strong em").text());
				log(price)
				//加入购物车事件
				$(".user_shop").click(function(){
					var count=parseInt($(".purchase_num2").text());
					var user=JSON.parse(Cookie.get("user"));
					var index;
					for(var val in user){
						if(user[val].username==window.SELF){
							index=val;
							break;
						}
					}
					user[index].shop_goods={
						"id":id,
						"img":"1914134739_360x360.jpg",
						"data":"索尼（SONY）55英寸 KD-55X9000E 4K超高清智能LED液晶电视 安卓6.0系统 X1芯片 HDR液晶电视",
						"count":count,
//						"price":
					}
					Cookie.set("user",JSON.stringify(user),2,"/");
				})
				
				
				//跨域请求http://ingping.com的评论接口
				var req2=new XMLHttpRequest;
				req2.open("get","/inpin/product/proComment?dataType=json&offset=0&max=15&sort=createDate&order=desc&id=1930&type=1",true);
				req2.send();
				req2.onload=function(){
					if(!!$("#user_comment").get(0)){
						$(".user_comment_parent").html(template("user_comment",JSON.parse(req2.response).commentList))
					}
				}
				
				//请求本地的商品推荐json文件
				var req3=new XMLHttpRequest;
				req3.open("get","http://localhost:8000/self2.json");
				req3.send();
				req3.onload=function(){
					var goods=JSON.parse(req3.response);
					if(!!$("#temp_goods_lists").get(0)){
						var dom=template("temp_goods_lists",goods);
						$(".others_left_goods").html(dom);
					}
				}
				
				
				//others_right_tit 中的操作 切换展示的内容
				var others_tab=$(".others_right_tit");
				others_tab.children().click(function(e){
					var e=e||event;
					var target=e.target||e.srcElement;
					$(this).addClass("others_right_tit_active").siblings().removeClass("others_right_tit_active");
					if($(target).text().indexOf("商品介绍")!=-1){
						$(".others_right_comment").children().css("display","block")
					}else if($(target).text().indexOf("参数及包装")!=-1){
						$(".others_right_goods_dec").css("display","none").siblings().css("display","block");
					}else if($(target).text().indexOf("售后服务")!=-1){
						$(".others_right_goods_dec").css("display","none").siblings().css("display","block");
						$(".goods_par").css("display","none");
					}else{
						$(".user_comment_tit").css("display","block").siblings().css("display","none");
						$(".comment_page_limit").css("display","block");
					}
				})

			})
		})
	})
})