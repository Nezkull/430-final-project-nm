
const accountInfo = (account, e) => {
    e.preventDefault();
    ReactDOM.render(
        <NodeInfo account={account} />, document.querySelector("#app")
    );
};

// layout for nodes is pretty well done
// form
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
            <AccountList accounts={data.accounts} />, document.querySelector("#app")
        );
    });
};

$(document).ready(function() {
    ReactDOM.render(
        <AccountList accounts={[]} />, document.querySelector("#app")
    );
    
    loadAccountsFromServer();
});