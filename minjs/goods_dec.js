"use strict";require(["../minjs/common_js/config"],function(){require(["jquery","common"],function($){$("#footer_load").load("footer.html"),require(["header"],function(){$(function(){function getAreaStr(t,i){for(var e in i)t.push(getCityName(i[e]));return t}function getCityName(t){return-1!=t.indexOf(",")?t.split(",")[1].slice(0,4):t}$(".img_a_1").text("全球购"),$(".img_a_2").text("精品闪购"),$(".banner_top_first").hover(function(){$(".banner_top_first_lists").stop().slideDown(200)},function(){$(".banner_top_first_lists").stop().slideUp(200)});var cursor=$(".cursor"),mag=$(".mag"),cav=$(".goods_display_top"),thumb=$(".goods_display_thumbnail");$(thumb).find(".goods_display_img").mouseenter(function(t){var i=(t=t||event).target||t.srcElement;log($(cav).attr("src")),i.src&&$(cav).find("img").attr("src",i.src),$(i).find("img")&&$(cav).find("img").attr("src",$(i).find("img").attr("src"))}),cav.mousemove(function(t){var i=cursor.outerWidth(!0),e=mag.width()/i,a={left:t.clientX+$(window).scrollLeft()-$(this).offset().left,top:t.clientY+$(window).scrollTop()-$(this).offset().top};a.left>=i/2&&a.top>=i/2&&a.left<=$(this).width()-i/2&&a.top<=$(this).height()-i/2?(cursor.css({left:a.left-i/2,top:a.top-i/2,display:"block"}),mag.stop().fadeIn(100),mag.find("img").css({left:-(a.left-i/2)*e,top:-(a.top-i/2)*e,width:mag.width()*e,height:mag.height()*e})):(cursor.css("display","none"),mag.stop().fadeOut(50))});var user_collect=$(".user_collect");user_collect.click(function(){$(this).toggleClass("user_collect_active")});var purchase_add=$(".purchase_add"),purchase_del=$(".purchase_del");purchase_add.click(function(){$(this).siblings(".purchase_num2").text(parseInt($(this).siblings(".purchase_num2").text())+1),$(this).siblings(".purchase_del").css("background","white")}),purchase_del.click(function(){0==parseInt($(this).siblings(".purchase_num2").text())?$(this).css("background","#EEEEEE"):$(this).css("background","white").siblings(".purchase_num2").text(parseInt($(this).siblings(".purchase_num2").text())-1)});var req=new XMLHttpRequest,citys_main=$(".citys_main");req.open("get","/api/h5-web/ui/h5resource/js/newConfirmOrder/confirmOrder.js?v=170223",!0),req.send(),req.onload=function(){eval(req.response);var provice=[],city_arr=[],city_item=[],district_arr=[],district_item=[];for(var val in areaData[0])provice.push(getCityName(areaData[0][val]));for(var val in areaData[1])city_arr.push(getCityName(areaData[1][val]));for(var val in areaData[2])district_arr.push(getCityName(areaData[2][val]));$(".citys_tit").find("li").each(function(t,i){$(this).click(function(){if($(this).addClass("li_active").siblings().removeClass("li_active"),"省份"==$(this).text()){var i=0;citys_main.html(template("temp_city",provice)),citys_main.find("li").eq(0).find("a").addClass("a_active"),citys_main.find("li").each(function(){$(this).click(function(){i=$(this).index(),$(this).find("a").addClass("a_active").parent().siblings().find("a").removeClass("a_active"),city_item=getAreaStr(city_item,getCityName(city_arr[t])),log(city_arr[t]),citys_main.html(template("temp_city",city_item))})})}})})}})})})});