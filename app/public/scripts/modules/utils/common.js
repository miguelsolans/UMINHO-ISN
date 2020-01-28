define([
    'jquery'
], ($) => {
    /**
     * User Logout
     */
    $('#signout').on('click', () => {
        document.cookie = "userToken" +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        window.location.href = '/';
    });
});