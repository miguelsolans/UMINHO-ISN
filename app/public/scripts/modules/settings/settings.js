define([
    'jquery',
    'tagify',
    'composer',
    'dropzone'
], ($, Tagify, composer, dropzone) => {
    "use strict";

    $(document).ready(() => {
        let input = document.querySelector("input[name=courses]");
        if (input !== null)
            new Tagify(input);

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


        // Settings Dropzone
        // let t = new dropzone.Dropzone("#settings-dropzone", { url: "/file/post"});
        $("#settings-dropzone").dropzone({
            url: "/settings/picture-update",
            uploadMultiple: false,
            acceptedFiles: 'image/*',
            success: function (file, res) {
                console.log('Upload success.');
                console.log(res);
            },
            error: function (file, res) {
                console.log('Upload error.');
                console.log(res);
            }
        });
    });

    $('#save-profile-picture').on('click', () => {
        $(location).attr("href", "/settings")
    })





    $('#update-user-info-social').on('submit', () => {
        let instagram = $('#instagram').val();
        let twitter = $('#twitter').val();
        let linkedIn = $('#linkedIn').val();
        let github = $('#github').val();
        let facebook = $('#facebook').val();


        $.ajax({
            method: "PUT",
            url: `/api/settings/updatesocial`,
            data: {
                instagram: instagram,
                twitter: twitter,
                linkedIn: linkedIn,
                github: github,
                facebook: facebook
            },
            success: response => {
                console.log(response);
                $(location).attr('href', '/settings');
            },
            error: response => console.log(response)
        });
    });

});