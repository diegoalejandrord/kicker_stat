module.exports = function(grunt){

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'main.js', 'js/**/*.js', 'tests/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        browserify: {
            'dist/static/js/App.js': ['index.js']
        },
        'http-server': {
 
            'dev': {

                // the server root directory 
                //root: <path>,

                // the server port 
                // can also be written as a function, e.g. 
                // port: function() { return 8282; } 
                port: 8282,

                // the host ip address 
                // If specified to, for example, "127.0.0.1" the server will 
                // only be available on that ip. 
                // Specify "0.0.0.0" to be available everywhere 
                host: "0.0.0.0",

                // Tell grunt task to open the browser 
                openBrowser : true

            }

        }
    });


    //Tasks
    grunt.registerTask('dist', ['jshint', 'browserify']);
    grunt.registerTask('serve', ['http-server']);
    
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-http-server');

};
