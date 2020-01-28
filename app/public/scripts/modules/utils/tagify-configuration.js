define([
    'jquery',
    'tagify'
], ($, Tagify) => {
    "use strict";

    return {
        config: (selector, api, field) => {
            let tagifyInput = document.querySelector(selector);
            let tagifyObj;
            let onInput = e => {
                let value = e.detail.value;
                tagifyObj.settings.whitelist.length = 0;

                $.ajax({
                    method: "GET",
                    url: `${api}/${value}`,
                    success: response => {
                        response.forEach(data => tagifyObj.settings.whitelist.push(data[field]));
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