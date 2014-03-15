requirejs.config(
    {
        paths: {
            'jQuery': '../js/jquery/dist/jquery',
            'underscore': '../js/underscore/underscore',
			'd3' : '../js/d3/d3',
            "Q": "../js/q/q",
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

require(['bootstrapper'], function (bootstrapper) {
	bootstrapper.start();
});