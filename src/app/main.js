requirejs.config(
    {
        paths: {
            'jQuery': '../js/jquery',
            'underscore': '../js/underscore',
			'd3' : '../js/d3',
            "Q": "../js/q",
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