define([
    'jquery'

], function ($) {
    'use strict';

    function formatComment(content) {
        let info = `<div class="post-info border-bottom">
        <div class="row">
            <div class="col-2 p-3">
                <div class="circle-avatar"
                    style="background-image:url(${content.InfoComment[0].photo})"></div>
            </div>
            <div class="col-8">
                <t class="font-weight-bold">
                    ${content.InfoComment[0].fullName}
                </t>
                <t class="text-muted">
                @${content.username}
                </t>
                <br>
                <div class="text-justify">
                   ${content.text}
                </div>
            </div>
        </div>
    </div>`

        $('#comments-container').append(info);

    }
    $(document).ready(() => {
        $(document).on("click", ".view-comments", event => {
            let id = $(event.currentTarget).attr('id');
            $.ajax({
                type: "get",
                url: `/api/userposts/comments/${id}`,
                success: response => {
                    console.table(response);
                    $('#comments-container').html()
                    response.forEach(content => formatComment(content));
                },
                error: response => {

                }
            })

        })
    })
});