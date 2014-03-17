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
	  },
	  testDeps: {
	  	files: [
	      { src:"lib/jasmine/lib/jasmine-core/jasmine.js", dest:"tests/lib/jasmine/jasmine.js" },
	      { src:"lib/jasmine/lib/jasmine-core/boot.js", dest:"tests/lib/jasmine/boot.js" },
	      { src:"lib/jasmine/lib/jasmine-core/console.js", dest:"tests/lib/jasmine/console.js" },
	      { src:"lib/jasmine/lib/jasmine-core/jasmine-html.js", dest:"tests/lib/jasmine/jasmine-html.js" },
	      { src:"lib/jasmine/lib/jasmine-core/jasmine.css", dest:"tests/lib/jasmine/jasmine.css" },
	      { src:"lib/jasmine/lib/jasmine-core/jasmine_favicon.png", dest:"tests/lib/jasmine-2.0.0/jasmine_favicon.png" },
	      { src:"lib/jquery/dist/jquery.js", dest:"tests/lib/jquery.js" },
	      { src:"lib/underscore/underscore.js", dest:"tests/lib/underscore.js" },
	      { src:"lib/requirejs/require.js", dest:"tests/lib/require.js" }
	    ]
	  },
	  testSrc: {
	  	files: [
	      { src:"src/app/model/MinPriorityQueue.js", dest:"tests/src/model/MinPriorityQueue.js" }
	    ]
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask(
	  'build', 
	  'Copies JS dependencies to the src/js directory.', 
	  [ 'copy:build' ]
	);

  grunt.registerTask(
	  'tests', 
	  'Moves test dependencies to the tests directory.', 
	  [ 'copy:testDeps', 'copy:testSrc' ]
	);
};