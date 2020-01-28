define([
    'jquery'
], ($) => {

    /**
     * User Logout
     */
    $('#signout').on('click', () => {
        alert("Deleting cookie");
        document.cookie = 'userToken=""; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        $(location).attr('href', 'http://localhost:3030/');
    });
});