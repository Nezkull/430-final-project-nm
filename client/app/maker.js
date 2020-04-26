const handleAccount = (e) => {
    e.preventDefault();
    
    if($("#accountName").val() == '' || $("#username").val() == '' || $("#pasword").val() == ''){
        handleError("All fields are required");
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
        <form id="accountForm"
            onSubmit={handleAccount}
            name="accountForm"
            action="/maker"
            method="POST"
            className="accountForm"
        >
            <select id="image" onChange={testFunc}>
                <option value="/assets/img/originIcon.jpg">Origin</option>
                <option value="/assets/img/steamIcon.png">Steam</option>
                <option value="/assets/img/epicIcon.png">Epic</option>
            </select>
            <label htmlFor="name">Name: </label>
            <input id="accountName" type="text" name="name" placeholder="Account Name"/>
            <label htmlFor="head">Username: </label>
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

const Profile = (account) => {
    return (
        <input className="userProfile" type="button" value="Profile Settings" onClick={(e) => userProfile(account, e)}></input>
    );
};

const userProfile =(account, e) => {
    e.preventDefault();
    ReactDOM.render(
        <UserAccount account={account} />, document.querySelector("#nodes")
    );
    document.querySelector("#createNode").style.display = "none";
};

// maybe this renders the user profile and from there the info is shown and these options are available
// this will be rendered on a button click similar to that of moreInfo, it will 
const UserAccount = (account) => {
    console.dir(account);
    console.log(account.account['username']);
    // const temp = JSON.parse(props);
    // <h2 className="profileUsername">{props.username}</h2>
    // <h2 className="profilePassword">{props.password}</h2>
    return (
        <div className="userSettings">
            <h2 className="profileUsername">{account.username}</h2>
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
            <h2 className="nodeName">{account.name}</h2>
            <img src="/assets/img/steamIcon.png" alt="infoNodeImage" className="infoNodeImage"/>
            <h3 className="username"> Username:{account.username} </h3>
            <h3 className="password"> Password:{account.password} </h3>
            <h3 className="email"> Email:{account.email} </h3>
            <h3 className="image"> image:{account.image} </h3>
            <input className="closeButton" type="button" value="Close" onClick={loadAccountsFromServer}/>
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
                <img src="/assets/img/steamIcon.png" alt="steamIcon" className="nodeImage" height="300" width="300"/>
                <h3 className="accountName"> Name:{account.name} </h3>
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
};

const loadAccount = () => {
    sendAjax('GET', '/getAccount', null, (account) => {
        ReactDOM.render(
            <Profile account={account}/>, document.querySelector("#profile")
        );
    });
};

// will be similar probably
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