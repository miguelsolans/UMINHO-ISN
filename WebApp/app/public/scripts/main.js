require.config({
    "paths": {
        // External
        "jquery": "external/jquery",
        "bootstrap": "external/bootstrap",

        // Modules
        "loginPage": "modules/loginPage"
    },
    "bootstrap": {
        "deps": [
            'jquery'
        ]
    }
});

require([
    'loginPage',
], () => console.log("RequireJS Modules Loaded"));