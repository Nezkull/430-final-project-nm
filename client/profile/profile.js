const testFunc = (e) => {
  e.preventDefault();
    
  alert("unimplemented");
};

const loadAccount = () => {
    sendAjax('GET', '/getAccount', null, (account) => {
        ReactDOM.render(
            <UserAccount account={account} />, document.querySelector("#app")
        );
    });
};

const UserAccount = ({account}) => {
    console.dir(account);
    
    return (
        <div className="userSettings">
            <h2 className="profileUsername">{account.username}</h2>
            <h2 className="profileDate">{account.createdDate}</h2>
            <input className="changePass" type="button" value="Change Password" onClick={loadPasswordChangeForm}/>
            <input className="premium" type="button" value="Get Premium" onClick={testFunc}/>
        </div>
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
const handlePasswordChange = (e) => {
    e.preventDefault();
    
    // if($("#username").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == ''){
    if($("#oldPass").val() == '' || $("#newPass").val() == ''){
        handleError("all fileds are required.");
        return false;
    } else if($("#oldPass").val() === $("#newPass").val()){
        handleError("A new password is required.");
        return false;
    }
    
    sendAjax('POST', $("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize(), redirect);
    
    loadAccount();
    
    return false;
};

const PasswordChangeForm = (props) => {
    return (
    <form id="passwordChangeForm" onSubmit={handlePasswordChange} name="passwordChangeForm"
        action="/passwordChange" method="POST" className="passwordChangeForm"
     >
    
    <label htmlFor="oldPass">Old Password: </label>
    <input id="oldPass" type="text" name="oldPass" placeholder="Old Password"/>
    <label htmlFor="newPass">New Password: </label>
    <input id="newPass" type="text" name="newPass" placeholder="New Password"/>
    <input type="hidden" name="_csrf" value={props.csrf}/>
    <input className="passwordSubmit" type="submit" value="Submit New Password"/>
    </form>
    );
};

const setup = function(csrf) {
    ReactDOM.render(
        <PasswordChangeForm csrf={csrf} />,  document.querySelector("#app")
    );
};

const loadPasswordChangeForm = () => {
    
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};


$(document).ready(function() {
    loadAccount();
});