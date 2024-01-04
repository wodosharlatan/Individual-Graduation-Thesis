import React from "react";
import "./user_verified.css";

function User_verified() {

  // remove hash from url and redirect to home page
  window.history.pushState("", "", "/");

  


  return (
    <>
      <div class="centered">
        <div class="center">
          <h1>Vaše ověření proběhlo úspěšně</h1>
        </div>
        <div class="center">
          <i class="uil uil-check-circle icon"></i>
        </div>
      </div>
    </>
  );
}

export default User_verified;
