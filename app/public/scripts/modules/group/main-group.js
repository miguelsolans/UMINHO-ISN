define([
    'jquery',
    'tagifyWrapper',
    'bootstrap'
], ($, tagify) => {
    "use strict";

    $(document).ready(() => {
        // Grupo

        /**
         * Create a new Post to Group
         */
        const $postForm = $('#feed-post-form');

        $postForm.on('submit', () => {

            let content = $(".quill-composer .ql-editor").html();
            $('#user-post-text').attr('value', content);

            alert(content);

            $postForm.unbind('submit').submit();
        });

        /**
         * Group Administration
         */
        // $("#").submit(function(e){
        //     alert('submit intercepted');
        //     e.preventDefault(e);
        // });


        let tagifyConfig = tagify.config( "input[name=members]" ,"/api/user/match");
    });
});