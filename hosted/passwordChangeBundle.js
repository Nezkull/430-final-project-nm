"use strict";

var handlePasswordChange = function handlePasswordChange(e) {
  e.preventDefault();

  if ($("#username").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == '') {
    handleError("all fileds are required.");
    return false;
  } else if ($("#oldPass").val() === $("#newPass").val()) {
    handleError("A new password is required.");
    return false;
  }

  sendAjax('POST', $("#passwordChange").attr("action"), $("#passwordChange").serialize(), redirect);
  return false;
};

var PasswordChangeForm = function PasswordChangeForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "passwordChangeForm",
      onSubmit: handlePasswordChange,
      name: "passwordChangeForm",
      action: "/passwordChanged",
      method: "POST",
      className: "passwordChangeForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "oldPass"
    }, "Old Password: "), /*#__PURE__*/React.createElement("input", {
      id: "oldPass",
      type: "text",
      name: "oldPass",
      placeholder: "Old Password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "newPass"
    }, "New Password: "), /*#__PURE__*/React.createElement("input", {
      id: "newPass",
      type: "text",
      name: "newPass",
      placeholder: "New Password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "passwordSubmit",
      type: "submit",
      value: "Submit New Password"
    }))
  );
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PasswordChangeForm, {
    csrf: csrf
  }), document.querySelector("#app"));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

// not sure if ill need this, probably won't, actually will
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#message").animate({
    width: 'toggle'
  }, 350);
}; // need this


var redirect = function redirect(response) {
  $("#message").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
}; // need this


var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
