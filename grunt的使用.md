###关于前端自动化工具grunt的使用

* grunt参考文档：http://www.gruntjs.net/
* 演示项目已经放到github上：https://github.com/edwardzhong/gruntDemo 

####1.环境：
操作系统：win
运行环境和相关工具：node.js，npm包管理器

####2.npm常用的命令
	npm install <name> 			安装nodejs的依赖包
	npm install 				安装当前目录下的package.json,并自动安装指定的依赖
	npm install -g  <name>  	全局模式安装依赖包<name>
	npm install <name> --save  	安装的同时，将信息写入package.json中
	npm init  					引导你创建一个package.json文件
	npm remove <name> 			移除指定的包
	npm update <name> 			更新指定的包
	npm ls 						列出当前安装的了所有包
	npm root 					查看当前包的安装路径
	npm root -g  				查看全局的包的安装路径

####3.grunt的安装
1.安装node.js和npm包管理器;

2.全局安装grunt-cli，grunt-cli的作用是管理本地各版本的grunt，让命令行可以直接执行grunt命令;

	npm install -g grunt-cli

3.全局安装 grunt;
	
	npm install -g grunt

4.把grunt作为devDependencies写入的package.json;

	npm install grunt --save-dev

5.在项目目录下创建Gruntfile.js文件;

6.配置好package.json里面的devDependencies依赖包，接着安装grunt插件.

	npm install

####4.比较常用的几个插件
* grunt-contrib-uglify：压缩js代码
* grunt-contrib-concat：合并js文件
* grunt-contrib-cssmin：css压缩合并
* grunt-contrib-htmlmin：html文件压缩
* grunt-contrib-jshint：js代码检查
* grunt-contrib-watch：监控文件修改并重新执行注册的任务

常用插件列表：https://github.com/edwardzhong/grunt-contrib

####5.配置Gruntfile.js (**重点**)

######Gruntfile 文件案例分析

    module.exports = function(grunt) {
		//项目配置，里面都是使用对象键值对的方式，进行配置插件，每一个属性对应一个插件，每个插件的配置方式参考对应的文档
	    grunt.initConfig({
	    	//配置css压缩插件
	        cssmin: {
	            compress: {
	                options: {
	                    banner: '/* gruntDemo minified css file */'
	                },
	                files: {
	                    'public/css/dest/BlogDemo.css': ['public/css/style.css', 'public/css/admin.css']
	                }
	            }
	        },
	        //js文件连接插件
	        concat : {
	            options: {
	                separator: ''
	            },
	            dist : {
	                src: ['public/js/a.js','public/js/b.js'],
	                dest: 'public/js/index.js'
	            }
	        },
	        ...
	    });

	    //加载所用到的插件包
	    grunt.loadNpmTasks('grunt-contrib-cssmin');
	    grunt.loadNpmTasks('grunt-contrib-concat');

	    ...

	    //注册任务，将几个插件任务组合为一个任务
	    grunt.registerTask('default', ['cssmin','concat']);
	    grunt.registerTask('build', ['cssmin','concat', 'uglify','jshint','htmlmin']);
	};


####6.使用grunt进行自动化

	grunt 			//直接执行default任务
	grunt cssmin 	//直接执行指定插件的任务
	grunt build  	//执行build任务

####7.相关的自动化和模块管理工具

* gulp:类似于grunt，使用方式更加方便和简单，但插件没有grunt丰富
* bower:前端包管理器
* webpack:类似于bower的前端模块管理工具

