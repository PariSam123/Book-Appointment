function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phoneNumber = event.target.phoneNumber.value;
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);
    const obj = {
        name,
        email,
        phoneNumber
    }
    //localStorage.setItem(obj.email, JSON.stringify(obj))
    axios.post("https://crudcrud.com/api/251f941a730f441e8cb815bbb5d83304/appointmentData", obj)
        .then((response) => {
            showNewUserOnScreen(response.data)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + " <h4> Something went wrong </h4>"
            console.log(err)
        })
    //showNewUserOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/251f941a730f441e8cb815bbb5d83304/appointmentData")
        .then((response) => {
            //console.log(response);
            for(var i=0;i<response.data.length; i++){
                showNewUserOnScreen(response.data[i])
            }
        } )
        .catch((error) => {
            console.log(error)
        })
    // const localStorageObj = localStorage;
    // const localStorageKeys  = Object.keys(localStorageObj)

    // for(var i =0; i< localStorageKeys.length; i++){
    //     const key = localStorageKeys[i]
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);
    //     showNewUserOnScreen(userDetailsObj)
    // }
})

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phoneNumber').value ='';
    // console.log(localStorage.getItem(user.emailId))
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = ` <li id=${user._id}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user.email}','${user.name}','${user.phoneNumber}','${user._id}')>Edit User </button>
                        </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User
// function editUserDetails(emailId,name ,phoneNumber ,userId){
//         document.getElementById('email').value = emailId;
//         document.getElementById('username').value = name;
//         document.getElementById('phoneNumber').value = phoneNumber;
//     deleteUser(userId)
// }


function editUserDetails(emailId,name ,phoneNumber ,userId){
    const obj = {
        name: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value
    }
    
    axios.put(`https://crudcrud.com/api/73c15246c5914fddbc5b44a05ae97f22/appointmentData/${userId}`,obj)
        .then((response) => {
            editUserFromScreen(response.data)
        })
        .catch((err) => {
            console.log(err);
        })
    
}

// deleteUser('abc@gmail.com')

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/251f941a730f441e8cb815bbb5d83304/appointmentData/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })
    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);

}

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);

    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}

function editUserFromScreen(userId){
    if(childNodeToBeEdited) {
        document.getElementById('email').value = userId.email;
        document.getElementById('username').value = userId.username;
        document.getElementById('phoneNumber').value = userId.phoneNumber;
    }
    const parentNode = document.getElementById('listOfUsers');
    const childHTML = ` <li id=${user._id}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user._id}')> Delete User </button>
                            <button onclick=editUserDetails('${user.email}','${user.name}','${user.phoneNumber}','${user._id}')>Edit User </button>
                        </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}





