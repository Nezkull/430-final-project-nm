// not sure if ill need this, probably won't
const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#message").animate({width: 'toggle'}, 350);
};

// need this
const redirect = (response) => {
    $("#message").animate({width:'hide'}, 350);
    window.location = response.redirect;
};

// need this
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};