define([
    // Nothing
], function () {
    "use strict";

    function Person(name, city) {
        this.name = name;
        this.city = city;

        this.overridePerson = () => {
            return `HelloWorld! I'm ${this.name} from ${this.city}`;
        }
    }

    return Person;

});