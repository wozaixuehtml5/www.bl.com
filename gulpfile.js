

var gulp=require("gulp");
var uglify=require("gulp-uglify");
var babel=require("gulp-babel");
var sass=require("gulp-ruby-sass");
var connect=require("gulp-connect");
var webserver=require("gulp-webserver");
var proxy=require("http-proxy-middleware")

gulp.task("js",function(){
	gulp.src("js/**/*.js")
		.pipe(babel({
			presets:["es2015"]
		}))
		.pipe(uglify())
		.pipe(gulp.dest("minjs/"));
})

gulp.task("scss",function(){
	sass("scss/*.scss",{
		style:"expanded"
	}).pipe(gulp.dest("css/"));
})

gulp.task("html",function(){
	gulp.src("html/*.html")
		.pipe(connect.reload());
})

gulp.task("webserver",function(){
	gulp.src('./')
		.pipe(
			webserver({
				host:"localhost",
				port:8000,
				livereload:true,
				directoryListing:{
					enable:true,
					path:'./'
				},
				middleware:[
					proxy("/api",{
						target:'https://m.bl.com',
						changeOrigin:true,
						pathRewrite:{
							"api":''
						}
					}),
					proxy("/inpin",{
						target:'http://m.ingping.com',
						changeOrigin:true,
						pathRewrite:{
							"inpin":''
						}
					})
				]
			})
		)
})

gulp.task("listenning",function(){
//	connect.server({
//		livereload:true
//	});
	
	gulp.watch(["js/common_js/*.js"],["js"]);
	gulp.watch("scss/*.scss",["scss"]);
	gulp.watch("css/*.css",["html"]);
	gulp.watch("html/*.html",["html"]);
	gulp.watch("minjs/*.js",["html"])
})

gulp.task("default",["listenning","webserver"]);
