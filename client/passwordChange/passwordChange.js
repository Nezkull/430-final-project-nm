const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if($("#username").val() == '' || $("#oldPass").val() == '' || $("#newPass").val() == ''){
        handleError("all fileds are required.");
        return false;
    } else if($("#oldPass").val() === $("#newPass").val()){
        handleError("A new password is required.");
        return false;
    }
    
    sendAjax('POST', $("#passwordChange").attr("action"), $("#passwordChange").serialize(), redirect);
    
    return false;
};

const PasswordChangeForm = (props) => {
    return (
    <form id="passwordChangeForm" onSubmit={handlePasswordChange} name="passwordChangeForm"
        action="/passwordChanged" method="POST" className="passwordChangeForm"
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

const getToken = () => {
    
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});