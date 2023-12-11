import React from "react";

function Password_reset() {
  return (
    <>
      <form action="/password-reset" method="POST">
        <label>email</label>
        <input
          type="text"
          name="Email"
          required
        ></input>
        <br></br>
        <br></br>

        <label>Nové heslo</label>
        <input
          type="password"
          name="Password"
          required
        ></input>
        <br></br>
        <br></br>

        <label>Nové heslo znovu</label>
        <input
          type="password"
          name="VerificationPassword"
          required
        ></input>
        <br></br>
        <br></br>

        <button type="submit">Odeslat</button>
      </form>
    </>
  );
}

export default Password_reset;
