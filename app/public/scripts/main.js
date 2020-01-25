require.config({
    "paths": {

        /**
         * Application External Libraries
         */
        // jQuery & Plguins
        "jquery": "external/jQuery/jquery-3.4.1.min",
        "jquery-confirm": "external/jQuery/plugins/jquery-confirm",

        // Bootstrap
        "bootstrap": "external/bootstrap/bootstrap",
        "popper": "external/bootstrap/popper",

        // Tagify
        "tagify": "external/tagify/tagify",


        // QuillJS
        "quill": "external/quill/quill",


        /**
         * Application Modules
         */
        // Settings
        "settings": "modules/settings/settings",
        // Messages
        "messages": "modules/messages/messages",

        /**
         * Application Utils
         */
        // Notification Alerts
        "alert": "modules/utils/alerts"

    },

    /**
     * Shim Libraries
     */
    "jquery-confirm": {
        deps: ['jquery'],
        exports: 'confirm'
    },
    "bootstrap": {
        "deps": [
            'jquery',
            'popper'
        ]
    }
});

require([
    'settings',
    'messages',
    'alert'
], () => console.log("RequireJS Modules Loaded"));