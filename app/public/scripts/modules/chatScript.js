$(document).ready(() => {
    const quill = new Quill('#composer', {
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
});