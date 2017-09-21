
//  
//ajax({
//	type:"jsonp",
//	url:"http://suggestion.baidu.com/su?wd=a&cb=test",
//	async:true,
//	params:"xx=33",
//	success:function(data){
//		console.log(data);
//	},
//	jsonpcallback:"test"
//})

	function ajax({type="get",url,jsonpcallback,params,async=true,success=function(){}}){
		if(!/^https?:\/\/.+(\?.+=.+(&.+=.+)*)?$/.test(url)){
			throw new Error();
			return;
		}
		switch(type){
			case "get":ajaxGet(url,async,success);break;
			case "post":ajaxPost(url,async,params,success);break;
			case "jsonp":ajaxJsonp(url,jsonpcallback,success);break;
		}
		function ajaxGet(url,async,success){
			var req=getXHR();
			req.open("get",url,async);
			req.send();
			if(!!req.onload	){
				req.onload=function(){
					success(req.response);
				}
			}else{
				req.onreadystatechange=function(){
					if(req.readyState==4&&req.status==200){
						success(req.responseText);
					}
				}
			}
		}
		function ajaxPost(url,async,params,success){
			var req=getXHR();
			req.open("post",url,async);
			req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			req.send(params);
			if(!!req.onload	){
				log(34)
				req.onload=function(){
					success(req.response);
				}
			}else{
				log(00)
				req.onreadystatechange=function(){
					if(req.readyState==4&&req.status==200){
						success(req.responseText);
					}
				}
			}
		}
		
		function ajaxJsonp(url,jsonpcallback,success){
			var _script=document.createElement("script");
			_script.src=url;
			document.getElementsByTagName("head")[0].appendChild(_script);
			log(jsonpcallback)
			window[jsonpcallback]=function(data){
				success(data);
			}
		}
		
		function getXHR(){
			if(window.VBArray){
				return req=new ActiveXObject("Msxm12.XMLHTTP");
			}else{
				return req=new XMLHttpRequest;
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
