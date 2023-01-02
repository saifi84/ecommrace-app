  
  // Verify Login
  function verifyLogin(){
    
    var loginUserName = document.getElementById('username_fields').value;
    var loginPassword = document.getElementById('password_fields').value;
    if(loginUserName =="" || loginPassword =="" )
    {
      alert("Please Fill data")
    }
    else{
      loginAuth(loginUserName,loginPassword,setUserData);
    }
    
  }

  function setUserData(data){
    if(data.message === "Invalid credentials")
    {
      alert("Data Invaild")
    }
    else
    {
        window.localStorage.setItem('UserName', data.username);
        window.localStorage.setItem('Email', data.email);
        window.localStorage.setItem('Token', data.token);
        window.localStorage.setItem('FirstName', data.firstName);
        window.localStorage.setItem('LastName', data.lastName);

        window.location='home.html';
    }

  }
  