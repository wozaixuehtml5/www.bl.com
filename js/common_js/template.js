


function template(id, data) {
	if(!!id){
		var con = document.getElementById(id).innerHTML;
	}else{
		var con=id;
	}   
	con = "log(`" + con + "`)";
	con = con.replace(/<%=(.+)%>/g, "`)\nlog($1);log(`");
	con = con.replace(/<%(.+)%>/g, "`)\n$1 log(`");
	var filter = `(function(data){
					var htmlstr="";
					function log(str){
						htmlstr+=str;
					}
					${con};
					return htmlstr;
				})`;
	var realfunc = eval(filter);
	var sec = realfunc(data);
	return sec;
}