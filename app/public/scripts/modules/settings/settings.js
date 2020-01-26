define([
    'jquery',
    'tagify',
    'composer'
], ($, Tagify, composer) => {
    "use strict";

    $(document).ready(() => {
        let input = document.querySelector("input[name=courses]");
        let tagify = new Tagify(input);

        // Triggers
        // Edit Profile Picture Sidebar
        $('#edit-profile').on('click', event => {
            $('#editProfile').modal('show');
        });
        // Edit Password
        $('#change-password').on('click', event => {
            $('#changePasswordForm').modal('show');
        });

        // Perform Put Actions
        $('#changePasswordButton').on('click', event => {
            let newPassword = $('#password').val();

            $.ajax({
                type: "PUT",
                url: 'http://localhost:3030/settings/change-password',
                data: `password=${newPassword}`,
                success: result => {
                    console.log(result);
                },
                error: result => {
                    console.log(result);
                    alert(result);
                }
            })
        });


        // Submit Changes
        const $infoForm = $('#update-user-info');
        $infoForm.on('submit', handler => {
            handler.preventDefault();
            // quill-settings-about

            // let content = $("#quill-settings-about .ql-editor").html();

            // $("#bio").attr("value", content);

            let dataArray = $infoForm.serializeArray();
            // (data, id, attr)
            let dataJson = composer.parseData(dataArray, '#bio', 'value');
            // dataArray.forEach(entry => {
            //     dataJson[entry.name] = entry.value;
            // });/settings/update

            console.log(dataJson);
            $.ajax({
                url: `/api/settings/update`,
                type: 'put',
                data: dataJson,
                success: response => console.log(response),
                error: response => console.log(response)
            });
        });


        // TODO: this must become common to any page after login
        $('#signout').on('click', () => {
            document.cookie = "userToken" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            $(location).attr('href', '/')
        });
    });
});

