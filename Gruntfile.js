module.exports = function(grunt) {
  grunt.initConfig({
  	copy: {
	  build: {
	    files: [
	      { src:"lib/d3/d3.js", dest:"src/js/d3.js" },
	      { src:"lib/jquery/dist/jquery.js", dest:"src/js/jquery.js" },
	      { src:"lib/q/q.js", dest:"src/js/q.js" },
	      { src:"lib/requirejs/require.js", dest:"src/js/require.js" },
	      { src:"lib/underscore/underscore.js", dest:"src/js/underscore.js" }
	    ]
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask(
	  'build', 
	  'Compiles all of the assets and copies the files to the build directory.', 
	  [ 'copy' ]
	);
};