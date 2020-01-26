define(['jquery', 'alert', 'jquery-confirm', 'bootstrap'], function($, alert) {
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
                @${content.createdBy}
                </t>
                <br>
                <div class="text-justify">
                   ${content.text}
                </div>
            </div>

        </div>
    </div>`;

    $('#comments-container').append(info);
  }

  $(document).ready(() => {
    /**
     * View Comments Modal
     */
    $(document).on('click', '.view-comments', event => {
      let id = $(event.currentTarget).attr('data-value');
      $.ajax({
        type: 'get',
        url: `/api/userpost/comments/${id}`,
        success: response => {
          $('#comments-container').html('');
          if (response.length > 0) {
            response[0].Comments.forEach(content => formatComment(content));
          }
          $('#comments-modal').modal();
        },
        error: response => {}
      });
    });
    /**
     * Edit a post
     */

    $(document).on('click', '.edit-post', event => {
      let id = $(event.currentTarget).attr('data-value');

      $.ajax({
        method: 'GET',
        url: `/api/userpost/${id}`,
        success: response => {
          $('#edit-post-text').val(response.content.text);
          $('#edit-post-id').attr('value', response._id);
          $('#edit-post-modal').modal();
        },
        error: response => console.log(response)
      });
    });

    // update-post-button
    $('#update-post-button').on('click', () => {
      let text = $('#edit-post-text').val();
      let id = $('#edit-post-id').attr('value');

      $.ajax({
        method: 'PUT',
        url: `/api/userpost/${id}`,
        data: {
          content: {
            text: text
          }
        },
        success: response => console.log(response),
        error: response => console.log(response)
      });
    });

    /**
     * Delete a Given Post
     */
    $(document).on('click', '.delete-post', event => {
      let id = $(event.currentTarget).attr('data-value');
      $.confirm({
        title: 'Remove Post?',

        content: 'Are you sure?',
        buttons: {
          confirm: () => {
            $.alert('You removed your Post.');

            $.ajax({
              type: 'delete',
              url: `/api/userpost/${id}`,
              success: response => {
                alert.warningAlert({
                  title: 'Post Deleted',
                  body: 'You removed your Post.'
                });

                console.log(response);
                $(`#${response._id}`).remove();
              },
              error: response => {
                console.log(response);
              }
            });
          },
          cancel: () => {}
        }
      });
    });
  });
});
