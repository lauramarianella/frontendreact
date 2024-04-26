import React, { useEffect, useState } from 'react';
import axios from "axios";//npm i axios
import './App.css';
import Login from './components/login/Login'

function AppLogInOut() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (sessionStorage.getItem('user') != null)
      handleLoginSuccess();
  }, [])

  const handleLoginSuccess = () => {
    document.title = JSON.parse(sessionStorage.getItem('user')).name
    setIsLoggedIn(true);
  };

  const handleLogout = (event) => {
    // TODO: Implement API call to authenticate user
    sessionStorage.clear();
    setIsLoggedIn(false);//on the client
    axios.post("http://localhost:8000/api/ext/logoutUser")
     .then((response) => {
          if (response.status === 200) {
            sessionStorage.clear();
            setIsLoggedIn(false);//on the client
            console.log( response.data);
          }
        })
      /*})*/
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  
  return (
    <>
    
    {!isLoggedIn? 
      <div>
          <div>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
          <div>
            Create Registration tag
          </div>
      </div>
    :
      <div>
        Show menu<br></br>
          <button
            onClick={(e) => {
              handleLogout(e);
            }}
          >
            Log out
          </button>
        <div style={{ margin: "20px" }}>
          Your Shopping Cart implementation:
        </div>
      </div>
  }
  </>
  );
}

export default AppLogInOut;
