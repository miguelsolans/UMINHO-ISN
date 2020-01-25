function successAlert({title, body}) {

}

function primaryAlert({title, body}) {

}

function infoAlert({title, body}) {

}

function warningAlert({title, body}) {
    $('#alerts-container').append(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <h4 class="alert-heading">${title}</h4><p>${body}</p>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                   </div>`);
}

function dangerAlert({title, body}) {

}

function darkAlert({title, body}) {

}
