"use strict";

var handleAccount = function handleAccount(e) {
  e.preventDefault();

  if ($("#accountName").val() == '' || $("#username").val() == '' || $("#pasword").val() == '') {
    handleError("All fields are required.");
    return false;
  }

  sendAjax('POST', $("#accountForm").attr("action"), $("#accountForm").serialize(), function () {
    loadAccountsFromServer();
  });
  return false;
};

var AccountForm = function AccountForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "accountForm",
      onSubmit: handleAccount,
      name: "accountForm",
      action: "/maker",
      method: "POST",
      className: "accountForm"
    }, /*#__PURE__*/React.createElement("select", {
      id: "image",
      onChange: testFunc
    }, /*#__PURE__*/React.createElement("option", {
      value: "/assets/img/originIcon.jpg"
    }, "Origin"), /*#__PURE__*/React.createElement("option", {
      value: "/assets/img/steamIcon.png"
    }, "Steam"), /*#__PURE__*/React.createElement("option", {
      value: "/assets/img/epicIcon.png"
    }, "Epic")), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "accountName",
      type: "text",
      name: "name",
      placeholder: "Account Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "username",
      type: "text",
      name: "username",
      placeholder: "Username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "password"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "password",
      type: "text",
      name: "password",
      placeholder: "Password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "Email: "), /*#__PURE__*/React.createElement("input", {
      id: "email",
      type: "text",
      name: "email",
      placeholder: "Email"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeAccountSubmit",
      type: "submit",
      value: "Make Account"
    }))
  );
}; // this needs to be seperated out and modified


var PremiumMemberForm = function PremiumMemberForm(props) {
  /*#__PURE__*/
  React.createElement("form", {
    id: "premiumMemberForm",
    onSubmit: testFunc,
    name: "premiumMemberForm",
    action: "/maker",
    method: "POST",
    className: "premiumMemberForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "email"
  }, "Email: "), /*#__PURE__*/React.createElement("input", {
    id: "email",
    type: "email",
    name: "email",
    placeholder: "john.doe@hotmail.com"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "phoneNum"
  }, "Phone #: "), /*#__PURE__*/React.createElement("input", {
    id: "phoneNum",
    type: "tel",
    name: "phoneNum",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    placeholder: "555-555-5556"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "ccNum"
  }, "Credit Card: "), /*#__PURE__*/React.createElement("input", {
    id: "ccNum",
    type: "number",
    name: "ccNum",
    pattern: "[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}",
    placeholder: "5555 5555 5555 5655"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makePremiumPayment",
    type: "button",
    value: "Submit Payment Info"
  }));
}; // I'm planning on using this to load different account submission forms, email or other. OR do something entirely different with this


var testFunc = function testFunc(e) {
  e.preventDefault();
  var x = document.getElementById('image').value;
  alert("Selected: " + x);
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(AccountForm, {
    csrf: csrf
  }), document.querySelector("#createNode"));
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
