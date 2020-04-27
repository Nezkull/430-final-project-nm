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

// this needs to be seperated out and modified
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
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="makePremiumPayment" type="button" value="Submit Payment Info"/>
    </form>
}

// I'm planning on using this to load different account submission forms, email or other. OR do something entirely different with this
const testFunc = (e) => {
  e.preventDefault();
    
  let x = document.getElementById('image').value;
  alert("Selected: " + x);
};

const setup = function(csrf) {
    ReactDOM.render(
        <AccountForm csrf={csrf} />, document.querySelector("#createNode")
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