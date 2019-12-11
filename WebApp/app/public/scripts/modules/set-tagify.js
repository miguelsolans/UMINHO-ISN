$(document).ready(() => {
    let myDropzone = new Dropzone("div#myId", { url: "/file/post"});
    let input = document.querySelector("input[name=course]");
    let tagify = new Tagify(input);


    $('#edit-profile').on('click', event => {
        $('#myModal').modal('show')
    });


});