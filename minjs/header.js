"use strict";require(["config"],function(){require(["jquery","common_config","template_config","ajax_config"],function(n){log("我是header，我被加载了"),n(function(){function i(i,t){n(i).click(function(){var i=n(this).clone();i.find("span").remove(),n(a).val(i.text()),n(t).remove()})}var t=n("#float_header_up");n("body");n(window).scroll(function(){n(window).scrollTop()>=140?t.css("display","block"):t.css("display","none")});var e=n(".header_lists_con");n(e).each(function(){n(this).hover(function(){n(this).children("ul,div:not('.tianchong'),dl").not(".header_left_nav").stop().slideDown(100,"swing").css("z-index",999).parent().css("z-index",9999)},function(){n(this).children("ul,div:not('.tianchong'),dl").not(".header_left_nav").slideUp(50,"swing").css("z-index",999).parent().css("z-index",9999)})});var a=n(".search_input_guanjianci");n(a).keyup(function(t){t.stopPropagation();var e=n(t.target),a=e.siblings(".search_data_con");""!=e.val()?ajax({type:"jsonp",url:"http://search.bl.com/autoComputele.html?callback=test&kw="+e.val()+"&count=11&channel=3&_=1505543086304",jsonpcallback:"test",success:function(t){var e=template("search_datas",t.result.resultInfo.showKeywords);n(a).html(e),i(n(a).find("li"),a)}}):(n(a).remove(),e.val(""))}),n(".banner_top").children("ul").children().not(".banner_top_first").each(function(i,t){var e=n("<img/>").attr({src:"../img/banner_img/doudou.png",width:"22",height:"24"}),a=n("<div></div>").css({width:n(this).children("a").css("width"),height:0,background:"red"});n(this).append(e,a),n(e).css({position:"absolute",left:"50%",top:0,"margin-left":-11,"z-index":-1});var o=null;n(this).children("a").mouseover(function(){clearTimeout(o),o=setTimeout(function(){n(e).stop().animate({top:-12},200),n(a).stop().animate({height:3,marginTop:-3},200)}.bind(this),100)}),n(this).children("a").mouseout(function(){clearTimeout(o),n(e).animate({top:0},200),n(a).animate({height:0,marginTop:0},200)})});for(var o=n(".banner_main_lunbo").css("overflow","hidden"),s=n(".banner_main_up"),c=[],r=[],d=["#FFF5F3","#EDC2DE","#FAC5E1","#FCEFFF","#F9E7DD","#D2F7FD","#FCEEE3","#FCDBB8","#FED7DA","#FFB8CA"],l=n("<p></p>").css({"z-index":998,width:"100%",height:"50px","padding-top":"25px",position:"absolute",left:0,bottom:0,"text-align":"center"}),h=0;h<10;h++)c.push(n("<img/>").attr("src","../img/banner_img/lunbo"+(h+1)+".jpg").css({position:"absolute","z-index":1})),r.push(n("<div></div>").css({width:"14px",height:"14px",margin:"0 4px",background:"#222222",display:"inline-block","border-radius":"50px"})),l.append(r[h]),o.append(c[h]);o.append(l),c[0].fadeIn(500).siblings().not(l).fadeOut(),s.css("background",d[0]),r[0].css({width:"30px",background:"#E6133C"}).siblings().css({width:"14px",background:"#222222"}),h=0;setInterval(function(){c[h=10==++h?0:h].fadeIn(500).siblings().not(l).fadeOut(),s.css("background",d[h]),r[h].animate({width:"30px"}).css("background","#E6133C").siblings().animate({width:"14px"}).css("background","#222222")}.bind(this),1500);var p=n(".banner_top_first_lists").children("li");n(p).children("div");n(p).each(function(i,t){n(this).hover(function(){n(this).children("div").css({display:"block",left:"180","z-index":999}).animate({left:190,opacity:.96},200)},function(){n(this).children("div").fadeOut(200)})});var u=n(".banner_main_right_center_imgs").children();n(u).each(function(){n(this).mouseenter(function(i){i.stopPropagation(),n(this).children("img").animate({top:"-40px",opacity:0},100,function(){n(this).css({opacity:1,top:"20px"}).animate({top:"0"},50)})})}),log("header全部加载完毕输出")})})});