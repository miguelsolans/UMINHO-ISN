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
            //url: 'http://localhost:3030/settings/change-password',
            url: 'http://isn-uminho.herokuapp.com/settings/change-password',
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

});