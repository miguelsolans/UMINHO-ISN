$(document).ready(() => {
    let input = document.querySelector("input[name=course]");
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


    /**
     * QuillJS Configuration
     */
    const quill = new Quill('#quill-settings-about', {
        theme: 'snow',
        placeholder: 'Write something cool 😎',
        formats: [
            'bold',
            'header',
            'italic',
            'link',
            'list',
            'blockquote',
            'image',
            'indent'
        ],
        modules: {
            toolbar: [
                ['bold', 'italic', 'link'],
                ['blockquote', {'list': 'ordered'}, {'list': 'bullet'}],
            ],
            clipboard: {
                matchVisual: false // https://quilljs.com/docs/modules/clipboard/#matchvisual
            }
        }
    });


    function submitChanges() {
        let content = $("#quill-settings-about").html();
        alert(content);
        $("#bio").attr("bio", content);
    }

    // let form = document.querySelector("#quill-settings-about")
    // quill-settings-about



    $('#signout').on('click', () => {
        document.cookie = "userToken" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        //let cookies = $.cookie();

        //cookies.forEach(cookie => $.removeCookie(cookie));

    });
});