define([
    'jquery',
    'quill'
], ($, Quill) => {
    "use strict";

    /**
     * QuillJS Configuration
     */
    const quill = new Quill('.quill-composer', {
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

    return {
        quill: this.quill,
        parseData: (data, id, attr) => {
            let content = $(".quill-composer .ql-editor").html();

            $(id).attr(attr, content);

            let dataJson = {};
            data.forEach(entry => {
                dataJson[entry.name] = entry.value;
            });
            return dataJson;
        }
    }
});

