require(["../minjs/common_js/config"], function() {
	require(["jquery", "common"], function($) {
		$("#footer_load").load("footer.html");
		require(["header"], function() {
			$(function() {
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
					log($(cav).attr("src"))
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
					log(areaData)
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
					city_select.click(function(){
						citys_lists.slideToggle(100);
						citys_main.html(template("temp_city", provice));
						citys_main.find("li").eq(0).find("a").addClass("a_active");
					})
					
					
					$(".citys_tit").children().children("li").each(function(index, item) {
						$(this).click(function(e) {
							var e=e||event;
							var target=e.target||e.srcElement;
							var provice_index = 0;
							var city_index = 0;
							var district_index = 0;
							var iscity_down=false;
							e.stopPropagation();
							$(this).addClass("li_active").siblings().removeClass("li_active");
							if($(this).text() == "省份") {
								citys_main.html(template("temp_city", provice));
								citys_main.find("li").eq(0).find("a").addClass("a_active");
									$(citys_main).click(function(e) {
										var e=e||event;
										e.stopPropagation();
										var target=e.target||e.srcElement;
										if($(target).find("a")){
											if(provice.indexOf($(target).text())!=-1){
												provice_index =provice.indexOf($(target).text());
												$(".citys_lists ul li").eq(1).addClass("li_active").siblings().removeClass("li_active");
												$(this).find("a").addClass("a_active").parent().siblings().find("a").removeClass("a_active")
												city_item = getAreaStr(city_item, getCityName(city_arr[provice_index]))
												citys_main.html(template("temp_city", city_item));
												citys_main.find("li").eq(0).find("a").addClass("a_active");
											}else if(city_item.indexOf($(target).text())!=-1){
												city_index=city_item.indexOf($(target).text());
												$(".citys_lists ul li").eq(2).addClass("li_active").siblings().removeClass("li_active");
												$(this).find("a").addClass("a_active").parent().siblings().find("a").removeClass("a_active")
												district_item = getAreaStr(district_item, getCityName(district_arr[provice_index][city_index]))
												citys_main.html(template("temp_city", district_item));
												citys_main.find("li").eq(0).find("a").addClass("a_active");
											}else{
												district_index=district_item.indexOf($(target).text());
												var total_city_name=provice[provice_index]+city_item[city_index]+district_item[district_index];
												log(total_city_name)
												city_select.children("em").text(total_city_name);
												citys_main.find("li").eq(0).find("a").addClass("a_active");
											}
										}
									})
							} else if($(this).text() == "城市") {
								city_item = getAreaStr(city_item, getCityName(city_arr[provice_index]))
								citys_main.html(template("temp_city", city_item));
								log(citys_main.find("li").eq(0).find("a"))
								citys_main.find("li").eq(0).find("a").addClass("a_active");
							}else{
								
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
						//						log(arr[1])
						return arr[1].slice(0, 4);
					}
					return str;
				}

			})
		})
	})
})