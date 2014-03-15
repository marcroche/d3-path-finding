requirejs.config(
    {
        paths: {
            'jQuery': '../js/jquery/src/jquery',
            'underscore': '../js/underscore/underscore',
			'd3' : '../js/d3/d3'
        },
        shim: {
            'jQuery': {
                exports: '$'
            },
            'underscore': {
                exports: '_'
            }
        }
    }
);

require(['d3'], function (d3) {
	console.log(d3.version);
});