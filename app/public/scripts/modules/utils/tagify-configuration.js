define([
    'jquery',
    'tagify'
], ($, Tagify) => {
    "use strict";

    return {
        config: (selector, api) => {
            let tagifyInput = document.querySelector(selector);
            let tagifyObj;
            let onInput = e => {
                let value = e.detail.value;
                tagifyObj.settings.whitelist.length = 0;

                $.ajax({
                    method: "GET",
                    url: `${api}/${value}`,
                    success: response => {
                        console.log(response);

                        response.forEach(user => tagifyObj.settings.whitelist.push(user.username));
                    },
                    error: response => {
                        console.log(response);
                    }
                });
                console.log(value);
            };


            tagifyObj = new Tagify(tagifyInput, {whitelist: []});
            tagifyObj.on('input', onInput);

            return tagifyObj;
        }
    }
});