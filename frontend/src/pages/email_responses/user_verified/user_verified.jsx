import React from "react";
import "./_mainstyle.scss";

function User_verified() {
  window.history.pushState("", "", "/");

  function handleConfirmation() {
    window.location.href = "/";
  }

  function handleConfirmation1() {
    window.location.href = "/login";
  }

  return (
    <>
      <div className="body_verify">
        <h1 className="Nadpis_Stranky1_verify">Dárky z Pedigu</h1>
        <div className="Tabulka_1_verify">
          <a className="Nadpis_Stranky2_verify">
            Vaše ověření proběhlo úspěšně
          </a>

          <div className="success_verify">
            <i className=" uil uil-check-circle"></i>
          </div>

          <div
            onClick={handleConfirmation}
            className="loginbutton_verify custom-btn_verify btn-1_verify"
          >
            <a>Dokončit</a>
          </div>

          <a onClick={handleConfirmation1} className="text_verify">
            Přihlásit se
          </a>
        </div>
      </div>
    </>
  );
}

export default User_verified;
