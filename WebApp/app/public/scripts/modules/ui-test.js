define([
    'jquery',
    'Person'
], function($, Person) {
    "use strict";

    let about = new Person("Miguel Solans", "Braga");

    $(document).ready( () => {

        $("#about").append(about.overridePerson());

    });
});