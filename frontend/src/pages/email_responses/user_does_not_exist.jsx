import React from "react";
import "./user_does_not_exist.css";

function User_does_not_exist() {
  return (
    <>
      <div class="centered">
        <div class="center">
          <h1>Uživatel Neexistuje</h1>
        </div>
        <div class="center">
          <i class="uil uil-user-exclamation icon"></i>
        </div>
      </div>
    </>
  );
}

export default User_does_not_exist;
