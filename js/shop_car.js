require(["../minjs/common_js/config"], function() {
	require(["jquery", "common"], function($) {
		$("#footer_load").load("footer.html");
		require(["header","../js/goods_dec.js"], function() {
			$(function() {
				
				//购物车处理
				var price_sin=parseInt($(".price_sin span").text());
				var count=parseInt($(".shop_goods_num_center").text());
				var table=$(".shop_table");
				table.click(function(e){
					var e=e||event;
					var target=e.target||e.srcElement;
					if($(target).attr("class")=="shop_goods_num_del"){
						log(00)
						if(parseInt($(target).siblings(".shop_goods_num_center").text())>1){
							$(target).siblings(".shop_goods_num_center").text(parseInt($(target).siblings(".shop_goods_num_center").text())-1)
						}
					}
					if($(target).attr("class")=="shop_goods_num_add"){
						$(target).siblings(".shop_goods_num_center").text(parseInt($(target).siblings(".shop_goods_num_center").text())+1);
					}
					if($(target).parent().attr("class")=="del"){
						$(target).parents("tr").remove();
					}
				})
			})	
		})
	})
})