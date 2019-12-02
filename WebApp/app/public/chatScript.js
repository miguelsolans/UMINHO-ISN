// TODO: Passar para a pasta modules e apagar depois de testar

$(document).ready(() => {
    const quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Reply to chat...',
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

    $('#send-message').click( () => {
        let msgTxt =  quill.container.firstChild.innerHTML;
        console.log(msgTxt);
        $("#message1").append(msgTxt);
        console.log(msgTxt);
    });
});