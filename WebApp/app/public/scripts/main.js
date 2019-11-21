require.config({
    "paths": {
        // External
        "jquery": "external/jquery",
        "bootstrap": "external/bootstrap",

        // Modules
        "User": "modules/User",
        "uiTest": "modules/ui-test"
    },
    "bootstrap": {
        "deps": [
            'jquery'
        ]
    }
});

//Main module
// require([
//
// ], function () {
//     console.log("RequireJS Modules Loaded");
// });

require([
    'User',
    'uiTest'
], () => console.log("RequireJS Modules Loaded"));