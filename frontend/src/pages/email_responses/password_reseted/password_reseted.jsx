import React from "react";
import "./_mainstyle.scss";

function Password_reseted() {
  window.history.pushState("", "", "/");

  function handleConfirmation() {
    window.location.href = "/";
  }

  function handleConfirmation1() {
    window.location.href = "/login";
  }

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="keywords" content="Dárky, Pedigu, Pedig, Košík, Výrobek, Přírodní materiál, Ruční výroba, Malá dílnička"></meta>
		<meta name="author" content="Tomáš Bosák"></meta>
		<meta name="author" content="Marek Hejral"></meta>
        <title>Dárky z pedigu | Heslo bylo úspěšně změněno</title>
        <meta
          name="description"
          content="Dárky z pedigu - Vlastnoruční výroba kvalitních produktů z pedigu z malé dílničky v podkrkonoší
   | Košíky | Dekorace | Figurky | Hrníčky | Hodiny | Podnosy"
        />
      </Helmet>
      <div className="body_verify">
        <h1 className="Nadpis_Stranky1_verify">Dárky z Pedigu</h1>
        <div className="Tabulka_1_verify">
          <a className="Nadpis_Stranky2_verify">Vaše heslo bylo změněno</a>

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

export default Password_reseted;
