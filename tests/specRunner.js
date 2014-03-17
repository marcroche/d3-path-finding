require.config({
    urlArgs: 'cb=' + Math.random(),
    paths: {
        'jQuery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'jasmine': 'lib/jasmine/jasmine',
        'jasmine-html': 'lib/jasmine/jasmine-html',
        'boot': 'lib/jasmine/boot',
        'spec': 'spec'
    },
    shim: {
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'underscore': {
            exports: '_'
        },
        'boot': {
            deps: ['jasmine', 'jasmine-html'],
            exports: 'jasmine'
        }
    }
});

var specs = [
    'spec/MinPriorityQueueSpec'
];

require(['boot'], function () {
    require(specs, function () {
      window.onload();
    });
});