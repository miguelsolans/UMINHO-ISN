const addMessage = (message) => {
    $("#messages-wrapper").append(`<li class="list-group-item">${message.by}: ${message.text}</li>`);
    console.log("Adding message...");
    console.table(message);
    // console.(message.by);
    // alert(message.text);
};


$(document).ready( () => {
    $("#chat-selected").hide();
    let previousConversation;

    /**
     * Create a new Conversation Modal
     */
    $('#new-chat').on('click', event => {
        $("#new-chatroom-modal").modal();
    });

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
            url: `/api/messenger/${id}`,
            success: response => {
                $("#messages-wrapper").html("");
                $("#no-chat-selected").hide();
                $("#chat-selected").show();

                $("#chatName").text(response.name);
                $('input[name=chatId]').val(response._id);
                $("#leave-conversation").attr('value', response._id);

                response.messages.forEach(message => {
                    addMessage(message);
                });
                // messages-wrapper

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

        $.ajax({
            type: 'put',
            url: `/api/messenger`,
            contentType: 'application/json',
            data: JSON.stringify(body),
            success: response => {
                body.by = "me";
                addMessage(body);
            },
            error: response => {
                // Oops...
                console.log(response);
            }
        });
    });

    /**
     * Remove myself from conversation
     */
    $(document).on('click', '#leave-conversation', event => {
        let id = $(event.currentTarget).attr('value');

        alert(id);

        $.ajax({
            type: 'delete',
            url: `/api/messenger/${id}`,
            success: response => {
                console.log(response);
            },
            error: response => {
                console.log(response);
            }
        })
    });


    /**
     * Socketio Bidirectional Communication
     *
     */
    // let socket = io();
    //
    // socket.on('connection', () => {
    //     console.log("CONNECTING...");
    // })
});