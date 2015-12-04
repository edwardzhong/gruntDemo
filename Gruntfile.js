module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);//加载所有的任务
    require('time-grunt')(grunt); //使用 time-grunt 插件
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        //压缩合并css
        cssmin: {
            compress: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>  gruntDemo minified css file */'
                },
                files: {
                    'public/css/dest/index.css': ['public/css/a.css', 'public/css/b.css']
                }
            }
        },
        //连接js
        concat : {
            options: {
                separator: ''
            },
            dist : {
                src: ['public/js/a.js','public/js/b.js'],
                dest: 'public/js/index.js'
            }
        },
        //压缩js
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            // target:{
            //     files: [{
            //       expand: true,
            //       cwd: 'public/js',
            //       src: '**/*.js',
            //       dest: 'public/js/'
            //     }]
            // }
            build : {
                src : 'public/js/*.js',
                dest : 'public/js/dest/index.min.js'
            }
        },
        //压缩html
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: './',
                    src: '**/*.html',//该目录下所有html文件
                    dest: './'
                }]
            }
        },
        //检测验证js代码
        jshint: {
            files: ['Gruntfile.js', 'public/js/index.js'],
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    exports: true
                }
            }
        },
        //less 预编译
        less: {
            dev: {
                 options: {
                     paths: ['public/css']
                 },
                 files: {
                     "public/css/global.css": "public/css/global.less"
                 }
             }
        },
        //监控文件变化
        watch: {
            jshint:{
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']   
            },
            css:{
                files:['public/css/*.css'],
                tasks:['cssmin']
            },
            js:{
                files:['public/js/*.js','!public/js/jquery.js'],
                tasks:['concat','uglify'] 
            },
            less:{
                files:['public/css/*.less'],
                tasks:['less:dev']
            },
            html:{
                files:['index.html'],
                tasks:['htmlmin']
            }
        }
    });
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['cssmin','concat','uglify','htmlmin']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['cssmin','concat', 'uglify','jshint','htmlmin']);
};