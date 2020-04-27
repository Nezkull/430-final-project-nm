"use strict";

var accountInfo = function accountInfo(account, e) {
  e.preventDefault();
  ReactDOM.render( /*#__PURE__*/React.createElement(NodeInfo, {
    account: account
  }), document.querySelector("#app"));
}; // layout for nodes is pretty well done
// form


var NodeInfo = function NodeInfo(_ref) {
  var account = _ref.account;
  return (/*#__PURE__*/React.createElement("div", {
      className: "nodeInfo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/steamIcon.png",
      alt: "nodeImg",
      className: "nodeImg"
    }), /*#__PURE__*/React.createElement("h1", {
      className: "nodeName"
    }, account.name), /*#__PURE__*/React.createElement("h3", {
      className: "nodeUsername"
    }, " Username:", account.username, " "), /*#__PURE__*/React.createElement("h3", {
      className: "nodePassword"
    }, " Password:", account.password, " "), /*#__PURE__*/React.createElement("h3", {
      className: "nodeEmail"
    }, " Email:", account.email, " "), /*#__PURE__*/React.createElement("input", {
      className: "nodeClose",
      type: "button",
      value: "X",
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

  var accountNodes = props.accounts.map(function (account) {
    return (/*#__PURE__*/React.createElement("div", {
        key: account._id,
        className: "account",
        onClick: function onClick(e) {
          return accountInfo(account, e);
        }
      }, /*#__PURE__*/React.createElement("h3", {
        className: "accountName"
      }, " Account Name:", account.name, " "), /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/steamIcon.png",
        alt: "steamIcon",
        className: "nodeImage",
        height: "300",
        width: "300"
      }))
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
    }), document.querySelector("#app"));
  });
};

$(document).ready(function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(AccountList, {
    accounts: []
  }), document.querySelector("#app"));
  loadAccountsFromServer();
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
