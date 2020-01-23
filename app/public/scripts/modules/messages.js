
$(document).ready( () => {
    $("#chat-selected").hide();
    let previousConversation;

    /**
     * Open a Given Conversation
     */
    $(document).on('click', '.open-conversation', event => {
        let id = $(event.currentTarget).attr('id');

        if(previousConversation !== undefined) {
            console.log(`Previous: ${previousConversation}`);
            $(`#${previousConversation}`).removeClass('active');
        }

        event.currentTarget.className += " active";

        previousConversation = id;

        console.log(id);

        $.ajax({
            type: 'GET',
            url: `/messenger/${id}`,
            success: response => {
                $("#messages-wrapper").html("");
                $("#no-chat-selected").hide();
                $("#chat-selected").show();

                $("#chatName").text(response.name);
                $('input[name=chatId]').val(response._id);

                response.messages.forEach(message => {
                    $("#messages-wrapper").append(`<li class="list-group-item">${message.by}: ${message.text}</li>`)
                });
                // messages-wrapper

                console.table(response.messages);
            },
            error: response => {
                console.log(response);
            }
        });
    });


    /**
     * Send a Message
     */
    $("#send-message-button").on('click', event => {
        console.log("Sending message...");

        let msg = $("#message-body-form").val();
        let chatId = $('input[name=chatId]').val();

        let body = {
            text: msg,
            chatId: chatId
        };

        alert(chatId);
        $.ajax({
            type: 'put',
            url: `/messenger`,
            contentType: 'application/json',
            data: JSON.stringify(body),
            success: response => {
                alert(response);
            },
            error: response => {
                console.log(response);
            }
        });

        alert(msg);
    })
});