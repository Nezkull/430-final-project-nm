"use strict";

var testFunc = function testFunc(e) {
  e.preventDefault();
  alert("unimplemented");
};

var loadAccount = function loadAccount() {
  sendAjax('GET', '/getAccount', null, function (account) {
    ReactDOM.render( /*#__PURE__*/React.createElement(UserAccount, {
      account: account
    }), document.querySelector("#app"));
  });
};

var UserAccount = function UserAccount(_ref) {
  var account = _ref.account;
  console.dir(account);
  return (/*#__PURE__*/React.createElement("div", {
      className: "userSettings"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "profileUsername"
    }, account.username), /*#__PURE__*/React.createElement("h2", {
      className: "profileDate"
    }, account.createdDate), /*#__PURE__*/React.createElement("input", {
      className: "changePass",
      type: "button",
      value: "Change Password",
      onClick: loadPasswordChangeForm
    }), /*#__PURE__*/React.createElement("input", {
      className: "premium",
      type: "button",
      value: "Get Premium",
      onClick: testFunc
    }))
  );
};
/*
const PremiumMemberForm = (props) => {
    <form id="premiumMemberForm" onSubmit={loadAccount} name="premiumMemberForm"
        action="/premiumMem" method="POST" className="premiumMemberForm"
    >
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" name="email" placeholder="john.doe@hotmail.com"/>
        <label htmlFor="phoneNum">Phone #: </label>
        <input id="phoneNum" type="tel" name="phoneNum" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="555-555-5556"/>
        <label htmlFor="ccNum">Credit Card: </label>
        <input id="ccNum" type="number" name="ccNum" pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" placeholder="5555 5555 5555 5655"/>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="makePremiumPayment" type="submit" value="Submit Payment Info"/>
    </form>
};

const loadPremiumForm = () => {
    sendAjax('GET', '/premiumMem', null, (csrf) => {
       ReactDOM.render(
            <PremiumMemberForm csrf={csrf.csrfToken} />, dopcument.querySelector("#app")
       ); 
    });
};
*/


var handlePasswordChange = function handlePasswordChange(e) {
  e.preventDefault(); // if($("#username").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == ''){

  if ($("#oldPass").val() == '' || $("#newPass").val() == '') {
    handleError("all fileds are required.");
    return false;
  } else if ($("#oldPass").val() === $("#newPass").val()) {
    handleError("A new password is required.");
    return false;
  }

  sendAjax('POST', $("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize(), redirect);
  loadAccount();
  return false;
};

var PasswordChangeForm = function PasswordChangeForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "passwordChangeForm",
      onSubmit: handlePasswordChange,
      name: "passwordChangeForm",
      action: "/passwordChange",
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

var loadPasswordChangeForm = function loadPasswordChangeForm() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  loadAccount();
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
