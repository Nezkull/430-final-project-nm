"use strict";

var handleAccount = function handleAccount(e) {
  e.preventDefault();

  if ($("#accountName").val() == '' || $("#username").val() == '' || $("#pasword").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#accountForm").attr("action"), $("#accountForm").serialize(), function () {
    loadAccountsFromServer();
  });
  return false;
};
/*
const UserAccount = (props) => {
    return (
        <div className="nodeInfo">
            <h3 className="username"> Username:{props.username} </h3>
            <input className="closeButton" type="button" value="Close" onClick={loadAccountsFromServer}/>
        </div>
    );
};
*/


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
      htmlFor: "head"
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
};

var Profile = function Profile(account) {
  return (/*#__PURE__*/React.createElement("input", {
      className: "userProfile",
      type: "button",
      value: "Profile Settings",
      onClick: function onClick(e) {
        return userProfile(account, e);
      }
    })
  );
};

var userProfile = function userProfile(account, e) {
  e.preventDefault();
  ReactDOM.render( /*#__PURE__*/React.createElement(UserAccount, {
    account: account
  }), document.querySelector("#nodes"));
  document.querySelector("#createNode").style.display = "none";
}; // maybe this renders the user profile and from there the info is shown and these options are available
// this will be rendered on a button click similar to that of moreInfo, it will 


var UserAccount = function UserAccount(account) {
  console.dir(account);
  console.log(account.account['username']); // const temp = JSON.parse(props);
  // <h2 className="profileUsername">{props.username}</h2>
  // <h2 className="profilePassword">{props.password}</h2>

  return (/*#__PURE__*/React.createElement("div", {
      className: "userSettings"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "profileUsername"
    }, account.username), /*#__PURE__*/React.createElement("h2", {
      className: "profilePassword"
    }, account.password), /*#__PURE__*/React.createElement("h2", {
      className: "profile_id"
    }, account._id), /*#__PURE__*/React.createElement("input", {
      className: "changePass",
      type: "button",
      value: "Change Password",
      onClick: testFunc
    }), /*#__PURE__*/React.createElement("input", {
      className: "premium",
      type: "button",
      value: "Get Premium",
      onClick: testFunc
    }), /*#__PURE__*/React.createElement("input", {
      className: "closeButton",
      type: "button",
      value: "Close",
      onClick: loadAccountsFromServer
    }))
  );
}; // I'm planning on using this to load different account submission forms, email or other. OR do something entirely different with this


var testFunc = function testFunc(e) {
  e.preventDefault();
  var x = document.getElementById('image').value;
  alert("Selected: " + x);
}; // this will render the info for specific account so username, password, and email are visible, from this I'm planning on having each account have a settings, info can be changed or deleted entirely
// will add another button to the form, this will allow user to edit content


var accountInfo = function accountInfo(account, e) {
  e.preventDefault();
  ReactDOM.render( /*#__PURE__*/React.createElement(NodeInfo, {
    account: account
  }), document.querySelector("#nodes"));
};

var NodeInfo = function NodeInfo(_ref) {
  var account = _ref.account;
  return (/*#__PURE__*/React.createElement("div", {
      className: "nodeInfo"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "nodeName"
    }, account.name), /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/steamIcon.png",
      alt: "infoNodeImage",
      className: "infoNodeImage"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "username"
    }, " Username:", account.username, " "), /*#__PURE__*/React.createElement("h3", {
      className: "password"
    }, " Password:", account.password, " "), /*#__PURE__*/React.createElement("h3", {
      className: "email"
    }, " Email:", account.email, " "), /*#__PURE__*/React.createElement("h3", {
      className: "image"
    }, " image:", account.image, " "), /*#__PURE__*/React.createElement("input", {
      className: "closeButton",
      type: "button",
      value: "Close",
      onClick: loadAccountsFromServer
    }))
  );
};

var AccountList = function AccountList(props) {
  if (props.accounts.length === 0) {
    return (/*#__PURE__*/React.createElement("div", {
        className: "accountList"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "emptyAccount"
      }, "No Accounts yet"))
    );
  }
  /**/


  var accountNodes = props.accounts.map(function (account) {
    return (/*#__PURE__*/React.createElement("div", {
        key: account._id,
        className: "account",
        onClick: function onClick(e) {
          return accountInfo(account, e);
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/steamIcon.png",
        alt: "steamIcon",
        className: "nodeImage",
        height: "300",
        width: "300"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "accountName"
      }, " Name:", account.name, " "))
    );
  });
  return (/*#__PURE__*/React.createElement("div", {
      className: "accountList"
    }, accountNodes)
  );
};

var loadAccountsFromServer = function loadAccountsFromServer() {
  sendAjax('GET', '/getNodes', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(AccountList, {
      accounts: data.accounts
    }), document.querySelector("#nodes"));
  });
  document.querySelector("#createNode").style.display = "block";
};

var loadAccount = function loadAccount() {
  sendAjax('GET', '/getAccount', null, function (account) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Profile, {
      account: account
    }), document.querySelector("#profile"));
  });
}; // will be similar probably


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(AccountForm, {
    csrf: csrf
  }), document.querySelector("#createNode"));
  ReactDOM.render( /*#__PURE__*/React.createElement(AccountList, {
    accounts: []
  }), document.querySelector("#nodes"));
  loadAccount();
  loadAccountsFromServer();
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

// not sure if ill need this, probably won't
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
