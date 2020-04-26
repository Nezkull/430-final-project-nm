const handleAccount = (e) => {
    e.preventDefault();
    
    if($("#accountName").val() == '' || $("#username").val() == '' || $("#pasword").val() == ''){
        handleError("All fields are required.");
        return false;
    }
    
    sendAjax('POST', $("#accountForm").attr("action"), $("#accountForm").serialize(), function() {
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
const AccountForm = (props) => {
    return (
        <form id="accountForm" onSubmit={handleAccount} name="accountForm"
            action="/maker" method="POST" className="accountForm"
        >
            <select id="image" onChange={testFunc}>
                <option value="/assets/img/originIcon.jpg">Origin</option>
                <option value="/assets/img/steamIcon.png">Steam</option>
                <option value="/assets/img/epicIcon.png">Epic</option>
            </select>
            <label htmlFor="name">Name: </label>
            <input id="accountName" type="text" name="name" placeholder="Account Name"/>
            <label htmlFor="username">Username: </label>
            <input id="username" type="text" name="username" placeholder="Username"/>
            <label htmlFor="password">Password: </label>
            <input id="password" type="text" name="password" placeholder="Password"/>
            <label htmlFor="email">Email: </label>
            <input id="email" type="text" name="email" placeholder="Email"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeAccountSubmit" type="submit" value="Make Account"/>
        </form>
    );
};

// 
const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if($("#username").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == ''){
        handleError("all fileds are required.");
        return false;
    } else if($("#oldPass").val() === $("#newPass").val()){
        handleError("A new password is required.");
        return false;
    }
    
    // update the account info
    // I don't think that I'm supposed to use sendAjax like above
    
    return false;
};

// change action over to something better later
const ChangePasswordForm = (props) => {
    <form id="changePasswordForm" onSubmit={handlePasswordChange} name="changePasswordForm"
        action="/maker" method="POST" className="changePasswordForm"
     >
    <label htmlFor="username">Username: </label>
    <input id="username" type="text" name="username" placeholder="Username"/>
    <label htmlFor="oldPass">Old Password: </label>
    <input id="oldPass" type="text" name="oldPass" placeholder="Old Password"/>
    <label htmlFor="newPass">New Password: </label>
    <input id="newPass" type="text" name="newPass" placeholder="New Password"/>
    <input className="makeAccountSubmit" type="submit" value="Submit New Password"/>
    </form>
};

const Profile = (account) => {  
    return (
        <input className="userProfileButton" type="button" value="Profile Settings" onClick={(e) => userProfile(account, e)}></input>
    );
};

const PremiumMemberForm = (props) => {
    <form id="premiumMemberForm" onSubmit={testFunc} name="premiumMemberForm"
        action="/maker" method="POST" className="premiumMemberForm"
    >
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" name="email" placeholder="john.doe@hotmail.com"/>
        <label htmlFor="phoneNum">Phone #: </label>
        <input id="phoneNum" type="tel" name="phoneNum" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="555-555-5556"/>
        <label htmlFor="ccNum">Credit Card: </label>
        <input id="ccNum" type="number" name="ccNum" pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" placeholder="5555 5555 5555 5655"/>
    </form>
}

const userProfile =(account, e) => {
    e.preventDefault();
    ReactDOM.render(
        <UserAccount account={account} />, document.querySelector("#nodes")
    );
    document.querySelector("#createNode").style.display = "none";
    document.querySelector("#profile").style.display = "none";
};

// maybe this renders the user profile and from there the info is shown and these options are available
// this will be rendered on a button click similar to that of moreInfo, it will 
const UserAccount = ({account}) => {
    console.dir(account);
    
    return (
        <div className="userSettings">
            <h2 className="profileUsername">{account.csrfToken}</h2>
            <input className="changePass" type="button" value="Change Password" onClick={testFunc}/>
            <input className="premium" type="button" value="Get Premium" onClick={testFunc}/>
            <input className="closeButton" type="button" value="Close" onClick={loadAccountsFromServer}/>
        </div>
    );
};

// I'm planning on using this to load different account submission forms, email or other. OR do something entirely different with this
const testFunc = (e) => {
  e.preventDefault();
    
  let x = document.getElementById('image').value;
  alert("Selected: " + x);
};

// this will render the info for specific account so username, password, and email are visible, from this I'm planning on having each account have a settings, info can be changed or deleted entirely
// will add another button to the form, this will allow user to edit content
const accountInfo = (account, e) => {
    e.preventDefault();
    ReactDOM.render(
        <NodeInfo account={account} />, document.querySelector("#nodes")
    );
};

const NodeInfo = ({account}) => {
    return (
        <div className="nodeInfo">
            <img src="/assets/img/steamIcon.png" alt="nodeImg" className="nodeImg"/>
            <h1 className="nodeName">{account.name}</h1>
            <h3 className="nodeUsername"> Username:{account.username} </h3>
            <h3 className="nodePassword"> Password:{account.password} </h3>
            <h3 className="nodeEmail"> Email:{account.email} </h3>
            <input className="nodeClose" type="button" value="X" onClick={loadAccountsFromServer}/>
        </div>
    );
};

const AccountList = function(props) {
    if(props.accounts.length === 0){
        return (
            <div className="accountList">
                <h3 className="emptyAccount">No Accounts yet</h3>
            </div>
        );
    }
    /**/
    const accountNodes = props.accounts.map(function(account) {
        return (
            <div key={account._id} className="account" onClick={(e) => accountInfo(account, e)}>
                <h3 className="accountName"> Account Name:{account.name} </h3>
                <img src="/assets/img/steamIcon.png" alt="steamIcon" className="nodeImage" height="300" width="300"/>
            </div>
        );
    });
    
    return (
        <div className="accountList">
            {accountNodes}
        </div>
    );
};

const loadAccountsFromServer = () => {
    sendAjax('GET', '/getNodes', null, (data) => {
        ReactDOM.render(
            <AccountList accounts={data.accounts} />, document.querySelector("#nodes")
        );
    });
    
    document.querySelector("#createNode").style.display = "block";
    document.querySelector("#profile").style.display = "block";
};

const loadAccount = () => {
    sendAjax('GET', '/getAccount', null, (account) => {
        ReactDOM.render(
            <Profile account={account}/>, document.querySelector("#profile")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <AccountForm csrf={csrf} />, document.querySelector("#createNode")
    );
    
    ReactDOM.render(
        <AccountList accounts={[]} />, document.querySelector("#nodes")
    );
    
    loadAccount();
    
    loadAccountsFromServer();
};

const getToken = () => {
    
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});