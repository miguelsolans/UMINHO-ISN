require.config({
    "paths": {

        /**
         * Application External Libraries
         */
        // jQuery & Plguins
        "jquery": "external/jQuery/jquery-3.4.1.min",
        "jquery-confirm": "external/jQuery/plugins/jquery-confirm/jquery-confirm",

        // Bootstrap
        "bootstrap": "external/bootstrap/bootstrap.bundle",
        // "popper": "external/bootstrap/popper",

        // Tagify
        "tagify": "external/tagify/tagify",


        // QuillJS
        "quill": "external/quill/quill",

        // Dropzone
        "dropzone": "external/dropzone/dropzone",


        "highlight": "external/highlight/highlight",

        /**
         * Application Modules
         */
        // Settings
        "settings": "modules/settings/settings",
        // Messages
        "messages": "modules/messages/messages",

        // Feed
        "feed": "modules/feed/feed",


        /**
         * Application Utils
         */
        // Notification Alerts
        "alert": "modules/utils/alerts",
        // Composer
        "composer": "modules/utils/composer"

    },

    /**
     * Shim Libraries
     */
    "jquery-confirm": {
        deps: ['jquery'],
        exports: 'confirm'
    },

    "dropzone": {
        deps: ['jquery'],
        exports: 'dropzone'
    },

    "bootstrap": {
        "deps": [
            'jquery'
            // 'popper'
        ]
    }
});

require([
    'settings',
    'messages',
    'alert',
    'feed',
    'composer',
], () => console.log("RequireJS Modules Loaded"));
