require.config({
    "paths": {
        // External
        "jquery": "external/jquery",
        "bootstrap": "external/bootstrap",

        // Modules
        "User": "modules/Person",
        "uiTest": "modules/ui-test"
    },
    "bootstrap": {
        "deps": [
            'jquery'
        ]
    }
});

require([
    'User',
    'uiTest'
], () => console.log("RequireJS Modules Loaded"));
